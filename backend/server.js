const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const connectDB=require('./config/db');

dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());
connectDB();



app.get("/", (req, res) => {
  res.send("Welcome to Code Web Telecom 🚀");
});

app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));