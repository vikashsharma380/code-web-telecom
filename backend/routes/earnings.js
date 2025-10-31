// routes/earnings.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const Transaction = require("../models/Transaction");

router.get("/my-earnings", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const earnings = await Transaction.find({ userId }).sort({ date: -1 });
    res.json({ success: true, earnings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch earnings" });
  }
});

module.exports = router;
