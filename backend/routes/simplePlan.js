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
  "27": "101", // MP & Chattisgarh
  "22": "105",
  "13": "49",
  "14": "95",
  "8": "94",
  "7": "40",
  "9": "06",
  // baki jitne bhi tu add karna chahe yahi me add kar lena
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
      return res.json(response.data.RDATA);
    }

    return res.json(response.data);

  } catch (error) {
    console.error("PlanAPI Error:", error.message);
    res.status(500).json({ error: "Failed to fetch mobile plans" });
  }
});

module.exports = router;
