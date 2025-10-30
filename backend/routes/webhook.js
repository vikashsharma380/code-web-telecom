// routes/webhook.js
router.post("/upi-webhook", async (req, res) => {
  const { udf1: userId, amount, status } = req.body;
  if (status === "SUCCESS") {
    await User.updateOne({ _id: userId }, { $inc: { balance: Number(amount) } });
  }
  res.sendStatus(200);
});

