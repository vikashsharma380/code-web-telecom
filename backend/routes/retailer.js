const express = require("express");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const User = require("../models/user");
const Counter = require("../models/Counter");
const router = express.Router();

// Helper: Get next userId
async function getNextUserId() {
  const counter = await Counter.findOneAndUpdate(
    { name: "userId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  const base = 500034;
  return base + counter.seq;
}

// Helper: Generate simple password (alphabets + numbers)
function generateSimplePassword() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  let pass = "";
  for (let i = 0; i < 4; i++) pass += letters[Math.floor(Math.random() * letters.length)];
  for (let i = 0; i < 2; i++) pass += digits[Math.floor(Math.random() * digits.length)];
  return pass;
}

// Helper: Send WhatsApp via SoftAPI
async function sendWhatsAppMessage(mobile, message) {
  try {
    const formData = new URLSearchParams();
    formData.append("appkey", process.env.WHATSAPP_APPKEY);
    formData.append("authkey", process.env.WHATSAPP_AUTHKEY);
    formData.append("to", `+91${mobile}`);
    formData.append("message", message);
    formData.append("priority", "high");
    formData.append("channel", "whatsapp");

    await axios.post(process.env.WHATSAPP_API_URL, formData.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    console.log("✅ WhatsApp sent to:", mobile);
  } catch (err) {
    console.error("❌ WhatsApp send failed:", err.response?.data || err.message);
  }
}

// Register retailer route
router.post("/retailer-register", async (req, res) => {
  try {
    const {
      retailerName,
      selectParent,
      postalAddress,
      pinCode,
      state,
      mobileNo,
      alternatNumber,
      retailerBusinessType,
      email,
      panNoGSTNumber,
      contactPerson,
      selectScheme,
      openingBalance,
    } = req.body;

    if (!retailerName || !mobileNo || !email || !postalAddress) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all required fields" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Retailer already registered" });
    }

    // Generate userId and password
    const userId = await getNextUserId();
    const plainPassword = generateSimplePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Create new retailer (role = user)
    const newRetailer = new User({
      userId,
      name: retailerName,
      email,
      mobile: mobileNo,
      phone: mobileNo,
      address: postalAddress,
      pincode: pinCode,
      state,
      parent: selectParent,
      altMobile: alternatNumber,
      businessType: retailerBusinessType,
      gstOrPan: panNoGSTNumber,
      contactPerson,
      scheme: selectScheme,
      balance: openingBalance || 0,
      role: "user",
      password: hashedPassword,
    });

    await newRetailer.save();

    // Send WhatsApp welcome message
    const message = `Welcome to Code Web Telecom!\nUserID: ${userId}\nMobile(Login): ${mobileNo}\nPassword: ${plainPassword}\nBalance: ₹${openingBalance || 0}\n\nLogin at: www.codewebtelecom.in/login`;
    await sendWhatsAppMessage(mobileNo, message);

    res.json({
      success: true,
      message: "Retailer registered successfully",
      userId,
    });
  } catch (err) {
    console.error("Retailer Registration Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
