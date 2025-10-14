const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  txid: String,
  operator: String,
  number: String,
  amount: Number,
  status: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
