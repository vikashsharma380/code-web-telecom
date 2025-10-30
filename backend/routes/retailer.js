// routes/retailer.js
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const router = express.Router();

router.post("/retailer-register", async (req, res) => {
  try {
    const {
      retailerName,
      selectParent,
      postalAddress,
      pinCode,
      state,
      mobileNo,
      alternatNumber,
      retailerBusinessType,
      email,
      panNoGSTNumber,
      contactPerson,
      selectScheme,
      openingBalance,
    } = req.body;

    if (!retailerName || !mobileNo || !email || !postalAddress) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all required fields" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Retailer already registered" });
    }

    const newRetailer = new User({
      name: retailerName,
      email,
      mobile: mobileNo,
      phone: mobileNo,
      address: postalAddress,
      pincode: pinCode,
      state,
      parent: selectParent,
      altMobile: alternatNumber,
      businessType: retailerBusinessType,
      gstOrPan: panNoGSTNumber,
      contactPerson,
      scheme: selectScheme,
      balance: openingBalance || 0,
      role: "Retailer",
      password: await bcrypt.hash(mobileNo, 10),
    });

    await newRetailer.save();

    res.json({ success: true, message: "Retailer registered successfully" });
  } catch (err) {
    console.error("Retailer Registration Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
