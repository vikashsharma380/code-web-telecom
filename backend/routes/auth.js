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
  try {
    const { mobile, password } = req.body;
    const user = await User.findOne({ mobile });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.json({
      message: "Login successful",
      redirectTo: user.role === "admin" ? "/admin-dashboard" : "/MobileRecharge",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = router;
