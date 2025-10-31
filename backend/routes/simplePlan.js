const express = require("express");
const axios = require("axios");
const router = express.Router();

const API_KEY = "6fda75354f70927c5d45a3a4dca7f6ce"; // apna real API key

// Example: /api/simple-plan?circle=Gujarat&operator=Jio
router.get("/simple-plan", async (req, res) => {
  const { circle, operator } = req.query;

  try {
    const url = `https://www.mplan.in/api/plans.php?apikey=${API_KEY}&circle=${circle}&operator=${operator}`;
    console.log("Fetching Mplan URL:", url); // 👈 Debug line
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Mplan plans:", error.message);
    res.status(500).json({ error: "Failed to fetch simple plan" });
  }
});


module.exports = router;
