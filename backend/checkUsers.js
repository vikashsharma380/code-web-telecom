require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user"); // tumhara User model

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log("MongoDB Connected");

  try {
    const totalUsers = await User.countDocuments();
    console.log("Total users in DB:", totalUsers);

    const sampleUsers = await User.find().limit(10); // first 10 users
    console.log("Sample users:");
    console.log(sampleUsers);
  } catch (err) {
    console.log("Error fetching users:", err.message);
  } finally {
    mongoose.connection.close();
  }
})
.catch(err => console.log("MongoDB connection error:", err));
