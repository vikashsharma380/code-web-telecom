const express = require("express");
const User = require("../models/user");

const router = express.Router();

// ✅ Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get users by role (Retailer, Distributor, etc.)
router.get("/role/:role", async (req, res) => {
  try {
    const { role } = req.params;
    const users = await User.find({ role });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users by role:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/retailers", async (req, res) => {
  try {
    const users = await User.find({ role: "retailer" })
      .select("userId name mobile balance status");

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get user by userId OR mobile (NO ObjectId)
router.get("/:userId", async (req, res) => {
  try {
    const id = req.params.userId.trim();

    console.log("🔍 Fetch request for:", id);

    const user = await User.findOne({
      $or: [
        { userId: Number(id) },  // retailerId
        { mobile: id },          // mobile login
        { phone: id },
      ],
    }).lean();

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user: {
        userId: user.userId,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        balance: user.balance,
        role: user.role,
        apiPassword: user.apiPassword || user.password, // login use
      },
    });
  } catch (err) {
    console.error("❌ User fetch error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
});

router.patch("/users/update-status", async (req, res) => {
  try {
    let { userId, status } = req.body;

    if (!userId || !status) {
      return res.json({
        success: false,
        message: "User ID and status are required",
      });
    }

    userId = Number(userId);

    const user = await User.findOne({ userId });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    user.status = status;
    await user.save();

    return res.json({
      success: true,
      message: `User status updated to ${status}`,
    });

  } catch (err) {
    console.log("UPDATE STATUS ERROR:", err);
    res.json({
      success: false,
      message: "Server Error",
    });
  }
});


router.put("/:id", async (req, res) => {
  try {
    console.log("🟢 Update Request Body:", req.body);
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // extra safe
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error("❌ Error updating user:", err.message);
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
});



module.exports = router;
