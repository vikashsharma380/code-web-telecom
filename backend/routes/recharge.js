const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const Transaction = require("../models/Transaction");


//   try {
//     const user = req.user;
//     const { circlecode, operatorcode, number, amount } = req.body;

//     if (!circlecode || !operatorcode || !number || !amount)
//       return res.status(400).json({ error: "Missing required fields" });

//     const orderid = uuidv4();

//     let username, pwd, apiBaseUrl;

//     if (user.role === "admin") {
//       username = "ADMIN_USERNAME";
//       pwd = "ADMIN_PASSWORD";
//       apiBaseUrl = "http://business.a1topup.com/recharge/api";
//     } else {
//       username = "500011";
//       pwd = "123";
//       apiBaseUrl = "https://codewebtelecom.com/recharge/api";
//     }

//     const url = `${apiBaseUrl}?username=${encodeURIComponent(
//       username
//     )}&pwd=${encodeURIComponent(pwd)}&circlecode=${encodeURIComponent(
//       circlecode
//     )}&operatorcode=${encodeURIComponent(
//       operatorcode
//     )}&number=${encodeURIComponent(number)}&amount=${encodeURIComponent(
//       amount
//     )}&orderid=${orderid}&format=json`;

//     const response = await axios.get(url);

//     // Save transaction
//     await Transaction.create({
//       txid: response.data.txid || orderid,
//       operator: operatorcode,
//       number,
//       amount,
//       status: response.data.status || "Pending",
//       role: user.role,
//       userId: user.userId,
//     });

//     res.json(response.data);
//   } catch (err) {
//     console.error("Recharge failed:", err);
//     res.status(500).json({ error: "Recharge failed", details: err.message });
//   }
// });
router.post("/recharge", verifyToken, async (req, res) => {
  try {
    const user = req.user; // decoded from token, has userId & apiPassword
    const { circlecode, operatorcode, number, amount } = req.body;

    if (!circlecode || !operatorcode || !number || !amount)
      return res.status(400).json({ error: "Missing required fields" });

    const orderid = uuidv4();

    // ✅ Use logged-in user's credentials for API
    const username = req.body.username; // frontend se aayega
const pwd = req.body.pwd;           // frontend se aayega
       // user's API password
    const apiBaseUrl =
      user.role === "admin"
        ? "http://business.a1topup.com/recharge/api"
        : "https://codewebtelecom.com/recharge/api";

    const url = `${apiBaseUrl}?username=${encodeURIComponent(
      username
    )}&pwd=${encodeURIComponent(pwd)}&circlecode=${encodeURIComponent(
      circlecode
    )}&operatorcode=${encodeURIComponent(
      operatorcode
    )}&number=${encodeURIComponent(number)}&amount=${encodeURIComponent(
      amount
    )}&orderid=${orderid}&format=json`;

    console.log("🔗 Recharge API URL:", url);

    const response = await axios.get(url);
    const data = response.data;

    console.log("✅ Recharge API response:", data);

    // Save transaction
  await Transaction.create({
  rechargeId: data.txid || orderid,       // matches frontend
  operator: operatorcode,
  operatorId: data.operatorId || operatorcode, // get from API response or use code
  number,
  amount,
  profit: data.profit || 0,               // if API returns profit
  balance: data.balance || 0,             // if API returns balance
  status: data.status || "Pending",
  dateTime: new Date(),                   // store current date/time
  role: user.role,
  userId: user.userId,
});

    res.json(data);
   
  } catch (err) {
    console.error("Recharge failed:", err);
    res.status(500).json({ error: "Recharge failed", details: err.message });
  }
});

module.exports = router;
