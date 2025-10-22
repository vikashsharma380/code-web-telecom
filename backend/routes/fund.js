const express = require("express");
const fetch = require("node-fetch"); // use node-fetch v3
const router = express.Router();
require("dotenv").config();

// POST /api/add-fund
router.post("/add-fund", async (req, res) => {
  try {
    const { amount, userId } = req.body;

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ success: false, error: "Invalid amount" });
    }

    // Create unique client transaction ID
    const clientTxnId = `txn_${Date.now()}_${userId}`;

    // UPIGateway API URL
    const url = "https://api.ekqr.in/api/v2/create_order";

    const body = {
      key: process.env.UPI_API_KEY,
      client_txn_id: clientTxnId,
      amount: String(amount),
      p_info: "Add Fund",
      customer_name: "User", // optional
      customer_email: "user@example.com", // optional
      customer_mobile: "9876543210", // optional
      redirect_url: "http://localhost:3000/dashboard", // after payment
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!data.status) {
      return res.status(400).json({ success: false, error: data.msg });
    }

    // Return the payment URL and order ID to frontend
    res.json({
      success: true,
      orderId: data.data.order_id,
      paymentUrl: data.data.payment_url,
      sessionId: data.data.session_id,
    });
  } catch (err) {
    console.error("Add Fund Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
