const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();
const ADMIN_MOBILE = "9266982764";
router.post("/register", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    console.log("Received signup body:", req.body);

    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const role = mobile === ADMIN_MOBILE ? "admin" : "user";

    const newUser = new User({ name, email, mobile, password, role });
    console.log("New user before save:", newUser);

    await newUser.save();

    res.status(201).json({ message: "Signup successful", role: newUser.role });
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
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: err.message });
  }
});


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = router;
