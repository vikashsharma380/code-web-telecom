const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { loginInput, password } = req.body;

  try {
    if (!loginInput || !password) {
      return res.status(400).json({ message: "Please enter User ID/Mobile and Password" });
    }

    let user;
    if (/^\d{10}$/.test(loginInput)) {
      // mobile is string
      user = await User.findOne({ mobile: loginInput });
    } else {
      // userId is number
      user = await User.findOne({ userId: Number(loginInput) });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
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
