// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ----------------- MongoDB Connection -----------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => {
  console.error("MongoDB connection error:", err.message);
  process.exit(1);
});

// ----------------- Recharge API -----------------
app.post("/api/recharge", async (req, res) => {
  try {
    const { username, pwd, circlecode, operatorcode, number, amount, value1, value2 } = req.body;

    // ✅ Validation
    if (!username || !pwd || !circlecode || !operatorcode || !number || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ Generate unique order ID
    const orderid = uuidv4();

    // ✅ Build API URL safely
    let url = `https://codewebtelecom.com/recharge/api?username=${encodeURIComponent(username)}&pwd=${encodeURIComponent(pwd)}&circlecode=${encodeURIComponent(circlecode)}&operatorcode=${encodeURIComponent(operatorcode)}&number=${encodeURIComponent(number)}&amount=${encodeURIComponent(amount)}&orderid=${orderid}&format=json`;

    if (value1) url += `&value1=${encodeURIComponent(value1)}`;
    if (value2) url += `&value2=${encodeURIComponent(value2)}`;

    console.log("🔗 Recharge API call URL:", url);
    console.log("📦 Request Body:", req.body);

    // ✅ External API call
    const response = await axios.get(url);

    console.log("✅ Recharge API response:", response.data);
    res.json(response.data);

  } catch (error) {
    // ✅ Error handling block
    console.error("❌ Recharge failed:", error);

    if (error.response) {
      console.error("📄 API Response Data:", error.response.data);
      console.error("📊 API Response Status:", error.response.status);
    }

    res.status(500).json({
      error: "Recharge failed",
      details: error.message,
      apiResponse: error.response ? error.response.data : null
    });
  }
});



// ----------------- Operator Lookup API -----------------
app.get("/api/lookup", async (req, res) => {
  try {
    const { number } = req.query;
    if (!number) return res.status(400).json({ error: "Number is required" });

    const lookupUrl = `https://codewebtelecom.com/recharge/api/lookup?number=${number}&format=json`;
    console.log("Lookup API call URL:", lookupUrl);

    const response = await axios.get(lookupUrl);
    console.log("Lookup API response:", response.data);

    res.json(response.data);
  } catch (error) {
    console.error("Lookup failed:", error.message);
    res.status(500).json({ error: "Lookup failed", details: error.message });
  }
});

app.get("/api/balance", async (req, res) => {
  try {
    const { username, pwd } = req.query;
   const url = `https://codewebtelecom.com/recharge/api/balance?username=${encodeURIComponent(username)}&pwd=${encodeURIComponent(pwd)}&format=json`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Balance check failed", details: error.message });
  }
});


app.get("/api/status", async (req, res) => {
  try {
    const { username, pwd, orderid } = req.query;
    const url = `https://codewebtelecom.com/recharge/api/status?username=${encodeURIComponent(username)}&pwd=${encodeURIComponent(pwd)}&orderid=${orderid}&format=json`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Status check failed", details: error.message });
  }
});


app.get("/callback", (req, res) => {
  const { txid, status, opid } = req.query;
  console.log("Callback received:", txid, status, opid);
  // Database me update kar do ya notification bhej do
  res.send("Callback received");
});
app.use("/api/auth", authRoutes);



// ----------------- Start Server -----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
