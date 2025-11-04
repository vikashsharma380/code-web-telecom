const express = require("express");
const router = express.Router();
const User = require("../models/user");

// 🔹 Get all distributors
router.get("/distributors", async (req, res) => {
  try {
    const distributors = await User.find({ role: "distributor" })
      .select("userId name balance email mobile")
      .sort({ userId: 1 });

    res.json({ success: true, distributors });
  } catch (err) {
    console.error("Error fetching distributors:", err);
    res.status(500).json({ success: false, message: "Failed to fetch distributors" });
  }
});

// ➕ Add Balance
router.post("/distributor/balance/add", async (req, res) => {
  try {
    const { distributorId, amount } = req.body;
    if (!distributorId || !amount)
      return res.status(400).json({ success: false, message: "Missing fields" });

    const distributor = await User.findOne({ userId: distributorId });
    if (!distributor)
      return res.status(404).json({ success: false, message: "Distributor not found" });

    distributor.balance = (distributor.balance || 0) + Number(amount);
    await distributor.save();

    res.json({
      success: true,
      message: "✅ Balance added successfully",
      balance: distributor.balance,
    });
  } catch (err) {
    console.error("Add balance error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ♻️ Revert Balance
router.post("/distributor/balance/revert", async (req, res) => {
  try {
    const { distributorId, amount } = req.body;
    if (!distributorId || !amount)
      return res.status(400).json({ success: false, message: "Missing fields" });

    const distributor = await User.findOne({ userId: distributorId });
    if (!distributor)
      return res.status(404).json({ success: false, message: "Distributor not found" });

    if ((distributor.balance || 0) < Number(amount))
      return res.status(400).json({ success: false, message: "Insufficient balance" });

    distributor.balance -= Number(amount);
    await distributor.save();

    res.json({
      success: true,
      message: "♻️ Balance reverted successfully",
      balance: distributor.balance,
    });
  } catch (err) {
    console.error("Revert balance error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
