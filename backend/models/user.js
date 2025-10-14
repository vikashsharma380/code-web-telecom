const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userId: { type: Number, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },

  // Login credentials
  loginMobile: { type: String },
  password: { type: String },
  apiUserId: { type: Number },

  // Additional details
  parentName: { type: String, default: "" },
  state: { type: String, default: "" },
  address: { type: String, default: "" },
  alternateNumber: { type: String, default: "" },
  activationDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});
module.exports =  mongoose.model("User", userSchema);
