// routes/operatorCheck.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/operator-info/:mobile", async (req, res) => {
  const mobile = req.params.mobile;

  try {
    const response = await axios.get(
      `https://www.nixinfo.in/api/operator-and-circle-api?status=status&emailid=vikashpandit380@gmail.com&ctrlkey=e510c57d498ae3302f5c61ba2ebff78ef08fd774774096683&mobnumber=${mobile}`
    );

    console.log("Operator API called for:", mobile);
    console.log("Response from NixInfo:", response.data);

    return res.json(response.data); // <--- only 1 time response
  } catch (error) {
    console.error("Error fetching operator info:", error.message);
    res.status(500).json({ error: "Failed to fetch operator info" });
  }
});

module.exports = router;
