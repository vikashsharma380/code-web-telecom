const express = require("express");
const router = express.Router();
const User = require("../models/user");

// ✅ Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("name userId mobile role balance");
    res.json({ success: true, users });
  } catch (err) {
    console.error("Error fetching all users:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get all retailers
router.get("/retailers", async (req, res) => {
  try {
    const retailers = await User.find({ role: "retailer" })
      .select("name userId mobile balance");
    res.json({ success: true, retailers });
  } catch (err) {
    console.error("Error fetching retailers:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get all distributors
router.get("/distributors", async (req, res) => {
  try {
    const distributors = await User.find({ role: "distributor" })
      .select("name userId mobile balance");
    res.json({ success: true, distributors });
  } catch (err) {
    console.error("Error fetching distributors:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get all master distributors
router.get("/masters", async (req, res) => {
  try {
    const masters = await User.find({ role: "master" })
      .select("name userId mobile balance");
    res.json({ success: true, masters });
  } catch (err) {
    console.error("Error fetching master distributors:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get single user by ID or mobile
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user =
      /^\d{10}$/.test(id)
        ? await User.findOne({ mobile: id })
        : await User.findOne({ userId: id });

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
