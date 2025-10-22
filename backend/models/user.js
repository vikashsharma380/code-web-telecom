const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  userId: { type: Number, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },

  loginMobile: { type: String },
  password: { type: String },
  apiUserId: { type: Number },
  apiPassword: { type: String },
  role: { type: String, enum: ["admin", "user"], default: "user" },

  parentName: { type: String, default: "" },
  state: { type: String, default: "" },
  address: { type: String, default: "" },
  alternateNumber: { type: String, default: "" },
  activationDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },

  // ✅ Add balance field
  balance: { type: Number, default: 0 },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
