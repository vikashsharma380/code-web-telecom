// routes/addFund.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/add-fund", async (req, res) => {
  try {
    const { userId, amount, redirect_url } = req.body;

    const payload = {
      key: process.env.UPI_GATEWAY_KEY,
      client_txn_id: Date.now().toString(),
      amount: amount.toString(),
      p_info: "Wallet Fund Add",
      customer_name: "User " + userId,
      customer_email: "user@example.com",
      customer_mobile: "9999999999",
      redirect_url,
      udf1: userId,
    };

    console.log("📤 Sending to EKQR:", payload);

    const createOrderRes = await axios.post("https://api.ekqr.in/api/v2/create_order", payload);

    console.log("📥 EKQR Response:", createOrderRes.data);

    const { status, data, msg } = createOrderRes.data;

    if (!status) return res.status(400).json({ success: false, error: msg });

    res.json({
      success: true,
      paymentUrl: data.payment_url,
      orderId: data.order_id,
      sessionId: data.session_id,
    });
  } catch (err) {
    console.error("❌ Add Fund Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});


module.exports = router;
