const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const Transaction = require("../models/Transaction");

router.get("/", verifyToken, async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) return res.json({ success: false, transactions: [] });

    const transactions = await Transaction.find({
      dateTime: { $gte: new Date(from), $lte: new Date(to) },
    }).sort({ dateTime: -1 });

    res.json({ success: true, transactions });
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ success: false, transactions: [] });
  }
});

module.exports = router;
