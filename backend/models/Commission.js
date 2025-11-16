// models/OperatorCommission.js
const mongoose = require("mongoose");

const commissionSchema = new mongoose.Schema({
  operatorCode: { type: String, required: true },
  scheme: { type: String, required: true }, // e.g. "RETAILER" or "DISTRIBUTOR"
  commission: { type: Number, default: 0 }, // percent, e.g. 0.45
}, { timestamps: true });

commissionSchema.index({ operatorCode: 1, scheme: 1 }, { unique: true });

module.exports = mongoose.model("OperatorCommission", commissionSchema);
