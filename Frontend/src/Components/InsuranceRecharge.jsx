import React, { useState } from "react";
import { ShieldCheck, Clock, TrendingUp } from "lucide-react";
import styles from "../styles";

export default function InsuranceRecharge() {
  const [formData, setFormData] = useState({
    number: "",
    amount: "",
    operatorcode: "",
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
      console.error("Payment failed:", error);
      setResult({ error: "Failed to connect to API" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <ShieldCheck size={36} color="#4f46e5" />
          <h2 style={styles.title}>INSURANCE PREMIUM PAYMENT</h2>
        </div>

        <form onSubmit={handleRecharge} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Policy Number</label>
            <input
              type="text"
              name="number"
              placeholder="Enter Policy Number*"
              value={formData.number}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Select Insurance Provider</label>
            <select
              name="operatorcode"
              value={formData.operatorcode}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">Select Insurance Provider*</option>
              <option value="INS01">LIC of India</option>
              <option value="INS02">HDFC Life Insurance</option>
              <option value="INS03">ICICI Prudential Life</option>
              <option value="INS04">SBI Life Insurance</option>
              <option value="INS05">Max Life Insurance</option>
              <option value="INS06">Bajaj Allianz Life</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Amount</label>
            <input
              type="text"
              name="amount"
              placeholder="Enter Amount"
              value={formData.amount}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Processing..." : "Pay Premium"}
          </button>
        </form>

        {result && (
          <div style={styles.resultContainer}>
            {result.error ? (
              <p style={styles.errorText}>Error: {result.error}</p>
            ) : (
              <p style={styles.successText}>Payment processed successfully!</p>
            )}
            <pre style={styles.resultBox}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div style={styles.transactions}>
          <div style={styles.transHeader}>
            <Clock size={20} color="#4f46e5" />
            <h3 style={styles.subTitle}>Last 5 Transactions</h3>
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>TXID</th>
                <th style={styles.th}>Operator</th>
                <th style={styles.th}>Number</th>
                <th style={styles.th}>Operator ID</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" style={styles.noData}>
                  No transactions yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={styles.footerNote}>
          <TrendingUp size={18} color="#22c55e" />
          <span>Secure & Fast Insurance Premium Payments</span>
        </div>
      </div>
    </div>
  );
}
