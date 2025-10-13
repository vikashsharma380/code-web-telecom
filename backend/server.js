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
// app.use(cors());
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

// ----------------- Recharge API -----------------


app.post("/api/dthrecharge", async (req, res) => {
  console.log("Received recharge request:", req.body);
  try {
    const { username, pwd, operatorcode, circlecode, number, amount, value1, value2 } = req.body;

    // ✅ Validation
    if (!username || !pwd  || !operatorcode || !circlecode || !number || !amount) {
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

app.post("/api/recharge", async (req, res) => {
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

    if (!username || !pwd) {
      return res.status(400).json({ success: false, error: "Username and password required" });
    }

    const url = `https://codewebtelecom.com/recharge/balance?username=${encodeURIComponent(username)}&pwd=${encodeURIComponent(pwd)}&format=json`;

    // External API call
    const response = await axios.get(url);

    console.log("💰 Balance API called:");
    console.log("Frontend sent:", { username });
    console.log("API Response:", response.data);

    // Send structured response to frontend
    res.json({
      success: true,
      balance: Number(response.data) || 0, // Number conversion
    });

  } catch (error) {
    console.error("❌ Balance fetch failed:", error.message);
    if (error.response) console.error("API Response:", error.response.data);

    return res.status(500).json({
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


// proxy ip address requests
const API_KEY = "YOUR_API_KEY";
const API_BASE = "https://www.mplan.in/api";

// ---------------- MOBILE ----------------

// Prepaid Mobile Plans
app.get("/mobile/prepaid", async (req, res) => {
  const { tel, operator, circle } = req.query;
  try {
    const response = await axios.get(`${API_BASE}/plans.php`, {
      params: { apikey: API_KEY, tel, operator, circle },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Postpaid ROFFER
app.get("/mobile/roffer", async (req, res) => {
  const { tel, operator } = req.query;
  try {
    const response = await axios.get(`${API_BASE}/plans.php`, {
      params: { apikey: API_KEY, tel, operator, offer: "roffer" },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Prepaid Validity Check
app.get("/mobile/validity", async (req, res) => {
  const { tel, operator } = req.query;
  try {
    const response = await axios.get(`${API_BASE}/validitycheck.php`, {
      params: { apikey: API_KEY, tel, operator, offer: "roffer" },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- DTH ----------------

// DTH Customer Info
app.get("/dth/info", async (req, res) => {
  const { tel, operator } = req.query;
  try {
    const response = await axios.get(`${API_BASE}/Dthinfo.php`, {
      params: { apikey: API_KEY, tel, operator, offer: "roffer" },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DTH Customer Info with Mobile
app.get("/dth/info-mobile", async (req, res) => {
  const { tel, operator } = req.query;
  try {
    const response = await axios.get(`${API_BASE}/DthinfoMobile.php`, {
      params: { apikey: API_KEY, tel, operator, offer: "roffer" },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DTH Plans
app.get("/dth/plans", async (req, res) => {
  const { operator } = req.query;
  try {
    const response = await axios.get(`${API_BASE}/dthplans.php`, {
      params: { apikey: API_KEY, operator },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DTH Plans with Channels
app.get("/dth/plans-channels", async (req, res) => {
  const { operator } = req.query;
  try {
    const response = await axios.get(`${API_BASE}/dth_plans.php`, {
      params: { apikey: API_KEY, operator },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DTH ROFFER
app.get("/dth/roffer", async (req, res) => {
  const { tel, operator } = req.query;
  try {
    const response = await axios.get(`${API_BASE}/DthRoffer.php`, {
      params: { apikey: API_KEY, tel, operator, offer: "roffer" },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DTH Heavy Refresh
app.get("/dth/heavy", async (req, res) => {
  const { tel, operator } = req.query;
  try {
    const response = await axios.get(`${API_BASE}/Dthheavy.php`, {
      params: { apikey: API_KEY, tel, operator, offer: "roffer" },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- ELECTRICITY ----------------
app.get("/electricity/info", async (req, res) => {
  const { tel, operator } = req.query;
  try {
    const response = await axios.get(`${API_BASE}/electricinfo.php`, {
      params: { apikey: API_KEY, tel, operator, offer: "roffer" },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- GAS ----------------
app.get("/gas/info", async (req, res) => {
  const { tel, operator } = req.query;
  try {
    const response = await axios.get(`${API_BASE}/Gas.php`, {
      params: { apikey: API_KEY, tel, operator, offer: "roffer" },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- WATER ----------------
app.get("/water/info", async (req, res) => {
  const { tel, operator } = req.query;
  try {
    const response = await axios.get(`${API_BASE}/Water.php`, {
      params: { apikey: API_KEY, tel, operator, offer: "roffer" },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- FASTAG ----------------
app.get("/fastag/info", async (req, res) => {
  const { tel, operator } = req.query;
  try {
    const response = await axios.get(`${API_BASE}/Fastag.php`, {
      params: { apikey: API_KEY, tel, operator, offer: "roffer" },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- INSURANCE ----------------
app.get("/insurance/info", async (req, res) => {
  const { tel, operator, mob, dob } = req.query;
  try {
    const params = { apikey: API_KEY, tel, operator, mob, offer: "roffer" };
    if (dob) params.dob = dob;
    const response = await axios.get(`${API_BASE}/insurance.php`, { params });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- OPERATOR INFO ----------------
app.get("/operator/info", async (req, res) => {
  const { tel } = req.query;
  try {
    const response = await axios.get(
      `http://operatorcheck.mplan.in/api/operatorinfo.php`,
      { params: { apikey: API_KEY, tel } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- BSNL ----------------
app.get("/bsnl/check", async (req, res) => {
  const { tel, operator, circle, stdcode } = req.query;
  try {
    const response = await axios.get(`${API_BASE}/Bsnl.php`, {
      params: { apikey: API_KEY, tel, operator, offer: "roffer", circle, stdcode },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/operator/:number", async (req, res) => {
  const number = req.params.number;
  const API_KEY = "6fda75354f70927c5d45a3a4dca7f6ce";
  try {
    const response = await axios.get(
      `http://operatorcheck.mplan.in/api/operatorinfo.php?apikey=${API_KEY}&tel=${number}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Operator API failed:", error.message);
    res.status(500).json({ error: "API call failed" });
  }
});
// ----------------- Start Server -----------------
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
