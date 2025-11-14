const express = require("express");
const router = express.Router();
const User = require("../models/user");

// ✅ Get all retailers (role: "user")
router.get("/retailers", async (req, res) => {
  try {
    const retailers = await User.find({ role: "user" })
      .select("userId name balance email mobile phone")
      .sort({ userId: 1 });

    res.json({ success: true, retailers });
  } catch (err) {
    console.error("❌ Error fetching retailers:", err);
    res.status(500).json({ success: false, message: "Failed to fetch retailers" });
  }
});

// ✅ Add Balance to Retailer
router.post("/balance/add", async (req, res) => {
  try {
    const { retailerId, amount } = req.body;

    if (!retailerId || !amount)
      return res.status(400).json({ success: false, message: "Missing fields" });

    const retailer = await User.findOne({ userId: retailerId });

    if (!retailer)
      return res.status(404).json({ success: false, message: "User not found" });

    // 🔥 Auto-fix missing phone field
    if (!retailer.phone) {
      retailer.phone = retailer.mobile;
    }

    retailer.balance = (retailer.balance || 0) + Number(amount);
    await retailer.save();

    res.json({
      success: true,
      message: "✅ Balance added successfully",
      balance: retailer.balance,
    });
  } catch (err) {
    console.error("Add balance error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Revert (Deduct) Balance
router.post("/balance/revert", async (req, res) => {
  try {
    const { retailerId, amount } = req.body;

    if (!retailerId || !amount)
      return res.status(400).json({ success: false, message: "Missing fields" });

    const retailer = await User.findOne({ userId: retailerId });

    if (!retailer)
      return res.status(404).json({ success: false, message: "User not found" });

    // 🔥 Auto-fix missing phone field
    if (!retailer.phone) {
      retailer.phone = retailer.mobile;
    }

    if ((retailer.balance || 0) < Number(amount))
      return res.status(400).json({ success: false, message: "Insufficient balance" });

    retailer.balance -= Number(amount);
    await retailer.save();

    res.json({
      success: true,
      message: "♻️ Balance reverted successfully",
      balance: retailer.balance,
    });
  } catch (err) {
    console.error("Revert balance error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ View User by userId
router.get("/users/:userId", async (req, res) => {
  try {
    const userIdParam = req.params.userId?.trim();

    const user = await User.findOne({
      $or: [
        { userId: Number(userIdParam) },
        { userId: userIdParam },
      ],
    }).lean();

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({
      success: true,
      user: {
        userId: user.userId,
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        apiPassword: user.apiPassword || "",
        role: user.role || "user",
      },
    });
  } catch (err) {
    console.error("❌ Get user error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user",
      details: err.message,
    });
  }
});

module.exports = router;
