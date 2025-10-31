// routes/operatorCheck.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

const API_KEY = "6fda75354f70927c5d45a3a4dca7f6ce"; // replace with your real API key

router.get("/operator-info/:mobile", async (req, res) => {
  const mobile = req.params.mobile;

  try {
    const response = await axios.get(
      `http://operatorcheck.mplan.in/api/operatorinfo.php?apikey=${API_KEY}&tel=${mobile}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching operator info:", error.message);
    res.status(500).json({ error: "Failed to fetch operator info" });
  }
});

module.exports = router;
