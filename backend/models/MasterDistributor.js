const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const masterDistributorSchema = new mongoose.Schema({
  userId: { type: String, unique: true },    // MDxxxxxx
  masterDistributorName: { type: String, required: true },
  postalAddress: { type: String, required: true },
  pinCode: { type: String, required: true },
  state: { type: String, required: true },
  cityDistrict: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  mobile: { type: String, required: true, unique: true },
  alternateNumber: { type: String },

  businessType: { type: String },
  contactPerson: { type: String },
  selectScheme: { type: String },

  balance: { type: Number, default: 0 },    // front-end openingBalance

  password: { type: String, required: true },

  role: { type: String, default: "master-distributor" }
}, { timestamps: true });

masterDistributorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("MasterDistributor", masterDistributorSchema);
