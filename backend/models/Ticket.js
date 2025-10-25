const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  response: { type: String, default: "" },
  status: { type: String, default: "Open" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional
});

module.exports = mongoose.model("Ticket", ticketSchema);
