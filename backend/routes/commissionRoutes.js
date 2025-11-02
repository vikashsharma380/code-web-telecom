const express = require("express");
const router = express.Router();
const Commission = require("../models/Commission");

// Add or update commission
router.post("/set-commission", async (req, res) => {
  try {
    const { operator, commission, software } = req.body;
    let existing = await Commission.findOne({ operator, software });

    if (existing) {
      existing.commission = commission;
      await existing.save();
      return res.json({ success: true, message: "Commission updated successfully!" });
    }

    const newCommission = new Commission({ operator, commission, software });
    await newCommission.save();
    res.json({ success: true, message: "Commission added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Fetch all commissions
router.get("/get-commissions", async (req, res) => {
  try {
    const data = await Commission.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
