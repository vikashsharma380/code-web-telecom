// scripts/addDefaultUser.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("../backend/models/user");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test";

mongoose.connect(MONGO_URI, {
  // no need for useNewUrlParser or useUnifiedTopology with driver 4.x
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

const addDefaultUser = async () => {
  try {
    const existingUser = await User.findOne({ userId: 500032 });
    if (existingUser) {
      console.log("User already exists:", existingUser.userId);
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("k0ly9gts", 10);

    const user = new User({
      userId: 500032,
      name: "Vikash Sharma",
      email: "dristykumari30@gmail.com",
      mobile: "9263128909",
      password: hashedPassword,
      apiUserId: 500032,
    });

    await user.save();
    console.log("Default user added successfully:", user.userId);
    process.exit(0);
  } catch (err) {
    console.error("Error adding user:", err.message);
    process.exit(1);
  }
};

addDefaultUser();
