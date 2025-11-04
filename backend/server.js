const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const Transaction = require("./models/Transaction");
const { verifyToken } = require("./middleware/authMiddleware");
const nodemailer = require("nodemailer");
const Contact = require("./models/contact");



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
  "http://localhost:5173",               // local dev
  "https://codewebtelecomin.vercel.app", // Vercel default
  "https://codewebtelecom.in",           // custom domain
  "https://www.codewebtelecom.in"        // www subdomain (important!)
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

app.options('*', cors());




app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 }).limit(10);
    res.json({ success: true, transactions }); // ✅ add success key
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch transactions" });
  }
});


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
const User = require("./models/user"); // 🔁 adjust path if needed

app.get("/api/balance", async (req, res) => {
  try {
    const { username, pwd } = req.query;

    if (!username || !pwd) {
      return res.status(400).json({
        success: false,
        error: "Username and password are required",
      });
    }

    const user = await User.findOne({
      $or: [
        { mobile: username },
        { phone: username },
        { userId: Number(username) },
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // ✅ Define cutoff date (25 Oct 2025)
    const cutoffDate = new Date("2025-10-25T00:00:00.000Z");

    // ✅ Get activation date
    const activationDate = new Date(user.activationDate);

    // ✅ Determine old/new
    const isNewUser = activationDate >= cutoffDate;

    if (isNewUser) {
      console.log(`💾 Fetching NEW user (${user.name}) balance from MongoDB`);
      return res.json({
        success: true,
        source: "local",
        balance: user.balance || 0,
      });
    } else {
      const url = `https://codewebtelecom.com/recharge/balance?username=${encodeURIComponent(
        username
      )}&pwd=${encodeURIComponent(pwd)}&format=json`;

      console.log("🌐 Fetching OLD user balance from external API:", url);

      const response = await axios.get(url);

      const balance =
        typeof response.data === "object"
          ? Number(response.data.balance) || 0
          : Number(response.data) || 0;

      return res.json({
        success: true,
        source: "external",
        balance,
      });
    }
  } catch (error) {
    console.error("❌ Balance fetch failed:", error.message);
    if (error.response) console.error("🔴 API Response:", error.response.data);

    res.status(500).json({
      success: false,
      error: "Balance fetch failed",
      details: error.message,
      apiResponse: error.response ? error.response.data : null,
    });
  }
});
const fundRoutes = require("./routes/addFund");
app.use("/api", fundRoutes);
const retailerRoutes = require("./routes/retailer");
app.use("/api", retailerRoutes);



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




const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.post("/api/contact", async (req, res) => {
  console.log("📩 /api/contact hit with:", req.body);
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message)
      return res.status(400).json({ error: "All fields required" });

    // Mongoose save
    const contact = new Contact({ name, email, phone, message });
    await contact.save();

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `📩 New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Contact form error:", err);
    res.status(500).json({ error: err.message });
  }
});





const balanceRoutes = require("./routes/balance");
app.use("/api", balanceRoutes); // ✅ API routes first

const getRechargesRoute = require("./routes/getRecharges");
app.use("/api/recharges", getRechargesRoute);

const refundReportRoute = require("./routes/refund");
app.use("/api", refundReportRoute);
const earningsRoutes = require("./routes/earnings");
app.use("/api", earningsRoutes);
const transactionsRoutes = require("./routes/transactions");
app.use("/api", transactionsRoutes);

const ticketRoutes = require("./routes/ticketRoutes");
app.use("/api/tickets", ticketRoutes);


const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);
const operatorCheck = require("./routes/operatorCheck");
app.use("/api", operatorCheck);

const simplePlan = require("./routes/simplePlan");
app.use("/api", simplePlan);

const commissionRoutes = require("./routes/commissionRoutes");
app.use("/api/commission", commissionRoutes);

const distributorRoutes = require("./routes/distributor");
app.use("/api/distributor", distributorRoutes);

const masterDistributorRoutes = require("./routes/masterDistributor");
app.use("/api/master-distributor", masterDistributorRoutes);

const electricityRoutes = require("./routes/electricity");

app.use("/api", electricityRoutes);


app.get("/myip", async (req, res) => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching IP:", error.message);
    res.status(500).json({ error: "Failed to get server IP" });
  }
});

// Serve frontend
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

// Catch-all for frontend routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html"));
});









const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
