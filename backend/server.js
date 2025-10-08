const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());




// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => {
  console.error("MongoDB connection error:", err.message);
  process.exit(1);
});



// --- Lookup operator ---
app.get("/api/lookup", async (req, res) => {
  const { number } = req.query;
  if (!number) return res.status(400).json({ error: "Number is required" });

  try {
    const response = await fetch(
  `https://business.a1topup.com/recharge/lookup?number=${number}&format=json`
);

    if (!response.ok) {
      return res.status(response.status).json({ error: "Operator lookup failed" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// --- Recharge ---
app.get("/api/recharge", async (req, res) => {
  const { username, pwd, operatorcode, circlecode, number, amount, orderid, format } = req.query;

  if (!username || !pwd || !operatorcode || !circlecode || !number || !amount || !orderid || !format) {
    return res.status(400).json({ error: "All parameters are required" });
  }

  try {
    const response = await fetch(
      `https://business.a1topup.com/recharge/recharge?username=${username}&pwd=${pwd}&operatorcode=${operatorcode}&circlecode=${circlecode}&number=${number}&amount=${amount}&orderid=${orderid}&format=${format}`
    );

    const data = await response.json();

    // Optionally store recharge info in MongoDB
    // const Recharge = mongoose.model("Recharge", new mongoose.Schema({
    //   number: String,
    //   amount: Number,
    //   operatorcode: String,
    //   circlecode: String,
    //   orderid: String,
    //   response: Object,
    //   createdAt: { type: Date, default: Date.now }
    // }));
    // await Recharge.create({ number, amount, operatorcode, circlecode, orderid, response: data });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
