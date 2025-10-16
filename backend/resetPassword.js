const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../backend/models/user"); // path aapke project ke hisab se adjust karo
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

async function resetPassword() {
  // const hash = await bcrypt.hash("k0ly9gts", 10); // new password
  // await User.updateOne({ mobile: "9263128909" }, { password: hash });
  // console.log("Password reset successfully");
  // process.exit();

bcrypt.hash("Ansari@2580", 10).then(console.log);

}

resetPassword();
