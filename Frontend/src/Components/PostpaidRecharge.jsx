import React, { useState, useEffect } from "react";
import { Smartphone, Zap, Clock } from "lucide-react";
import styles from "../styles";
import Nav from "../../hero/nav";
import Hero from "../../hero/hero";
import Tab from "../../hero/Tab";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function PostpaidRecharge() {
  const [formData, setFormData] = useState({
    number: "",
    operatorcode: "",
    circlecode: "",
    amount: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("postpaid");
  const [balance, setBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [rechargeUser, setRechargeUser] = useState({});

  // Load user credentials from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setRechargeUser({ username: u.userId, pwd: u.apiPassword });
    }
  }, []);

  // Fetch user balance
  const fetchBalance = async () => {
    setBalanceLoading(true);
    try {
      const query = new URLSearchParams(rechargeUser).toString();
      const res = await fetch(`${API_URL}/api/balance?${query}`);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setBalance(data.balance || 0);
    } catch (error) {
      console.error("Balance fetch failed:", error);
      setBalance(0);
    } finally {
      setBalanceLoading(false);
    }
  };

  useEffect(() => {
    if (rechargeUser.username) fetchBalance();
  }, [rechargeUser]);

  // Operators & quick amounts
  const operators = [
  { code: "PAT", name: "Airtel Postpaid", type: "PostPaid" },
  { code: "IP", name: "Idea Postpaid", type: "PostPaid" },
  { code: "VP", name: "Vodafone Postpaid", type: "PostPaid" },
  { code: "DP", name: "Tata Docomo Postpaid", type: "PostPaid" },
  { code: "BP", name: "BSNL Postpaid", type: "PostPaid" },
  { code: "LBS", name: "Bsnl Landline", type: "PostPaid" },
  { code: "LMT", name: "MTNL Delhi Landline", type: "PostPaid" },
  { code: "LAT", name: "Airtel Landline", type: "PostPaid" },
  { code: "JPP", name: "JIO POSTPAID", type: "PostPaid" },
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
  { code: "9", name: "Karnataka" },
  { code: "14", name: "Kerala" },
  { code: "16", name: "Madhya Pradesh" },
  { code: "4", name: "Maharashtra" },
  { code: "10", name: "Uttar Pradesh East" },
  { code: "11", name: "Uttar Pradesh West" },
  { code: "1", name: "Punjab" },
  { code: "18", name: "Rajasthan" },
  { code: "26", name: "NORTH EAST" },
  { code: "3", name: "Mumbai" },
  { code: "5", name: "Delhi" },
  { code: "7", name: "CHENNAI" },
  { code: "6", name: "Kolkata" },
  { code: "23", name: "Orissa" },
];


  const quickAmounts = [199, 299, 399, 499, 599, 999];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle recharge submit
  const handleRecharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const { number, operatorcode, circlecode, amount } = formData;
      if (!number || !operatorcode || !circlecode || !amount)
        throw new Error("All fields are required");
console.log("Sending recharge request:", {
      username: rechargeUser.username.toString(),
      pwd: rechargeUser.pwd,
      number,
      operatorcode,
      circlecode,
      amount,
    });

      const res = await fetch(`${API_URL}/api/recharge`, {
        method: "POST",
        headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}` // ye zaruri hai
  },
        body: JSON.stringify({
          username: rechargeUser.username,
          pwd: rechargeUser.pwd,
          number,
          operatorcode,
          circlecode,
          amount,
        }),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      console.log("✅ Recharge API response:", data);

      if (data.status === "Success") {
        setResult({ type: "success", message: `Recharge Successful! TXID: ${data.txid}` });
        fetchBalance();
      } else {
        setResult({ type: "error", message: `Recharge Failed: ${data.opid || "Unknown"}` });
      }

      // Add transaction to history
      setTransactions([
        {
          txid: data.txid || Math.random(),
          operator: operatorcode,
          number,
          amount,
          status: data.status,
          date: new Date().toLocaleString(),
        },
        ...transactions,
      ]);

      // Reset form
      setFormData({ number: "", operatorcode: "", circlecode: "", amount: "" });
    } catch (error) {
      console.error("Recharge failed:", error);
      setResult({ type: "error", message: error.message || "API connection failed" });
    } finally {
      setLoading(false);
      setTimeout(() => setResult(null), 5000);
    }
  };

  return (
    <div style={styles.container}>
      <Nav />
      <Hero title="Instant Postpaid Recharge" subtitle="Fast, secure postpaid bill payment" />
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={styles.mainContent}>
        <div style={styles.contentGrid}>
          {/* Recharge Form */}
          <div style={styles.formSection}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <Smartphone size={24} />
                <div>
                  <h2 style={styles.cardTitle}>Postpaid Recharge</h2>
                  <p style={styles.cardSubtitle}>Pay your mobile/landline bill quickly</p>
                </div>
              </div>
              <div style={styles.cardBody}>
                <form onSubmit={handleRecharge}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Number</label>
                    <input
                      type="text"
                      name="number"
                      placeholder="Enter Mobile / Landline Number"
                      value={formData.number}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Operator</label>
                    <select name="operatorcode" value={formData.operatorcode} onChange={handleChange} style={styles.select}>
                      <option value="">Select Operator</option>
                      {operators.map((op) => (
                        <option key={op.code} value={op.code}>{op.name}</option>
                      ))}
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Circle</label>
                    <select name="circlecode" value={formData.circlecode} onChange={handleChange} style={styles.select}>
                      <option value="">Select Circle</option>
                      {circles.map((c) => (
                        <option key={c.code} value={c.code}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Amount</label>
                    <input type="text" name="amount" value={formData.amount} onChange={handleChange} placeholder="Enter Amount" style={styles.input} />
                    <div style={styles.quickAmounts}>
                      {quickAmounts.map((amt) => (
                        <button key={amt} type="button" onClick={() => setFormData({ ...formData, amount: amt.toString() })} style={styles.quickAmountBtn}>₹{amt}</button>
                      ))}
                    </div>
                  </div>
                  <button type="submit" disabled={loading} style={{ ...styles.rechargeBtn, ...(loading ? styles.btnDisabled : {}) }}>
                    {loading ? <div style={styles.loadingSpinner}></div> : <><Zap size={20} /> Pay Now</>}
                  </button>
                  {result && (
                    <div style={{ ...styles.resultBox, ...(result.type === "success" ? styles.successBox : styles.errorBox) }}>
                      {result.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div style={styles.transactionSection}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <Clock size={24} />
                <div>
                  <h2 style={styles.cardTitle}>Recent Transactions</h2>
                  <p style={styles.cardSubtitle}>Last 5 postpaid payments</p>
                </div>
              </div>
              <div style={styles.cardBody}>
                {transactions.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>📱</div>
                    <p style={styles.emptyText}>No transactions yet</p>
                  </div>
                ) : (
                  <div style={styles.transactionList}>
                    {transactions.slice(0, 5).map((t, i) => (
                      <div key={`${t.txid}-${i}`} style={styles.transactionItem}>
                        <div style={styles.transactionIcon}>{t.operator.charAt(0)}</div>
                        <div style={styles.transactionDetails}>
                          <div style={styles.transactionOperator}>{t.operator}</div>
                          <div style={styles.transactionNumber}>{t.number}</div>
                          <div style={styles.transactionDate}>{t.date}</div>
                        </div>
                        <div style={styles.transactionRight}>
                          <div style={styles.transactionAmount}>₹{t.amount}</div>
                          <div style={styles.transactionStatus}>{t.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
