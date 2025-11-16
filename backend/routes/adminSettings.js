// routes/adminSettings.js
const express = require("express");
const router = express.Router();
const OperatorApi = require("../models/OperatorApi");
const OperatorCommission = require("../models/OperatorCommission");
// const { verifyAdmin } = require("../middleware/authMiddleware"); // assume present

// Get operator settings (list) -> includes api and commissions for both schemes
router.get("/operator-settings", /* verifyAdmin, */ async (req, res) => {
  try {
    // optional: accept operatorCode filter via query
    const { operatorCode } = req.query;

    const apiFilter = operatorCode ? { operatorCode } : {};
    const apiList = await OperatorApi.find(apiFilter).lean();
    const commissionList = await OperatorCommission.find(operatorCode ? { operatorCode } : {}).lean();

    // build map
    const commissionMap = {};
    commissionList.forEach(c => {
      commissionMap[`${c.operatorCode}__${c.scheme}`] = c;
    });

    // gather union of operators
    const operatorSet = new Set();
    apiList.forEach(a => operatorSet.add(a.operatorCode));
    commissionList.forEach(c => operatorSet.add(c.operatorCode));

    const result = Array.from(operatorSet).map(op => {
      const api = apiList.find(a => a.operatorCode === op) || { operatorCode: op, selectedApi: "A1Topup", defaultApi: "A1Topup", alternateApi: "" };
      return {
        operatorCode: op,
        selectedApi: api.selectedApi,
        defaultApi: api.defaultApi,
        alternateApi: api.alternateApi,
        commissions: {
          RETAILER: commissionMap[`${op}__RETAILER`] ? commissionMap[`${op}__RETAILER`].commission : 0,
          DISTRIBUTOR: commissionMap[`${op}__DISTRIBUTOR`] ? commissionMap[`${op}__DISTRIBUTOR`].commission : 0,
        }
      };
    });

    res.json({ success: true, data: result });
  } catch (err) {
    console.error("GET operator-settings:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Change selected API for an operator
router.post("/change-api", /* verifyAdmin, */ async (req, res) => {
  try {
    const { operatorCode, selectedApi, defaultApi = "A1Topup", alternateApi = "" } = req.body;
    if (!operatorCode || !selectedApi) return res.status(400).json({ success: false, error: "operatorCode and selectedApi required" });

    const doc = await OperatorApi.findOneAndUpdate(
      { operatorCode },
      { selectedApi, defaultApi, alternateApi },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ success: true, message: "API updated", data: doc });
  } catch (err) {
    console.error("POST change-api:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Set commission for operator+scheme
router.post("/set-commission", /* verifyAdmin, */ async (req, res) => {
  try {
    const { operatorCode, scheme, commission } = req.body;
    if (!operatorCode || !scheme || commission === undefined) return res.status(400).json({ success: false, error: "operatorCode, scheme, commission required" });

    const doc = await OperatorCommission.findOneAndUpdate(
      { operatorCode, scheme },
      { commission: Number(commission) },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ success: true, message: "Commission updated", data: doc });
  } catch (err) {
    console.error("POST set-commission:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
