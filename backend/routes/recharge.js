// routes/recharge.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const Transaction = require("../models/Transaction");
const User = require("../models/user");

// Cutoff: users activated ON/AFTER this date are "new"
const cutoffDate = new Date("2025-10-25T00:00:00.000Z");

// Admin API credentials (use env vars in production)
const ADMIN_API_USERNAME = process.env.ADMIN_API_USERNAME || "505629";
const ADMIN_API_PWD = process.env.ADMIN_API_PWD || "Ansari@2580";
const ADMIN_API_BASE = process.env.ADMIN_API_BASE || "http://business.a1topup.com/recharge/api";

// Default external API base (for non-admin users)
const EXTERNAL_API_BASE = process.env.EXTERNAL_API_BASE || "https://codewebtelecom.com/recharge/api";

router.post("/recharge", verifyToken, async (req, res) => {
  try {
    const userFromToken = req.user;
    const { circlecode, operatorcode, number, amount: rawAmount, username, pwd } = req.body;

    // ✅ 1. Basic validation
    if (!circlecode || !operatorcode || !number || !rawAmount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const amount = Number(rawAmount);
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // ✅ 2. Fetch logged-in user
    const user = await User.findOne({ userId: userFromToken.userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    // ✅ 3. Determine user type (new / old)
    const activationDate = user.activationDate ? new Date(user.activationDate) : null;
    const isNewUser = activationDate ? activationDate >= cutoffDate : false;

    // 🧾 Logging
    console.log("--------------------------------------------------");
    console.log(`📱 Recharge Request for User: ${user.userId} (${user.name})`);
    console.log("Activation Date:", activationDate);
    console.log("Is New User:", isNewUser);
    console.log("Recharge details:", { circlecode, operatorcode, number, amount });
    console.log("--------------------------------------------------");

    const orderid = uuidv4();

    // Helper: Save transaction
    const saveTransaction = async (txData) => {
      try {
        await Transaction.create(txData);
      } catch (err) {
        console.error("❌ Failed to save transaction:", err.message);
      }
    };

    // ============================================================
    // 🔹 NEW USER FLOW (Admin API + Local Balance Deduction)
    // ============================================================
    if (isNewUser) {
      console.log("🧠 New User Flow → Admin API + Local Deduction");

      // Balance Check & Deduct Atomically
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id, balance: { $gte: amount } },
        { $inc: { balance: -amount } },
        { new: true }
      );

      if (!updatedUser) {
        console.log("❌ Insufficient balance for user:", user.userId);
        return res.status(400).json({ error: "Insufficient balance" });
      }

      // Prepare Admin API Params
      const adminParams = {
        username: ADMIN_API_USERNAME,
        pwd: ADMIN_API_PWD,
        circlecode,
        operatorcode,
        number,
        amount,
        orderid,
        format: "json",
      };

      console.log("🔗 Admin API Base:", ADMIN_API_BASE);
      console.log("🔗 Admin API Params:", { ...adminParams, pwd: "***" });

      let apiResponseData;
      try {
        const apiRes = await axios.get(ADMIN_API_BASE, { params: adminParams, timeout: 30000 });
        apiResponseData = apiRes.data;
        console.log("✅ Admin API Response:", apiResponseData);
      } catch (apiErr) {
        console.error("❌ Admin API Error:", apiErr.message);

        // Refund on failure
        await User.findByIdAndUpdate(user._id, { $inc: { balance: amount } });
        console.log("🔁 Refunded due to Admin API failure for:", user.userId);

        return res.status(502).json({
          error: "Admin Recharge API failed",
          details: apiErr.response ? apiErr.response.data : apiErr.message,
        });
      }

      // Save Transaction
      await saveTransaction({
        rechargeId: apiResponseData.txid || orderid,
        operator: operatorcode,
        number,
        amount,
        status: apiResponseData.status || "Pending",
        balance: updatedUser.balance,
        userId: user.userId,
        role: user.role,
        rawResponse: apiResponseData,
        dateTime: new Date(),
      });

      // Final Response
      return res.json({
        success: true,
        source: "admin-api",
        apiResponse: apiResponseData,
        balanceAfter: updatedUser.balance,
      });
    }

    // ============================================================
    // 🔹 OLD USER FLOW (User’s Own API; No Balance Deduction)
    // ============================================================
    else {
      console.log("🧠 Old User Flow → External/User API (No Deduction)");

      const apiBaseUrl =
        user.role === "admin" ? ADMIN_API_BASE : EXTERNAL_API_BASE;

      const apiUsername = username || user.apiUserId;
      const apiPwd = pwd || user.apiPassword;

      if (!apiUsername || !apiPwd) {
        console.warn("⚠️ Missing external API credentials. Likely to fail.");
      }

      const externalParams = {
        username: apiUsername,
        pwd: apiPwd,
        circlecode,
        operatorcode,
        number,
        amount,
        orderid,
        format: "json",
      };

      console.log("🔗 External API Base:", apiBaseUrl);
      console.log("🔗 External API Params:", { ...externalParams, pwd: "***" });

      let apiResponseData;
      try {
        const response = await axios.get(apiBaseUrl, { params: externalParams, timeout: 30000 });
        apiResponseData = response.data;
        console.log("✅ External API Response:", apiResponseData);
      } catch (err) {
        console.error("❌ External API Error:", err.message);
        return res.status(502).json({
          error: "External Recharge API failed",
          details: err.response ? err.response.data : err.message,
        });
      }

      // Save Transaction
      await saveTransaction({
        rechargeId: apiResponseData.txid || orderid,
        operator: operatorcode,
        number,
        amount,
        status: apiResponseData.status || "Pending",
        userId: user.userId,
        role: user.role,
        rawResponse: apiResponseData,
        dateTime: new Date(),
      });

      return res.json({
        success: true,
        source: "external-api",
        apiResponse: apiResponseData,
      });
    }
  } catch (err) {
    console.error("💥 Fatal Recharge Error:", err.message);
    return res.status(500).json({ error: "Recharge failed", details: err.message });
  }
});

module.exports = router;
