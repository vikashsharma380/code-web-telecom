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

router.get("/users/:userId", async (req, res) => {
  try {
    // 👇 Step 1: Convert param to number safely
    const userId = Number(req.params.userId);

    if (isNaN(userId)) {
      console.warn("⚠️ Invalid userId:", req.params.userId);
      return res
        .status(400)
        .json({ success: false, message: "Invalid userId format" });
    }

    console.log("🔍 Searching for userId:", userId);

    // 👇 Step 2: Query with number (schema me number hai)
    const user = await User.findOne({ userId: userId }).lean();

    if (!user) {
      console.warn("⚠️ No user found for ID:", userId);
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log("✅ User found:", user.name);

    // 👇 Step 3: Send safe response
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
    console.error("❌ Get user error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user",
      details: err.message,
    });
  }
});





module.exports = router;
