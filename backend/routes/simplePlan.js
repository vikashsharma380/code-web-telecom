const express = require("express");
const axios = require("axios");
const router = express.Router();

const MEMBER_ID = "6650";
const PASSWORD = "Ansari@2580";

router.get("/fetch-mobile-plans", async (req, res) => {
  const { operatorcode, circle } = req.query;

  if (!operatorcode || !circle) {
    return res.status(400).json({ error: "operatorcode & circle both required" });
  }

  const url = `https://planapi.in/api/Mobile/NewMobilePlans?apimember_id=${MEMBER_ID}&api_password=${PASSWORD}&operatorcode=${operatorcode}&cricle=${circle}`;

  try {
    console.log("Fetching PlanAPI URL:", url);
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("PlanAPI Error:", error.message);
    res.status(500).json({ error: "Failed to fetch mobile plans" });
  }
});

module.exports = router;
