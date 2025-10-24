const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  rechargeId: { type: String, required: true },  // RCH001
  operator: { type: String, required: true },
  number: { type: String, required: true },
  amount: { type: Number, required: true },
  profit: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
  status: { type: String, default: "Pending" },
  operatorId: { type: String },
  dateTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
