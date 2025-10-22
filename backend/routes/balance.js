const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/get-balance", async (req, res) => {
  try {
    const utilityResponse = await axios.get(
      "http://utility.a1topup.com/recharge/balance?username=500021&pwd=Ansari@2580&format=json"
    );
    console.log("Utility API response:", utilityResponse.data);

    const apiResponse = await axios.get(
      "http://business.a1topup.com/recharge/balance?username=505629&pwd=Ansari@2580&format=json"
    );
    console.log("Business API response:", apiResponse.data);

  res.json({
  success: true,
  apiBalance: apiResponse.data,       // .data hi number/string hai
  utilityBalance: utilityResponse.data,
});

  } catch (error) {
    console.error("Balance fetch error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch balances",
    });
  }
});

module.exports = router;
