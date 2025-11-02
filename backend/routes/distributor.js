const express = require("express");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const User = require("../models/user");
const Counter = require("../models/Counter");
const router = express.Router();

async function getNextUserId() {
  const counter = await Counter.findOneAndUpdate(
    { name: "userId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  const base = 600034;
  return base + counter.seq;
}

function generateSimplePassword() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  let pass = "";
  for (let i = 0; i < 4; i++) pass += letters[Math.floor(Math.random() * letters.length)];
  for (let i = 0; i < 2; i++) pass += digits[Math.floor(Math.random() * digits.length)];
  return pass;
}

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
    });
  } catch (err) {
    console.log(err);
  }
}

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      state,
      address,
      alternateNumber,
      postalAddress,
      pinCode,
      contactPerson,
      scheme,
      openingBalance,
    } = req.body;

    if (!name || !mobile || !email) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ success: false, message: "Distributor already exists" });
    }

    const userId = await getNextUserId();
    const plainPassword = generateSimplePassword();

    const newD = new User({
      userId,
      name,
      email,
      mobile,
      phone: mobile,
      state,
      address,
      alternateNumber,
      postalAddress,
      pinCode,
      contactPerson,
      scheme,
      balance: openingBalance || 0,
      role: "distributor",
      password: plainPassword,
    });

    await newD.save();

    const message = `Welcome Distributor to CWT!\nUserID:${userId}\nMobile:${mobile}\nPass:${plainPassword}`;
    sendWhatsAppMessage(mobile, message);

    res.json({ success: true, message: "Distributor Created Successfully", userId });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
