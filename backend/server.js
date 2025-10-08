// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

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

    // Validation
    if (!username || !pwd || !circlecode || !operatorcode || !number || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Generate unique order ID
    const orderid = uuidv4();

    // Build API URL
    let url = `https://codewebtelecom.com/recharge/api?username=${encodeURIComponent(username)}&pwd=${encodeURIComponent(pwd)}&circlecode=${circlecode}&operatorcode=${operatorcode}&number=${number}&amount=${amount}&orderid=${orderid}&format=json`;

    if (value1) url += `&value1=${encodeURIComponent(value1)}`;
    if (value2) url += `&value2=${encodeURIComponent(value2)}`;

    console.log("Recharge API call URL:", url);
    console.log("Request Body:", req.body);

    // Call external API
    const response = await axios.get(url);
    console.log("Recharge API response:", response.data);

    res.json(response.data);
  } catch (error) {
    console.error("Recharge failed:", error.message);
    res.status(500).json({ error: "Recharge failed", details: error.message });
  }
});

// ----------------- Operator Lookup API -----------------
app.get("/api/lookup", async (req, res) => {
  try {
    const { number } = req.query;
    if (!number) return res.status(400).json({ error: "Number is required" });

    const lookupUrl = `https://codewebtelecom.com/recharge/lookup?number=${number}&format=json`;
    console.log("Lookup API call URL:", lookupUrl);

    const response = await axios.get(lookupUrl);
    console.log("Lookup API response:", response.data);

    res.json(response.data);
  } catch (error) {
    console.error("Lookup failed:", error.message);
    res.status(500).json({ error: "Lookup failed", details: error.message });
  }
});

// ----------------- Start Server -----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
