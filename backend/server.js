const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const Transaction = require("./models/Transaction");
const { verifyToken } = require("./middleware/authMiddleware");
const router = express.Router();
dotenv.config();
const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
const allowedOrigins = [
  "http://localhost:5173",  // ✅ local frontend
  "https://your-deployed-frontend-domain.com" // ✅ hosted frontend domain
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.get("/api/transactions", async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 }).limit(10);
  res.json(transactions);
});
// app.post("/api/dthrecharge", async (req, res) => {
//   console.log("Received recharge request:", req.body);
//   try {
//     const { username, pwd, operatorcode, circlecode, number, amount, value1, value2 } = req.body;

//     // ✅ Validation
//     if (!username || !pwd  || !operatorcode || !circlecode || !number || !amount) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // ✅ Generate unique order ID
//     const orderid = uuidv4();

//     // ✅ Build API URL safely
//     let url = `https://codewebtelecom.com/recharge/api?username=${encodeURIComponent(username)}&pwd=${encodeURIComponent(pwd)}&circlecode=${encodeURIComponent(circlecode)}&operatorcode=${encodeURIComponent(operatorcode)}&number=${encodeURIComponent(number)}&amount=${encodeURIComponent(amount)}&orderid=${orderid}&format=json`;

//     if (value1) url += `&value1=${encodeURIComponent(value1)}`;
//     if (value2) url += `&value2=${encodeURIComponent(value2)}`;

//     console.log("🔗 Recharge API call URL:", url);
//     console.log("📦 Request Body:", req.body);

//     // ✅ External API call
//     const response = await axios.get(url);

//     console.log("✅ Recharge API response:", response.data);
//     res.json(response.data);

//   } catch (error) {
//     // ✅ Error handling block
//     console.error("❌ Recharge failed:", error);

//     if (error.response) {
//       console.error("📄 API Response Data:", error.response.data);
//       console.error("📊 API Response Status:", error.response.status);
//     }

//     res.status(500).json({
//       error: "Recharge failed",
//       details: error.message,
//       apiResponse: error.response ? error.response.data : null
//     });
//   }
// });
const rechargeRoutes = require("./routes/recharge");
app.use("/api", rechargeRoutes); // ✅ ab /api/recharge route kaam karega


app.post("/api/fastagrecharge", async (req, res) => {
  console.log("Received recharge request:", req.body);
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
app.post("/api/gasrecharge", async (req, res) => {
  console.log("Received recharge request:", req.body);
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
app.get("/api/balance", async (req, res) => {
  try {
    const { username, pwd } = req.query;

    if (!username || !pwd) {
      return res.status(400).json({
        success: false,
        error: "Username and password are required",
      });
    }

    // ✅ Dynamic API call (no hardcoding)
    const url = `https://codewebtelecom.com/recharge/balance?username=${encodeURIComponent(
      username
    )}&pwd=${encodeURIComponent(pwd)}&format=json`;

    // External API call
    const response = await axios.get(url);

    console.log("💰 Balance API called successfully");
    console.log("Frontend sent:", { username });
    console.log("API Response:", response.data);

    res.json({
      success: true,
      balance: Number(response.data) || 0, // convert string to number
    });
  } catch (error) {
    console.error("❌ Balance fetch failed:", error.message);
    if (error.response) console.error("API Response:", error.response.data);

    res.status(500).json({
      success: false,
      error: "Balance fetch failed",
      details: error.message,
      apiResponse: error.response ? error.response.data : null,
    });
  }
});

app.get("/api/status", async (req, res) => {
  try {
    const { username, pwd, orderid } = req.query;
    const url = `https://codewebtelecom.com/recharge/api/status?username=${encodeURIComponent(username)}&pwd=${encodeURIComponent(pwd)}&orderid=${orderid}&format=json`;

    const response = await axios.get(url);
    // Correct backend response
 res.json({
      success: true,
      balance: Number(response.data) || 0, // Number conversion
    });

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

const path = require("path");

// Serve frontend build files
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});


















const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
