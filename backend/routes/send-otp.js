
const express = require("express");
const router = express.Router();
const otpStore = new Map(); // temporary in-memory storage
const twilio = require("twilio");

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

router.post("/send-otp", async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) return res.status(400).json({ message: "Mobile required" });

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    otpStore.set(mobile, otp);

    // Send OTP on WhatsApp using Twilio
    await client.messages.create({
      from: "whatsapp:+14155238886", // Twilio Sandbox WhatsApp number
      to: `whatsapp:+91${mobile}`,
      body: `Your CodeWeb Telecom OTP is ${otp}. It will expire in 5 minutes.`,
    });

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("OTP Send Error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});
