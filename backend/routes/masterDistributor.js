const express = require("express");
const router = express.Router();
const MasterDistributor = require("../models/MasterDistributor");

router.post("/register", async (req, res) => {
  try {
    const data = req.body;

    const existEmail = await MasterDistributor.findOne({ email: data.email });
    if (existEmail) return res.status(400).json({ message: "Email already exists" });

    const existMobile = await MasterDistributor.findOne({ mobile: data.mobile });
    if (existMobile) return res.status(400).json({ message: "Mobile already exists" });

    const newMD = new MasterDistributor(data);
    await newMD.save();

    res.status(201).json({ message: "Master Distributor Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = router;
