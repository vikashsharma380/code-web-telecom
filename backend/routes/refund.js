
const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const { verifyToken } = require("../middleware/authMiddleware");
router.get("/refund-report", verifyToken, async (req, res) => {
  try {
    const user = req.user;
    const refunds = await Transaction.find({
      userId: user._id,
      status: "FAILED",
      refundAmount: { $gt: 0 },
    }).sort({ refundDate: -1 });
    res.json({ success: true, refunds });
  } catch (err) {
    console.error("Refund report error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
module.exports = router;
