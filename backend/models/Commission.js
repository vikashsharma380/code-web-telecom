const mongoose = require("mongoose");

const commissionSchema = new mongoose.Schema({
  operator: { type: String, required: true },
  commission: { type: Number, required: true },
  software: { type: String, required: true, enum: ["DISTRIBUTORS", "RETAILERS"] },
});

module.exports = mongoose.model("Commission", commissionSchema);
