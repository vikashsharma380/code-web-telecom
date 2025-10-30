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
    const users = await User.find().select(
      "userId name mobile balance status"
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});



// ✅ Correct export
module.exports = router;
