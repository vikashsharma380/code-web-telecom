const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ==============================
// LOGIN (Only userId + password)
// ==============================
router.post("/login", async (req, res) => {
  const { userId, password } = req.body;

  try {
    if (!userId || !password) {
      return res.status(400).json({ message: "Please enter User ID and Password" });
    }

    // Find user by userId
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(401).json({ message: "Invalid User ID or Password" });
    }

    // Compare password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid User ID or Password" });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        userId: user.userId,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
