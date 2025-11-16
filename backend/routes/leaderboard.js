const express = require("express");
const router = express.Router();
const Leaderboard = require("../models/Leaderboard");
const User = require("../models/user");
const { verifyToken } = require("../middleware/authMiddleware");

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

module.exports = router;
