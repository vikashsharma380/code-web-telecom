// models/OperatorApi.js
const mongoose = require("mongoose");

const operatorApiSchema = new mongoose.Schema({
  operatorCode: { type: String, required: true, unique: true },
  selectedApi: { type: String, default: "A1Topup" }, // e.g. "A1Topup" or "A1TOPUP-UTILITY"
  defaultApi: { type: String, default: "A1Topup" }, // optional meta
  alternateApi: { type: String, default: "" },      // optional meta
}, { timestamps: true });

module.exports = mongoose.model("OperatorApi", operatorApiSchema);
