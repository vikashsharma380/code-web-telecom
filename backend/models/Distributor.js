const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const distributorSchema = new mongoose.Schema({
  userId: { type: Number, unique: true },  // auto generate karenge baad me
  distributorName: { type: String, required: true },
  parentName: { type: String, default: "" }, 
  email: { type: String, unique: true },
  mobile: { type: String, required: true, unique: true },
  phone: { type: String, default: "" },
  loginMobile: { type: String, default: "" },
  password: { type: String },
  apiUserId: { type: Number },
  apiPassword: { type: String },
  role: {
    type: String,
    enum: ["admin", "distributor", "master-distributor", "user"],
    default: "distributor",
  },

  // Additional fields
  postalAddress: { type: String, default: "" },
  pinCode: { type: String, default: "" },
  state: { type: String, default: "" },
  cityDistrict: { type: String, default: "" },
  alternateNumber: { type: String, default: "" },
  businessType: { type: String, default: "" },
  panNo: { type: String, default: "" },
  contactPerson: { type: String, default: "" },
  scheme: { type: String, default: "" },
  openingBalance: { type: Number, default: 0 },

  activationDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

distributorSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Distributor", distributorSchema);