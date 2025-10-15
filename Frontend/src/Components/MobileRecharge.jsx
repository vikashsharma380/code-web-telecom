import React, { useState, useEffect } from "react";
import { Smartphone, Zap, Clock, TrendingUp } from "lucide-react";
import styles from "../styles";
import Nav from "../../hero/nav";
import Hero from "../../hero/hero";
import Tab from "../../hero/Tab";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export default function MobileRecharge() {
  const [formData, setFormData] = useState({
    number: "",
    operatorcode: "",
    circlecode: "",
    amount: "",
  });
 const MP_API_KEY = "6fda75354f70927c5d45a3a4dca7f6ce";
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [detecting, setDetecting] = useState(false);
  const [activeTab, setActiveTab] = useState("recharge");
  const [rechargeUser, setRechargeUser] = useState({});
   useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const u = JSON.parse(storedUser);
    setRechargeUser({
      username: u.userId, 
      pwd: u.apiPassword, 
    });
  }
}, []);
 

  // === OPERATORS & CIRCLES ===
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
    { code: "9", name: "Karnataka" },
    { code: "14", name: "Kerala" },
    { code: "16", name: "Madhya Pradesh" },
    { code: "4", name: "Maharashtra" },
    { code: "2", name: "West Bengal" },
    { code: "10", name: "Uttar Pradesh East" },
    { code: "11", name: "Uttar Pradesh West" },
    { code: "3", name: "Mumbai" },
    { code: "5", name: "Delhi" },
    { code: "7", name: "CHENNAI" },
    { code: "6", name: "Kolkata" },
    { code: "8", name: "Tamil Nadu" },
    { code: "1", name: "Punjab" },
    { code: "18", name: "Rajasthan" },
    { code: "26", name: "NORTH EAST" },
  ];
  const quickAmounts = [49, 99, 199, 299, 499, 999];
  // === FORM HANDLERS ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setFormData({ ...formData, amount: value });
    }
  };
  const handleQuickAmount = (amt) => {
    setFormData({ ...formData, amount: amt.toString() });
  };

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${API_URL}/api/transactions`);
      const data = await res.json();
      setTransactions(data); // load from backend
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleRecharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const { number, operatorcode, circlecode, amount } = formData;
      if (!number || !operatorcode || !circlecode || !amount)
        throw new Error("All fields are required");
      const res = await fetch(`${API_URL}/api/recharge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...rechargeUser,
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
        setResult({
          type: "success",
          message: `Recharge Successful! TXID: ${data.txid}`,
        });
        fetchBalance(); // refresh balance
      } else {
        setResult({
          type: "error",
          message: `Recharge Failed: ${data.opid || "Unknown"}`,
        });
      }
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
      setFormData({ number: "", operatorcode: "", circlecode: "", amount: "" });
    } catch (error) {
      console.error("Recharge failed:", error);
      setResult({
        type: "error",
        message: error.message || "API connection failed",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setResult(null), 5000);
    }
  };
  // === RETURN JSX ===
  return (
    <div style={styles.container}>
      {/* NAVBAR & BALANCE */}
      <Nav />
      {/* Hero Section */}
      <Hero
        title="Instant Mobile Recharge"
        subtitle="Fast, secure, and reliable mobile recharges for all operators"
      />
      {/* Tab Section */}
      <Tab />
      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.contentGrid}>
          {/* Recharge Form */}
          <div style={styles.formSection}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <Smartphone size={24} />
                <div>
                  <h2 style={styles.cardTitle}>Mobile Recharge</h2>
                  <p style={styles.cardSubtitle}>
                    Recharge for all mobile operators
                  </p>
                </div>
              </div>
              <div style={styles.cardBody}>
                <form onSubmit={handleRecharge}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Mobile Number</label>
                    <input
                      type="tel"
                      name="number"
                      placeholder="Enter 10-digit mobile number"
                      value={formData.number}
                      onChange={handleChange}
                      maxLength="10"
                      style={styles.input}
                    />
                    {detecting && (
                      <div style={styles.detectingText}>
                        Detecting operator...
                      </div>
                    )}
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Select Operator</label>
                    <select
                      name="operatorcode"
                      value={formData.operatorcode}
                      onChange={handleChange}
                      style={styles.select}
                    >
                      <option value="">Choose your mobile operator</option>
                      {operators.map((op) => (
                        <option key={op.code} value={op.code}>
                          {op.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Circle Code</label>
                    <select
                      name="circlecode"
                      value={formData.circlecode}
                      onChange={handleChange}
                      style={styles.select}
                    >
                      <option value="">Choose your circle</option>
                      {circles.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Recharge Amount</label>
                    <input
                      type="text"
                      name="amount"
                      placeholder="Enter amount"
                      value={formData.amount}
                      onChange={handleChange}
                      style={styles.input}
                    />
                    <div style={styles.quickAmounts}>
                      {quickAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, amount: amt.toString() })
                          }
                          style={styles.quickAmountBtn}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      ...styles.rechargeBtn,
                      ...(loading ? styles.btnDisabled : {}),
                    }}
                  >
                    {loading ? (
                      <div style={styles.loadingSpinner}></div>
                    ) : (
                      <>
                        <Zap size={20} />
                        Recharge Now
                      </>
                    )}
                  </button>
                  {result && (
                    <div
                      style={{
                        ...styles.resultBox,
                        ...(result.type === "success"
                          ? styles.successBox
                          : styles.errorBox),
                      }}
                    >
                      {result.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
          {/* Transaction History */}
          <div style={styles.transactionSection}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <Clock size={24} />
                <div>
                  <h2 style={styles.cardTitle}>Recent Transactions</h2>
                  <p style={styles.cardSubtitle}>Your last 5 recharges</p>
                </div>
              </div>
              <div style={styles.cardBody}>
                {transactions.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>📱</div>
                    <p style={styles.emptyText}>No transactions yet</p>
                    <p style={styles.emptySubtext}>
                      Your mobile recharge history will appear here
                    </p>
                  </div>
                ) : (
                  <div style={styles.transactionList}>
                    {transactions.slice(0, 5).map((t, i) => (
  <div key={`${t.txid}-${t.number}-${i}`} style={styles.transactionItem}>
                        <div style={styles.transactionIcon}>
                          {t.operator.charAt(0)}
                        </div>
                        <div style={styles.transactionDetails}>
                          <div style={styles.transactionOperator}>
                            {t.operator}
                          </div>
                          <div style={styles.transactionNumber}>{t.number}</div>
                          <div style={styles.transactionDate}>{t.date}</div>
                        </div>
                        <div style={styles.transactionRight}>
                          <div style={styles.transactionAmount}>
                            ₹{t.amount}
                          </div>
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
      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © 2025 <span style={styles.footerBrand}>CodeWeb Telecom</span> - All
          Rights Reserved
        </p>
      </footer>
    </div>
  );
}
