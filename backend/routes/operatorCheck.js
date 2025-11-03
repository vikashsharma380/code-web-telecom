// routes/operatorCheck.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { mapOperator, mapCircle } = require("../middleware/mapping");

router.get("/operator-info/:mobile", async (req, res) => {
  const mobile = req.params.mobile;

  try {
       const response = await axios.get(
      `https://planapi.in/api/Mobile/OperatorFetchNew?ApiUserID=6650&ApiPassword=Ansari@2580&Mobileno=${mobile}`
    );

    const d = response.data;

    const finalOperator = operatorMap[d.OpCode] || "";
    const finalCircle = circleMap[d.CircleCode] || "";
    console.log("Mapped Operator:", finalOperator);
    console.log("Mapped Circle:", finalCircle);

    return res.json({
      operator: finalOperator,
      circle: finalCircle
    });

  } catch (error) {
    console.error("Error fetching operator info:", error.message);
    res.status(500).json({ error: "Failed to fetch operator info" });
  }
});

module.exports = router;
