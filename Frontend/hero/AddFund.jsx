import React, { useState } from "react";

const AddFund = () => {
  const [amount, setAmount] = useState("");

const handleAddFund = async () => {
  if (!fundAmount || isNaN(fundAmount) || Number(fundAmount) <= 0) return;

  try {
    const res = await fetch("http://localhost:5000/api/add-fund", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(fundAmount), userId: "user123" }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Redirecting to payment page...");
      window.open(data.paymentUrl, "_blank"); // opens UPIGateway page
      setFundAmount("");
      setShowAddFundModal(false);
    } else {
      alert("❌ Failed: " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Server error: " + err.message);
  }
};

  return (
    <div>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleAddFund}>Add Fund via UPI</button>
      <script src="https://cdn.ekqr.in/ekqr_sdk.js"></script>
    </div>
  );
};

export default AddFund;
