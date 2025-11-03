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
    console.log("RAW API FULL =>", d);
    console.log("RAW API =>", d.OpCode, d.CircleCode, d.Operator, d.Circle);

    console.log("typeof OpCode =>", typeof d.OpCode, d.OpCode);
    console.log("typeof CircleCode =>", typeof d.CircleCode, d.CircleCode);

    const finalOperator = mapOperator(String(d.OpCode).replace(/^0+/, "")); // remove leading 0
    const finalCircle = mapCircle(String(d.CircleCode).replace(/^0+/, ""));  // remove leading 0

    console.log("Mapped Operator:", finalOperator);
    console.log("Mapped Circle:", finalCircle);

return res.json({
  operatorName: d.Operator,    // ← exact name
  operatorCode: finalOperator, // ← mapped code
  circleName: d.Circle,
  circleCode: finalCircle
});


  } catch (error) {
    console.error("Error fetching operator info:", error.message);
    res.status(500).json({ error: "Failed to fetch operator info" });
  }
});

module.exports = router;
