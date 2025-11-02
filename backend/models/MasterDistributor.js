// models/MasterDistributor.js
const mongoose = require('mongoose');

const MasterDistributorSchema = new mongoose.Schema({
  userId: { type: String, unique: true }, // MD000001 style
  name: { type: String, required: true },                // masterDistributorName
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true }, // mobileNo
  phone: { type: String, default: "" },                   // mirror of mobile (optional)
  alternateNumber: { type: String, default: "" },
  businessType: { type: String, default: "" },
  panNo: { type: String, default: "" },
  contactPerson: { type: String, default: "" },
  postalAddress: { type: String, default: "" },
  pinCode: { type: String, default: "" },
  state: { type: String, default: "" },
  cityDistrict: { type: String, default: "" },
  scheme: { type: String, default: "" },                  // selectScheme
  balance: { type: Number, default: 0 },                  // openingBalance
  password: { type: String, required: true },             // hashed
  role: { type: String, default: "master-distributor" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MasterDistributor", MasterDistributorSchema);
