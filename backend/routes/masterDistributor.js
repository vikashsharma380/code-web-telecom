const express = require("express");
const bcrypt = require("bcryptjs");
const MasterDistributor = require("../models/MasterDistributor");
const Counter = require("../models/Counter");
const router = express.Router();
const axios = require("axios");

// whatsapp helper
async function sendWhatsAppMessage(mobile, message) {
  try {
    const formData = new URLSearchParams();
    formData.append("appkey", process.env.WHATSAPP_APPKEY);
    formData.append("authkey", process.env.WHATSAPP_AUTHKEY);
    formData.append("to", `+91${mobile}`);
    formData.append("message", message);
    formData.append("priority", "high");
    formData.append("channel", "whatsapp");

    await axios.post(process.env.WHATSAPP_API_URL, formData.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 10000,
    });
  } catch (err) {
    console.log("Whatsapp send error:", err);
  }
}

// generate unique MD user id
async function getNextMDId() {
  const counter = await Counter.findOneAndUpdate(
    { name: "masterDistributorSeq" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return "MD" + counter.seq.toString().padStart(6, "0");
}

// random password
function generatePlainPassword() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let pass = "";
  for (let i = 0; i < 8; i++) pass += chars[Math.floor(Math.random() * chars.length)];
  return pass;
}

router.post("/register", async (req, res) => {
  try {
    const data = req.body;

    const existEmail = await MasterDistributor.findOne({ email: data.email });
    if (existEmail) return res.status(400).json({ message: "Email already exists" });

    const existMobile = await MasterDistributor.findOne({ mobile: data.mobile });
    if (existMobile) return res.status(400).json({ message: "Mobile already exists" });

    const userId = await getNextMDId();
    const plainPassword = generatePlainPassword();
    const hashed = await bcrypt.hash(plainPassword, 10);

    const newMD = new MasterDistributor({
      ...data,
      userId,
      password: hashed,
      role: "master-distributor",
    });

   await newMD.save();

// message correct variables se banao
const message = `Welcome to Code Web Telecom!
UserID: ${newMD.userId}
Mobile(Login): ${newMD.mobile}
Password: ${plainPassword}
Balance: ₹${newMD.balance ?? 0}
Login at: www.codewebtelecom.in/login`;

try {
  await sendWhatsAppMessage(newMD.mobile, message);
  console.log("WhatsApp sent for Master Distributor:", newMD.mobile);
} catch (err) {
  console.error("Failed to send WhatsApp message:", err.message || err);
}


    res.status(201).json({
      message: "Master Distributor Created Successfully",
      userId,
      password: plainPassword,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = router;
