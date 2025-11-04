const express = require("express");
const router = express.Router();
const User = require("../models/user");

// ✅ Get all Master Distributors
router.get("/master-distributors", async (req, res) => {
  try {
    const masterDistributors = await User.find({ role: "master" })
      .select("userId name balance email mobile")
      .sort({ userId: 1 });

    res.json({ success: true, masterDistributors });
  } catch (err) {
    console.error("❌ Error fetching master distributors:", err);
    res.status(500).json({ success: false, message: "Failed to fetch master distributors" });
  }
});

// ✅ Add Balance to Master Distributor
router.post("/master/balance/add", async (req, res) => {
  try {
    const { masterId, amount } = req.body;
    if (!masterId || !amount)
      return res.status(400).json({ success: false, message: "Missing fields" });

    const master = await User.findOne({ userId: masterId });
    if (!master)
      return res.status(404).json({ success: false, message: "Master distributor not found" });

    master.balance = (master.balance || 0) + Number(amount);
    await master.save();

    res.json({
      success: true,
      message: "✅ Balance added successfully",
      balance: master.balance,
    });
  } catch (err) {
    console.error("Add balance error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Revert (Deduct) Balance from Master Distributor
router.post("/master/balance/revert", async (req, res) => {
  try {
    const { masterId, amount } = req.body;
    if (!masterId || !amount)
      return res.status(400).json({ success: false, message: "Missing fields" });

    const master = await User.findOne({ userId: masterId });
    if (!master)
      return res.status(404).json({ success: false, message: "Master distributor not found" });

    if ((master.balance || 0) < Number(amount))
      return res.status(400).json({ success: false, message: "Insufficient balance" });

    master.balance -= Number(amount);
    await master.save();

    res.json({
      success: true,
      message: "♻️ Balance reverted successfully",
      balance: master.balance,
    });
  } catch (err) {
    console.error("Revert balance error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
