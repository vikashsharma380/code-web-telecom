import React, { useState } from "react";
import "./CSS/rechargeForm.css";

export default function FASTagRecharge() {
  const [formData, setFormData] = useState({
    number: "",
    amount: "",
    operatorcode: "",
    vehicleNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const username = "8517007867";
  const pwd = "0936Ec211013@";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      if (value === "" || (/^\d+$/.test(value) && parseInt(value) > 0)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRecharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const { number, amount, operatorcode } = formData;
    const orderid = "ORD" + Date.now();

    const url = `http://localhost:5000/api/recharge?username=${username}&pwd=${pwd}&operatorcode=${operatorcode}&circlecode=&number=${number}&amount=${amount}&orderid=${orderid}&format=json`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Recharge failed:", error);
      setResult({ error: "Failed to connect to API" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recharge-page">
      <div className="recharge-container">
        <div className="recharge-header">
          <h2>FASTAG RECHARGE</h2>
        </div>

        <div className="recharge-content">
          <div className="recharge-form-section">
            <form onSubmit={handleRecharge}>
              <div className="form-group">
                <label>Vehicle Number :</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  placeholder="Please Enter Vehicle Number*"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>FASTag Number :</label>
                <input
                  type="text"
                  name="number"
                  placeholder="Please Enter FASTag Number*"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Select Bank :</label>
                <select
                  name="operatorcode"
                  value={formData.operatorcode}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Bank*</option>
                  <option value="FASTAG01">ICICI Bank FASTag</option>
                  <option value="FASTAG02">HDFC Bank FASTag</option>
                  <option value="FASTAG03">Axis Bank FASTag</option>
                  <option value="FASTAG04">Paytm Payments Bank FASTag</option>
                  <option value="FASTAG05">SBI FASTag</option>
                </select>
              </div>

              <div className="form-group">
                <label>Amount :</label>
                <input
                  type="text"
                  name="amount"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="recharge-btn" disabled={loading}>
                {loading ? "Processing..." : "Recharge"}
              </button>
            </form>
          </div>
        </div>

        {result && (
          <div className="result-section">
            {result.error ? (
              <p className="result-error">Error: {result.error}</p>
            ) : (
              <p className="result-success">Recharge processed successfully!</p>
            )}
            <div className="result-data">{JSON.stringify(result, null, 2)}</div>
          </div>
        )}

        <div className="transaction-section">
          <h3>Last 5 Transaction</h3>
          <table className="transaction-table">
            <thead>
              <tr>
                <th>TXID</th>
                <th>Operator</th>
                <th>Number</th>
                <th>Operator Id</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colspan="7"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No transactions yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
