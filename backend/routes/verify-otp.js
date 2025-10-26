// /api/auth/verify-otp
router.post("/verify-otp", (req, res) => {
  const { mobile, otp } = req.body;
  const storedOtp = otpStore.get(mobile);

  if (!storedOtp) return res.status(400).json({ message: "OTP expired" });
  if (parseInt(otp) !== storedOtp)
    return res.status(400).json({ message: "Invalid OTP" });

  otpStore.delete(mobile); // clear OTP after success
  res.json({ success: true, message: "OTP verified" });
});
