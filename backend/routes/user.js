// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");

/*
===========================================================
  UNIVERSAL USER ROUTES
  Compatible with: Mobile App + Website
===========================================================
*/

/* --------------------------------------------------------
   1️⃣  Get All Users (No conflict)
-------------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("userId name mobile role balance");
    res.json({ success: true, users });
  } catch (err) {
    console.error("Error fetching all users:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* --------------------------------------------------------
   2️⃣  Get All Retailers (role=user)
-------------------------------------------------------- */
router.get("/retailers", async (req, res) => {
  try {
    const retailers = await User.find({ role: "user" })
      .select("userId name mobile balance status");
    res.json(retailers); // IMPORTANT: Mobile app expects array
  } catch (err) {
    console.error("Retailer fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* --------------------------------------------------------
   3️⃣  Get All Distributors
-------------------------------------------------------- */
router.get("/distributors", async (req, res) => {
  try {
    const distributors = await User.find({ role: "distributor" })
      .select("userId name mobile balance status");
    res.json(distributors);
  } catch (err) {
    console.error("Distributor fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* --------------------------------------------------------
   4️⃣  Get All Master Distributors
-------------------------------------------------------- */
router.get("/masters", async (req, res) => {
  try {
    const masters = await User.find({ role: "master-distributor" })
      .select("userId name mobile balance status");
    res.json(masters);
  } catch (err) {
    console.error("Master distributor error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* --------------------------------------------------------
   5️⃣  Get Single User (Supports: userId OR mobile)
-------------------------------------------------------- */
router.get("/profile/:id", async (req, res) => {
  try {
    const id = req.params.id.trim();

    let user;

    // If 10-digit → mobile
    if (/^\d{10}$/.test(id)) {
      user = await User.findOne({ mobile: id });
    } else {
      // Otherwise treat as userId
      user = await User.findOne({ userId: Number(id) });
    }

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* --------------------------------------------------------
   6️⃣  Add Balance (Mobile App)
-------------------------------------------------------- */
router.post("/balance/add", async (req, res) => {
  try {
    const retailerId = req.body.retailerId || req.body.userId;
    const amount = Number(req.body.amount);

    if (!retailerId || !amount)
      return res.status(400).json({ success: false, message: "Missing fields" });

    let user = await User.findOne({ userId: retailerId });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    user.balance = (user.balance || 0) + amount;
    await user.save();

    res.json({
      success: true,
      balance: user.balance,
      message: "Balance added successfully"
    });
  } catch (err) {
    console.error("Add balance error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* --------------------------------------------------------
   7️⃣  Revert Balance (Deduct)
-------------------------------------------------------- */
router.post("/balance/revert", async (req, res) => {
  try {
    const retailerId = req.body.retailerId || req.body.userId;
    const amount = Number(req.body.amount);

    if (!retailerId || !amount)
      return res.status(400).json({ success: false, message: "Missing fields" });

    let user = await User.findOne({ userId: retailerId });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (user.balance < amount)
      return res.status(400).json({ success: false, message: "Insufficient balance" });

    user.balance -= amount;
    await user.save();

    res.json({
      success: true,
      balance: user.balance,
      message: "Balance reverted successfully"
    });
  } catch (err) {
    console.error("Revert balance error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* --------------------------------------------------------
   8️⃣  Edit Profile (Works for Mobile + Website)
-------------------------------------------------------- */
router.put("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findOneAndUpdate(
      { userId: Number(id) },   // match userId not _id
      req.body,
      { new: true }
    );

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    console.error("Edit user error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
