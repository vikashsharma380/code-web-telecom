const express = require("express");
const axios = require("axios");
const router = express.Router();

const MEMBER_ID = "6650";
const PASSWORD = "Ansari@2580";

// REVERSE mapping (internal -> original PlanAPI)
const reverseOperatorMapping = {
  "RC": "11", // JIO
  "A": "2",   // Airtel
  "V": "23",  // Vodafone
  "BT": "4",  // BSNL
  "I": "6"    // IDEA
};

const reverseCircleMapping = {
  "105": "22",
  "101": "27",
  "49": "13",
  "95": "14",
  "94": "8",
  "40": "7",
  "06": "9",
  "52": "17",
  "16": "26",
  "56": "24",
  "53": "23",
  "51": "2",
  "31": "6",
  "70": "18",
  "93": "16",
  "98": "12",
  "90": "4",
  "92": "3",
  "54": "10",
  "55": "25",
  "96": "20",
  "03": "21",
  "02": "1",
  "97": "11",
  "10": "5"
};

router.get("/fetch-mobile-plans", async (req, res) => {
  const { operatorcode, circle } = req.query;

  // internal → original convert
  const originalOperator = reverseOperatorMapping[operatorcode];
  const originalCircle = reverseCircleMapping[circle];

  if (!originalOperator || !originalCircle) {
    return res.status(400).json({ error: "Mapping not found for operator/circle" });
  }

  const url = `https://planapi.in/api/Mobile/NewMobilePlans?apimember_id=${MEMBER_ID}&api_password=${PASSWORD}&operatorcode=${originalOperator}&cricle=${originalCircle}`;

  try {
    console.log("Final API URL:", url);
    const response = await axios.get(url);

   if (response.data.RDATA) {
  return res.json({ RDATA: response.data.RDATA });
}

    return res.json(response.data);

  } catch (error) {
    console.error("PlanAPI Error:", error.message);
    res.status(500).json({ error: "Failed to fetch mobile plans" });
  }
});

module.exports = router;
