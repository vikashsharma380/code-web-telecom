const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user"); // aapka schema

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));
const usersData = [
 { userId: 500023, name: "ATUL PRAKASH", email: "atulprakash639@gmail.com", mobile: "8252339220", loginMobile: "8252339220", password: "756394", apiUserId: 500023, apiPassword: "756394", parentName: "ATUL PRAKASH", state: "", address: "", alternateNumber: "0", activationDate: new Date("2025-08-22T20:22:11") },
  { userId: 500024, name: "NICKEY URAON", email: "khalkhooonickey@gmail.com", mobile: "7667839428", loginMobile: "7667839428", password: "Nickey@321", apiUserId: 500024, apiPassword: "Nickey@321", parentName: "ATUL PRAKASH", state: "Bihar", address: "VILL - HAWAI ADDA CHOWK", alternateNumber: "HAWAI ADDA", activationDate: new Date("2025-08-23T16:27:20") },
  { userId: 500025, name: "Sunny Kumar", email: "kumarsunny0200@gmail.com", mobile: "9525416350", loginMobile: "9525416350", password: "952541", apiUserId: 500025, apiPassword: "952541", parentName: "", state: "", address: "", alternateNumber: "0", activationDate: new Date("2025-08-25T08:43:09") },
  { userId: 500026, name: "PRAMUKH KUMAR", email: "pk5454@gmail.com", mobile: "7352252307", loginMobile: "7352252307", password: "845437", apiUserId: 500026, apiPassword: "845437", parentName: "ATUL PRAKASH", state: "Bihar", address: "VILL- CHARANGHAN", alternateNumber: "8102130991", activationDate: new Date("2025-08-28T21:33:59") },
  { userId: 500027, name: "Rambhu Raj", email: "rambhu446@gmail.com", mobile: "9525685629", loginMobile: "9525685629", password: "Rambhu1@", apiUserId: 500027, apiPassword: "Rambhu1@", parentName: "", state: "", address: "", alternateNumber: "0", activationDate: new Date("2025-09-09T09:58:28") },
  { userId: 500028, name: "Priyesh Kumar", email: "krpriyesh75@gmail.com", mobile: "7562835665", loginMobile: "7562835665", password: "krpk@2005", apiUserId: 500028, apiPassword: "krpk@2005", parentName: "", state: "", address: "", alternateNumber: "0", activationDate: new Date("2025-09-12T20:51:56") },
  { userId: 500029, name: "vijay", email: "pratima0502kumari@gmail.com", mobile: "8434651500", loginMobile: "8434651500", password: "7050", apiUserId: 500029, apiPassword: "7050", parentName: "", state: "", address: "", alternateNumber: "0", activationDate: new Date("2025-09-20T08:44:29") },
  { userId: 500030, name: "Abhishek Ranjan", email: "ranjanabhishek2401@gmail.com", mobile: "7979841281", loginMobile: "7979841281", password: "Abhi@2401", apiUserId: 500030, apiPassword: "Abhi@2401", parentName: "", state: "", address: "", alternateNumber: "0", activationDate: new Date("2025-09-23T19:32:45") },
  { userId: 500031, name: "vikash", email: "vikashpandit380@gmail.com", mobile: "8517007867", loginMobile: "8517007867", password: "0936Ec211013@", apiUserId: 500031, apiPassword: "0936Ec211013@", parentName: "", state: "", address: "Lig 361 darpan colony thatipur gwalior", alternateNumber: "0", activationDate: new Date("2025-10-07T14:23:49") },
  
  { userId: 500033, name: "ashik ali", email: "ashikali01263@gmail.com", mobile: "7808242380", loginMobile: "7808242380", password: "3201", apiUserId: 500033, apiPassword: "3201", parentName: "", state: "", address: "", alternateNumber: "0", activationDate: new Date("2025-10-19T10:13:41") },
];
const insertUsers = async () => {
  for (let userData of usersData) {
    try {
      userData.phone = userData.mobile; // phone = mobile
      const user = new User(userData);
      await user.save();
      console.log(`Inserted: ${user.name}`);
    } catch (err) {
      console.error("Error inserting user:", userData.name, err.message);
    }
  }
  mongoose.disconnect();
};

insertUsers();