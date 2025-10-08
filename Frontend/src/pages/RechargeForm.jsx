import React, { useState } from "react";

function RechargeForm() {
  const [formData, setFormData] = useState({
    number: "",
    operatorcode: "",
    circlecode: "",
    amount: "",
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://localhost:5000/api/recharge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setResponse(data);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Mobile Recharge</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="number"
          placeholder="Mobile Number"
          value={formData.number}
          onChange={handleChange}
          required
        />
        <select name="operatorcode" onChange={handleChange} required>
          <option value="">Select Operator</option>
          <option value="AT">Airtel</option>
          <option value="VI">VI</option>
          <option value="RJ">Reliance Jio</option>
          <option value="BS">BSNL</option>
        </select>
        <select name="circlecode" onChange={handleChange} required>
          <option value="">Select Circle</option>
          <option value="DL">Delhi</option>
          <option value="MP">Madhya Pradesh</option>
          <option value="MH">Maharashtra</option>
        </select>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <button type="submit">Recharge Now</button>
      </form>

      {response && (
        <div style={{ marginTop: "20px" }}>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default RechargeForm;
