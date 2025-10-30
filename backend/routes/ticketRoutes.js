const express = require("express");
const router = express.Router();
const Ticket = require("../../models/Ticket");

router.post("/create", async (req, res) => {
  try {
    const { subject, message } = req.body;
    const ticket = new Ticket({ subject, message });
    await ticket.save();
    res.status(201).json({ success: true, ticket });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


router.get("/all", async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ date: -1 });
    res.status(200).json({ success: true, tickets });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
