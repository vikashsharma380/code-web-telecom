const express = require("express");
const axios = require("axios");
const router = express.Router();

// Your PlanAPI credentials
const MEMBER_ID = "6650";
const PASSWORD = "Ansari@2580";

/* ======================================================
   1️⃣  FETCH ELECTRICITY DISTRICT CODE
   ====================================================== */
router.get("/electricity-district-code", async (req, res) => {
  try {
    const { circle } = req.query; // optional
    const url = circle
      ? `https://planapi.in/api/Mobile/ElectricityDistrictCode?CircleId=${circle}`
      : `https://planapi.in/api/Mobile/ElectricityDistrictCode`;

    console.log("Fetching Electricity District Codes:", url);

    const response = await axios.get(url);
    return res.json(response.data);
  } catch (error) {
    console.error("District code fetch failed:", error.message);
    res.status(500).json({ error: "Failed to fetch district codes" });
  }
});

/* ======================================================
   2️⃣  FETCH ELECTRICITY BILL DETAILS
   ====================================================== */
router.get("/electricity-bill-fetch", async (req, res) => {
  try {
    const { bill_number, operator_code, optional1, optional2, optional3 } = req.query;

    if (!bill_number || !operator_code) {
      return res.status(400).json({ error: "bill_number and operator_code are required" });
    }

    const url = `http://planapi.in/api/Mobile/ElectricityBillFetch?apimember_id=${MEMBER_ID}&api_password=${PASSWORD}&bill_number=${bill_number}&operator_code=${operator_code}${
      optional1 ? `&Optional1=${encodeURIComponent(optional1)}` : ""
    }${optional2 ? `&Optional2=${encodeURIComponent(optional2)}` : ""}${
      optional3 ? `&Optional3=${encodeURIComponent(optional3)}` : ""
    }`;

    console.log("⚡ ELECTRICITY BILL FETCH URL:", url);

    const response = await axios.get(url);
    return res.json(response.data);
  } catch (error) {
    console.error("Bill fetch failed:", error.message);
    res.status(500).json({ error: "Failed to fetch electricity bill" });
  }
});

module.exports = router;
