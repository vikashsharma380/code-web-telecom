const express = require("express");
const axios = require("axios");
const router = express.Router();

// credentials
const MEMBER_ID = "6650";
const PASSWORD = "Ansari@2580";

/* ======================================================
   🚗 FASTAG INFO FETCH
   ====================================================== */
router.get("/fastag-info-fetch", async (req, res) => {
  try {
    const { VehicleNo, operator_code } = req.query;

    if (!VehicleNo || !operator_code) {
      return res.status(400).json({ error: "VehicleNo and operator_code are required" });
    }

    const url = `http://planapi.in/api/Mobile/FastagInfoFetch?apimember_id=${MEMBER_ID}&api_password=${PASSWORD}&VehicleNo=${VehicleNo}&operator_code=${operator_code}`;

    console.log("🚗 FASTAG INFO FETCH URL:", url);

    const response = await axios.get(url);
    return res.json(response.data);
  } catch (error) {
    console.error("FASTAG info fetch failed:", error.message);
    res.status(500).json({ error: "Failed to fetch FASTAG info" });
  }
});

/* ======================================================
   🔥 GAS INFO FETCH
   ====================================================== */
router.get("/gas-info-fetch", async (req, res) => {
  try {
    const { ConsumerNo, operator_code } = req.query;

    if (!ConsumerNo || !operator_code) {
      return res.status(400).json({ error: "ConsumerNo and operator_code are required" });
    }

    const url = `http://planapi.in/api/Mobile/GasInfoFetch?apimember_id=${MEMBER_ID}&api_password=${PASSWORD}&ConsumerNo=${ConsumerNo}&operator_code=${operator_code}`;

    console.log("🔥 GAS INFO FETCH URL:", url);

    const response = await axios.get(url);
    return res.json(response.data);
  } catch (error) {
    console.error("Gas info fetch failed:", error.message);
    res.status(500).json({ error: "Failed to fetch GAS info" });
  }
});

module.exports = router;
