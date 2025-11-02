// routes/masterDistributor.js
const express = require("express");
const bcrypt = require("bcryptjs");
const MasterDistributor = require("../models/MasterDistributor");
const Counter = require("../models/Counter");
const router = express.Router();

// helper: get next sequence and return zero-padded MD ID
async function getNextMdUserId() {
  // counter document name kept separate for master distributors
  const counter = await Counter.findOneAndUpdate(
    { name: "masterDistributorSeq" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const seq = counter.seq; // starts at 1 (default 0 + 1)
  // zero-pad to 6 digits
  const padded = String(seq).padStart(6, "0");
  return `MD${padded}`; // e.g., MD000001
}

// generate random password (8 chars: letters + digits)
function generatePlainPassword() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) result += letters[Math.floor(Math.random() * letters.length)];
  for (let i = 0; i < 2; i++) result += digits[Math.floor(Math.random() * digits.length)];
  // shuffle
  result = result.split("").sort(() => 0.5 - Math.random()).join("");
  return result;
}

router.post("/register", async (req, res) => {
  try {
    const {
      masterDistributorName,
      email,
      mobileNo,
      alternateNumber,
      businessType,
      panNo,
      contactPerson,
      postalAddress,
      pinCode,
      state,
      cityDistrict,
      selectScheme,
      openingBalance,
    } = req.body;

    // minimal validation
    if (!masterDistributorName || !email || !mobileNo) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing: name, email and mobile are required.",
      });
    }

    // duplicates
    const emailExists = await MasterDistributor.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const mobileExists = await MasterDistributor.findOne({ mobile: mobileNo });
    if (mobileExists) {
      return res.status(400).json({ success: false, message: "Mobile already registered" });
    }

    // generate ID & password
    const userId = await getNextMdUserId();
    const plainPassword = generatePlainPassword();
    const hashed = await bcrypt.hash(plainPassword, 10);

    // create
    const md = new MasterDistributor({
      userId,
      name: masterDistributorName,
      email,
      mobile: mobileNo,
      phone: mobileNo,
      alternateNumber: alternateNumber || "",
      businessType: businessType || "",
      panNo: panNo || "",
      contactPerson: contactPerson || "",
      postalAddress: postalAddress || "",
      pinCode: pinCode || "",
      state: state || "",
      cityDistrict: cityDistrict || "",
      scheme: selectScheme || "",
      balance: openingBalance ? Number(openingBalance) : 0,
      password: hashed,
      role: "master-distributor",
    });

    await md.save();

    // optionally send WhatsApp/SMS/email here (reuse your helper) — not included
    // return success + plain password (ONE TIME)
    return res.json({
      success: true,
      message: "Master Distributor registered successfully",
      userId,
      password: plainPassword,
    });
  } catch (err) {
    console.error("MasterDistributor register error:", err);
    // if Counter upsert created but save failed, seq already consumed. You may add rollback logic if required.
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;

