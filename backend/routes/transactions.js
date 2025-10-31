// routes/transactions.js (or in your main file for quick testing)
const express = require("express");
const router = express.Router();
const Transaction = require("../../models/Transaction");

// GET /api/transactions/search?mobileNumber=9876543210
router.get("/search", async (req, res) => {
  const { mobileNumber } = req.query;

  if (!mobileNumber) {
    return res.status(400).json({ success: false, message: "Mobile number is required" });
  }

  try {
    const transactions = await Transaction.find({ number: mobileNumber }).sort({ dateTime: -1 });
    res.json({ success: true, transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch transactions" });
  }
});

module.exports = router;
