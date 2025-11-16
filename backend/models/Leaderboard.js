const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  userId: Number,
  name: String,
  phone: String,
  role: String,

  business: { type: Number, default: 0 },
  commission: { type: Number, default: 0 },
  today: { type: Number, default: 0 },
  transactions: { type: Number, default: 0 },

  growth: { type: String, default: "0" },
});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
