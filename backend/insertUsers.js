const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user"); // tumhara User schema ka path check kar lo
const usersData = require("./models/User.json"); // tumhara JSON file path

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/test", {
  // tumhare MongoDB URI yahan
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Function to parse date safely
function parseDate(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date)) return new Date(); // agar invalid date ho to current date
  return date;
}

// Insert/update users
async function insertUsers() {
  for (let row of usersData) {
    try {
      // Mapping JSON fields to schema fields
      const user = {
        userId: row["API User ID"] || Math.floor(Math.random() * 1000000),
        name: row["Name"] || "Unknown",
        email: row["Email ID"] || `user${Math.floor(Math.random() * 100000)}@example.com`,
        mobile: row["Login Mobile No"] ? String(row["Login Mobile No"]) : `9${Math.floor(Math.random() * 1000000000)}`,
        loginMobile: row["Login Mobile No"] ? String(row["Login Mobile No"]) : undefined,
        password: row["Password"] || "123456",
        apiUserId: row["API User ID"] || undefined,
        apiPassword: row["API Password"] || undefined,
        parentName: row["Parent Name"] || "",
        state: row["State"] || "",
        address: row["Address"] || "",
        alternateNumber: row["Alternate Number"] || "",
        activationDate: parseDate(row["Activation Date"]),
        role: row["Role"] || "user",
        balance: row["Balance"] || 0
      };

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      // Upsert: insert if not exists, else skip
      await User.updateOne(
        { userId: user.userId }, // duplicate check
        { $setOnInsert: user },
        { upsert: true }
      );

      console.log(`Processed user: ${user.name}`);
    } catch (err) {
      console.error("Error inserting row:", err.message);
    }
  }
  console.log("All users processed.");
  mongoose.disconnect();
}

insertUsers();
