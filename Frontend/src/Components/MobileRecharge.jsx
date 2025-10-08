import React, { useState, useEffect } from "react";
import '../CSS/MobileRecharge.css'

export default function MobileRecharge() {
  const [formData, setFormData] = useState({
    number: "",
    amount: "",
    operatorcode: "",
    circlecode: "",
  });
  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [result, setResult] = useState(null);

 const operators = [
  { code: "A", name: "Airtel" },
  { code: "V", name: "Vodafone" },
  { code: "BT", name: "BSNL - TOPUP" },
  { code: "RC", name: "RELIANCE - JIO" },
  { code: "I", name: "Idea" },
  { code: "BR", name: "BSNL - STV" },
  { code: "GLF", name: "Google Play" },
  { code: "AXF", name: "Axis Bank Fastag" },
  { code: "BBF", name: "Bank Of Baroda - Fastag" },
  { code: "EFF", name: "Equitas Fastag Recharge" },
  { code: "FDF", name: "Federal Bank - Fastag" },
  { code: "HDF", name: "Hdfc Bank - Fastag" },
  { code: "ICF", name: "Icici Bank Fastag" },
  { code: "IBF", name: "Idbi Bank Fastag" },
  { code: "IFF", name: "Idfc First Bank- Fastag" },
  { code: "IHMCF", name: "Indian Highways Management Company Ltd Fastag" },
  { code: "INDF", name: "Indusind Bank Fastag" },
  { code: "JKF", name: "Jammu And Kashmir Bank Fastag" },
  { code: "KMF", name: "Kotak Mahindra Bank - Fastag" },
  { code: "PTF", name: "Paytm Payments Bank Fastag" },
  { code: "SBF", name: "Sbi Bank Fastag" },
  { code: "HPSEBL", name: "HP" },
  { code: "Hpgas", name: "Hp Gas" },
];


const circles = [
  { code: "13", name: "Andhra Pradesh" },
  { code: "24", name: "Assam" },
  { code: "17", name: "Bihar" },
  { code: "27", name: "Chhattisgarh" },
  { code: "12", name: "Gujarat" },
  { code: "20", name: "Haryana" },
  { code: "21", name: "Himachal Pradesh" },
  { code: "25", name: "Jammu And Kashmir" },
  { code: "22", name: "Jharkhand" },
  { code: "9",  name: "Karnataka" },
  { code: "14", name: "Kerala" },
  { code: "16", name: "Madhya Pradesh" },
  { code: "4",  name: "Maharashtra" },
  { code: "2",  name: "West Bengal" },
  { code: "10", name: "Uttar Pradesh East" },
  { code: "11", name: "Uttar Pradesh West" },
  { code: "3",  name: "Mumbai" },
  { code: "5",  name: "Delhi" },
  { code: "7",  name: "CHENNAI" },
  { code: "6",  name: "Kolkata" },
  { code: "8",  name: "Tamil Nadu" },
  { code: "1",  name: "Punjab" },
  { code: "18", name: "Rajasthan" },
  { code: "26", name: "NORTH EAST" },
];


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      if (value === "" || (/^\d+$/.test(value) && parseInt(value) > 0)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "number") {
      if (value === "" || /^\d+$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Auto detect operator safely
  useEffect(() => {
    const detectOperator = async () => {
      if (formData.number.length === 10) {
        setDetecting(true);
        try {
          const res = await fetch(`http://localhost:5000/api/lookup?number=${formData.number}`);
          if (!res.ok) throw new Error(`Server returned ${res.status}`);
          const data = await res.json();
          if (data.operatorcode) setFormData((prev) => ({ ...prev, operatorcode: data.operatorcode }));
          if (data.circlecode) setFormData((prev) => ({ ...prev, circlecode: data.circlecode }));
        } catch (error) {
          console.warn("Auto-detect failed, use dropdown manually", error);
        } finally {
          setDetecting(false);
        }
      }
    };
    detectOperator();
  }, [formData.number]);

  // Recharge API POST call
  const handleRecharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:5000/api/recharge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
    username: "8517007867",  
    pwd: "0936Ec211013@",   
    ...formData             
  }),
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
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
          <h2>MOBILE RECHARGE (Prepaid)</h2>
        </div>

        <div className="recharge-content">
          <div className="recharge-form-section">
            <form onSubmit={handleRecharge}>
              <div className="form-group">
                <label>Mobile Number :</label>
                <input
                  type="text"
                  name="number"
                  placeholder="Please Enter Mobile Number*"
                  value={formData.number}
                  onChange={handleChange}
                  maxLength="10"
                  required
                />
                {detecting && (
                  <span className="detecting-text">Detecting operator...</span>
                )}
              </div>

              <div className="form-group">
                <label>Select Operator :</label>
                <select
                  name="operatorcode"
                  value={formData.operatorcode}
                  onChange={handleChange}
                  required
                >
                  <option value="">--Select Operator--</option>
                  {operators.map((op) => (
                    <option key={op.code} value={op.code}>
                      {op.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Circle Code :</label>
                <select
                  name="circlecode"
                  value={formData.circlecode}
                  onChange={handleChange}
                  required
                >
                  <option value="">--Select Circle--</option>
                  {circles.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
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
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
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
