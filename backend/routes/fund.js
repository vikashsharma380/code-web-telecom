const express = require("express");
const axios = require("axios");
const router = express.Router();
const User = require("../models/user");

require("dotenv").config();

// Add Fund: Create Payment Order
router.post("/add-fund", async (req, res) => {
  try {
     const { amount, userId, redirectUrl } = req.body;
   const clientTxnId = `txn_${Date.now()}_${userId}`;
  
    if (!amount || isNaN(amount) || amount <= 0)
      return res.status(400).json({ success: false, error: "Invalid amount" });
    if (!userId)
      return res.status(400).json({ success: false, error: "User ID missing" });

    

const body = {
  key: process.env.UPI_API_KEY,                 
  client_txn_id: `txn_${Date.now()}_${userId}`, 
  amount: String(amount),                       
  p_info: "Add Fund",                           
  customer_name: User.name || "User",           
  customer_email: User.email || "user@example.com",
  customer_mobile: User.mobile || "9876543210",
  redirect_url: redirectUrl || "http://localhost:5173/dashboard", // public URL
  udf1: String(userId).substring(0, 25),
  udf2: "",
  udf3: ""
};



    const response = await axios.post(
      "https://api.ekqr.in/api/create_order",
      body,
      { headers: { "Content-Type": "application/json" } }
    );

    const data = response.data;
    if (!data.status)
      return res.status(400).json({ success: false, error: data.msg });

    res.json({
      success: true,
      orderId: data.data.order_id,
      paymentUrl: data.data.payment_url,
      sessionId: data.data.session_id,
    });
  } catch (err) {
    console.error("Add Fund Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Payment Webhook: Update Balance Automatically
router.post("/payment-callback", async (req, res) => {
  try {
    const { status, amount, udf1: userId, customer_mobile } = req.body;
    if (status === "success") {
      const user = await User.findById(userId); // ya mobile se find
      if (user) {
        user.balance = (user.balance || 0) + Number(amount);
        await user.save();
        console.log("✅ Balance updated:", user.balance);
      }
    }
    res.send("OK");
  } catch (err) {
    console.error("Webhook Error:", err);
    res.status(500).send("Error");
  }
});

module.exports = router;
