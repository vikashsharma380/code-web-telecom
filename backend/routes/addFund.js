// routes/addFund.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, amount, redirect_url } = req.body;

    const createOrderRes = await axios.post("https://api.ekqr.in/api/v2/create_order", {
      key: process.env.UPI_GATEWAY_KEY, // from your merchant panel
      client_txn_id: Date.now().toString(),
      amount: amount.toString(),
      p_info: "Wallet Fund Add",
      customer_name: "User " + userId,
      customer_email: "user@example.com",
      customer_mobile: "9999999999",
      redirect_url,
      udf1: userId, // store user id for callback
    });

    const { status, data, msg } = createOrderRes.data;

    if (!status) return res.status(400).json({ success: false, error: msg });

    res.json({
      success: true,
      paymentUrl: data.payment_url,
      orderId: data.order_id,
      sessionId: data.session_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
