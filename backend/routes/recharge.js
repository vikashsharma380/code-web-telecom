const express = require("express");
const router = express.Router();
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const { verifyToken } = require("../middleware/authMiddleware");

const User = require("../models/user");
const OperatorApi = require("../models/OperatorApi");
const OperatorCommission = require("../models/Commission");
const Transaction = require("../models/Transaction");

// A1Topup PRIMARY API
const PRIMARY_API = "http://business.a1topup.com/recharge/api";
const PRIMARY_USER = "505629";
const PRIMARY_PWD = "Ansari@2580";

// A1TOPUP-UTILITY SECONDARY API
const SECONDARY_API = "http://utility.a1topup.com/recharge/api";
const SEC_USER = "500021";
const SEC_PWD = "Ansari@2580";

router.post("/recharge", verifyToken, async (req, res) => {
  try {
    const { operatorcode, circlecode, number, amount } = req.body;
    const userId = req.user.userId;

    if (!operatorcode || !circlecode || !number || !amount)
      return res.status(400).json({ error: "Missing fields" });

    // Fetch user
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    // SCHEME (Retailer / Distributor)
    const scheme = user.role === "distributor" ? "DISTRIBUTOR" : "RETAILER";

    // Fetch commission
    const comDoc = await OperatorCommission.findOne({
      operatorCode: operatorcode,
      scheme,
    });

    const commissionPercent = comDoc?.commission || 0;

    // Commission logic
    const commissionAmount = (amount * commissionPercent) / 100;
    const finalDeduction = Number((amount - commissionAmount).toFixed(4));

    // Balance check & Deduct
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user._id,
        balance: { $gte: finalDeduction },
      },
      { $inc: { balance: -finalDeduction } },
      { new: true }
    );

    if (!updatedUser)
      return res.status(400).json({ error: "Insufficient balance" });

    const orderid = uuidv4();

    // Operator wise selected API
    const apiData = await OperatorApi.findOne({ operatorCode: operatorcode });
    const selectedApi = apiData?.selectedApi || "A1Topup";

    // Primary params
    const primaryParams = {
      username: PRIMARY_USER,
      pwd: PRIMARY_PWD,
      circlecode,
      operatorcode,
      number,
      amount,
      orderid,
      format: "json",
    };

    // Secondary params
    const secondaryParams = {
      username: SEC_USER,
      pwd: SEC_PWD,
      circlecode,
      operatorcode,
      number,
      amount,
      orderid,
      format: "json",
    };

    let apiResponse = null;

    // 1️⃣ CALL PRIMARY API
    try {
      apiResponse = (
        await axios.get(PRIMARY_API, { params: primaryParams })
      ).data;
    } catch (e) {
      apiResponse = null;
    }

    // 2️⃣ FAILOVER → CALL SECONDARY
    if (!apiResponse || apiResponse.status !== "Success") {
      try {
        apiResponse = (
          await axios.get(SECONDARY_API, { params: secondaryParams })
        ).data;
      } catch (err) {
        // refund if secondary also fails
        await User.findByIdAndUpdate(user._id, {
          $inc: { balance: finalDeduction },
        });

        return res.status(502).json({
          success: false,
          error: "Both APIs failed. Amount refunded.",
        });
      }
    }

    // Save transaction
    await Transaction.create({
      rechargeId: apiResponse.txid || orderid,
      operator: operatorcode,
      number,
      amount,
      finalDeduction,
      commissionPercent,
      commissionAmount,
      status: apiResponse.status,
      userId: user.userId,
      dateTime: new Date(),
      rawResponse: apiResponse,
    });

    return res.json({
      success: true,
      message: "Recharge done",
      apiResponse,
      profit: commissionAmount,
      balanceAfter: updatedUser.balance,
    });
  } catch (err) {
    console.log("RECHARGE ERROR:", err.message);
    return res
      .status(500)
      .json({ error: "Recharge failed", details: err.message });
  }
});

module.exports = router;
