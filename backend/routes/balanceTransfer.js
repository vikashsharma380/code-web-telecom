const express = require("express");
const router = express.Router();
const User = require("../models/user");

// ✅ Get all retailers (role: "user")
router.get("/retailers", async (req, res) => {
  try {
    // 👇 filter changed: role: "user"
    const retailers = await User.find({ role: "user" })
      .select("userId name balance email mobile")
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

// ✅ Get single user by userId (handles both Number & String safely)
router.get("/users/:userId", async (req, res) => {
  try {
    const paramId = req.params.userId;
    const userIdNum = Number(paramId);

    console.log("🔍 Searching user for param:", paramId);

    // Try both string & number versions safely
    const user = await User.findOne({
      $or: [{ userId: userIdNum }, { userId: paramId }],
    }).lean();

    if (!user) {
      console.warn("⚠️ No user found for ID:", paramId);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("✅ User found:", user.name);

    res.json({
      success: true,
      user: {
        userId: user.userId,
        name: user.name || "",
        email: user.email || "",
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
