import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/lookup", async (req, res) => {
  const { number } = req.query;
  try {
    const response = await fetch(
      `https://business.a1topup.com/recharge/lookup?number=${number}&format=json`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch operator info" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
