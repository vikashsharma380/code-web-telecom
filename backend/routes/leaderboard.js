const express = require("express");
const router = express.Router();
const Leaderboard = require("../models/Leaderboard");
const User = require("../models/user");
const { verifyToken } = require("../middleware/authMiddleware");

// ⭐ Update Leaderboard (Recharge ke time call hota hai)
router.post("/update-leaderboard", verifyToken, async (req, res) => {
  try {
    const { userId, amount, commission } = req.body;

    const user = await User.findOne({ userId });
    if (!user) return res.json({ success: false, error: "User not found" });

    let entry = await Leaderboard.findOne({ userId });

    if (!entry) {
      entry = new Leaderboard({
        userId,
        name: user.name,
        phone: user.mobile,
        role: user.role,
        business: 0,
        commission: 0,
        today: 0,
        transactions: 0,
        growth: 0
      });
    }

    entry.business += Number(amount);
    entry.commission += Number(commission);
    entry.transactions += 1;
    entry.today += Number(amount);

    entry.growth = ((entry.today / entry.business) * 100).toFixed(2);

    await entry.save();

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// ⭐ GET Leaderboard (FRONTEND yahi call karta hai)
router.get("/get-leaderboard", verifyToken, async (req, res) => {
  try {
    const records = await Leaderboard.find().sort({ business: -1 });

    res.json({
      success: true,
      records
    });

  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

module.exports = router;
