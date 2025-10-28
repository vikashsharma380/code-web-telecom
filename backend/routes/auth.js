const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Counter = require("../models/Counter");
const router = express.Router();
const ADMIN_MOBILE = "9266982764";
async function getNextUserId() {
  // We'll use a counter document named 'userId'
  const counter = await Counter.findOneAndUpdate(
    { name: "userId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  // If counter.seq starts from 1, we want userId = 500034 + seq -> first = 500035
  const base = 500034;
  return base + counter.seq;
}

// helper: send WhatsApp via softapi
async function sendWhatsAppMessage(mobile, message) {
  try {
    const formData = new URLSearchParams();
    formData.append("appkey", process.env.WHATSAPP_APPKEY);
    formData.append("authkey", process.env.WHATSAPP_AUTHKEY);
    formData.append("to", `+91${mobile}`);
    formData.append("message", message);
    formData.append("priority", "high");
    formData.append("channel", "whatsapp");

    const res = await axios.post(process.env.WHATSAPP_API_URL, formData.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 10000,
    });

    return res.data;
  } catch (err) {
    console.error("WhatsApp send error:", err.response?.data || err.message);
    throw err;
  }
}

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    console.log("Received signup body:", req.body);

    if (!mobile || !password || !name) {
      return res.status(400).json({ message: "name, mobile and password are required" });
    }

    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Determine role
    const role = mobile === ADMIN_MOBILE ? "admin" : "user";

    // get a unique userId (atomic)
    const userId = await getNextUserId();

    // Create user
    const newUser = new User({
      userId,
      name,
      email,
      mobile,
      phone: mobile,
      password,
      role,
      balance: 0, // initial balance
    });

    await newUser.save();

    // Prepare message content (you requested mobile, password, balance, userId)
    const message = `Welcome to Code Web Telecom!\nUserID: ${newUser.userId}\nMobile(Login): ${newUser.mobile}\nPassword: ${password}\nBalance: ₹${newUser.balance}\n\nLogin at: yoursite.example/login`;

    // Send WhatsApp message (fire-and-forget with try/catch)
    try {
      await sendWhatsAppMessage(newUser.mobile, message);
      console.log("WhatsApp sent for user:", newUser.mobile);
    } catch (err) {
      // Log but don't fail registration if WhatsApp sending fails
      console.error("Failed to send WhatsApp message:", err.message || err);
    }

    res.status(201).json({ message: "Signup successful", role: newUser.role, userId: newUser.userId });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
router.post("/login", async (req, res) => {
  const { loginInput, password } = req.body;
  console.log("📩 Login request body:", req.body);

  try {
    if (!loginInput || !password) {
      return res.status(400).json({ message: "Please enter User ID/Mobile and Password" });
    }

    let user;
    

    if (/^\d{10}$/.test(loginInput)) {
      // mobile is string
     user = await User.findOne({
    $or: [{ mobile: loginInput }, { phone: loginInput }],
  });}
     else{ // userId is number
      user = await User.findOne({ userId: Number(loginInput) });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
console.log("✅ Found user:", user.mobile || user.userId);
console.log("DB password hash:", user.password);
console.log("Entered password:", password);

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        userId: user.userId,
        name: user.name,
        role: user.role,
        apiPassword: password, 
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: err.message });
  }
});
const axios = require("axios");

const otpStore = new Map(); 

// Send OTP
router.post("/send-otp", async (req, res) => {
  const { mobile } = req.body;
  console.log("📩 Send OTP request received:", mobile);
  if (!mobile) return res.status(400).json({ message: "Mobile required" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore.set(mobile, otp);

  try {
    const formData = new URLSearchParams();
    formData.append("appkey", "5a48cbf2-9d89-40fe-a46a-9697626c7908");
    formData.append("authkey", "SXA40NLGqoOsdNZGJi8wLL1ydT3CTy592MeG9tbAfnXYq43W7W");
    formData.append("to", `+91${mobile}`); // always include country code
    formData.append("message", `Your Code Web Telecom OTP is ${otp}. It expires in 5 mins.`);
    formData.append("priority", "high"); // optional
    formData.append("channel", "whatsapp"); // send via WhatsApp

    await axios.post("https://softapi.in/api/create-message", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// Verify OTP
router.post("/verify-otp", (req, res) => {
  const { mobile, otp } = req.body;
  const storedOtp = otpStore.get(mobile);

  if (!storedOtp) return res.status(400).json({ message: "OTP expired" });
  if (parseInt(otp) !== storedOtp) return res.status(400).json({ message: "Invalid OTP" });

  otpStore.delete(mobile);
  res.json({ success: true, message: "OTP verified" });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = router;
