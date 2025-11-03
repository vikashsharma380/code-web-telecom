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
  "27": "101", // Madhya Pradesh + Chhattisgarh
  "16": "101", // (both same original code 101)

  "22": "105", // Jharkhand
  "13": "49",  // Andhra Pradesh
  "14": "95",  // Kerala
  "8": "94",   // Tamil Nadu
  "7": "40",   // Chennai
  "9": "06",   // Karnataka
  "17": "52",  // Bihar/Jharkhand Alternate old mapping
  "24": "56",  // Assam
  "23": "53",  // North East
  "2": "51",   // West Bengal
  "6": "31",   // Kolkata
  "18": "70",  // Rajasthan
  "12": "98",  // Gujarat
  "4": "90",   // Maharashtra
  "3": "92",   // Mumbai
  "10": "54",  // UP East
  "25": "55",  // Jammu & Kashmir
  "20": "96",  // Haryana
  "21": "03",  // Himachal Pradesh
  "1": "02",   // Punjab
  "11": "97",  // UP West + Uttarakhand
  "5": "10",   // Delhi NCR
}


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
