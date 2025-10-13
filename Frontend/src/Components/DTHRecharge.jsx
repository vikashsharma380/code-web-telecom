import React, { useState, useEffect } from "react";
import { Smartphone, Zap, Clock, TrendingUp } from "lucide-react";
import styles from "../styles";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export default function DTHRecharge() {
  const [formData, setFormData] = useState({
    dthNumber: "",
    operatorcode: "",
    amount: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [detecting, setDetecting] = useState(false);
  const [balance, setBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("recharge");
  const rechargeUser = {
    username: "500032",
    pwd: "k0ly9gts",
  };
  const payload = {
    number: formData.number,
    operatorcode: formData.operator,
    amount: formData.amount,
  };
  // === FETCH BALANCE ===
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
    fetchBalance();
  }, []);
  // === OPERATOR AUTO-DETECT ===
  useEffect(() => {
    const detectOperator = async () => {
      if (formData.dthNumber.length === 10) {
        setDetecting(true);
        try {
          const res = await fetch(
            `${API_URL}/api/lookup?number=${formData.dthNumber}`
          );
          if (!res.ok) throw new Error(`Server returned ${res.status}`);
          const data = await res.json();
          if (data.operatorcode)
            setFormData((prev) => ({
              ...prev,
              operatorcode: data.operatorcode,
            }));
          if (data.circlecode)
            setFormData((prev) => ({ ...prev, circlecode: data.circlecode }));
        } catch (error) {
          console.warn("Auto-detect failed, use dropdown manually", error);
        } finally {
          setDetecting(false);
        }
      }
    };
    detectOperator();
  }, [formData.dthNumber]);
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

  // === RECHARGE ===
  const handleRecharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const { dthNumber, operatorcode: operator, amount } = formData;
      if (!dthNumber || !operator || !amount) {
        throw new Error("All fields are required");
      }
      const payload = {
        ...rechargeUser, // includes username & pwd
        number: dthNumber,
        operatorcode: operator,
        circlecode: "1", // circlecode is not used for DTH
        amount,
        // circlecode is intentionally omitted
      };
      console.log("🚀 Sending Payload:", payload);
      const res = await fetch(`${API_URL}/api/dthrecharge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      console.log("✅ Recharge API response:", data);
      if (data.status === "Success") {
        setResult({
          type: "success",
          message: `Recharge Successful! TXID: ${data.txid}`,
        });
        fetchBalance();
      } else {
        setResult({
          type: "error",
          message: `Recharge Failed: ${data.opid || "Unknown"}`,
        });
      }
      // Add to transaction history
      setTransactions([
        {
          txid: data.txid || Math.random(),
          operator,
          number: dthNumber,
          amount,
          status: data.status,
          date: new Date().toLocaleString(),
        },
        ...transactions,
      ]);
      // Reset form
      setFormData({ dthNumber: "", operatorcode: "", amount: "" });
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

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.bgPattern}></div>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.logoSection}>
            <div style={styles.logoIcon}>
              <Smartphone size={24} />
            </div>
            <div>
              <div style={styles.logoText}>CodeWeb Telecom</div>
              <div style={styles.logoSubtext}>Digital Recharge Partner</div>
            </div>
          </div>
          <div style={styles.navLinks}>
            <a href="#" style={styles.navLink}>
              Dashboard
            </a>
            <a href="#" style={styles.navLink}>
              Reports
            </a>
            <a href="#" style={styles.navLink}>
              Account
            </a>
            <a href="#" style={styles.navLink}>
              Support
            </a>
          </div>
          <div style={styles.userSection}>
            <div style={styles.balanceBadge}>
              <span style={styles.balanceLabel}>Balance</span>
              <span style={styles.balanceAmount}>
                {balanceLoading ? "..." : `₹${balance.toFixed(2)}`}
              </span>
            </div>
            <div style={styles.avatar}>V</div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroLeft}>
            <div style={styles.welcomeBadge}>
              <Zap size={16} />
              <span>Welcome back, Vikash!</span>
            </div>
            <h1 style={styles.heroTitle}>Instant Recharge</h1>
            <p style={styles.heroSubtitle}>
              Fast, secure, and reliable DTH recharge for all operators
            </p>
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <TrendingUp size={20} />
                <div>
                  <div style={styles.statValue}>50,000+</div>
                  <div style={styles.statLabel}>Users Trust Us</div>
                </div>
              </div>
              <div style={styles.statCard}>
                <Clock size={20} />
                <div>
                  <div style={styles.statValue}>2 Sec</div>
                  <div style={styles.statLabel}>Avg. Processing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tab Section */}
      <div style={styles.tabSection}>
        <div style={styles.tabsContainer}>
          {[
            "Mobile",
            "DTH",
            "Data Card",
            "Postpaid",
            "Electricity",
            "Gas",
            "Insurance",
            "Transfer",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              style={{
                ...styles.tabBtn,
                ...(activeTab === tab.toLowerCase() ? styles.tabBtnActive : {}),
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.contentGrid}>
          {/* Recharge Form */}
          <div style={styles.formSection}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <Smartphone size={24} />
                <div>
                  <h2 style={styles.cardTitle}>DTH Recharge</h2>
                  <p style={styles.cardSubtitle}>
                    Recharge for all DTH providers
                  </p>
                </div>
              </div>
              <div style={styles.cardBody}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>DTH Number</label>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit DTH number"
                    name="dthNumber"
                    value={formData.dthNumber || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        dthNumber: e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10),
                      }))
                    }
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Select Operator</label>
                  <select
                    name="operatorcode"
                    value={formData.operatorcode}
                    onChange={handleChange}
                    className="selectBox"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      fontSize: "15px",
                      color: "white",
                      boxSizing: "border-box",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <option value="">Select Operator</option>
                    {operators.map((operator) => (
                      <option key={operator.code} value={operator.code}>
                        {operator.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Recharge Amount</label>
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    value={formData.amount}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setFormData((prev) => ({ ...prev, amount: val }));
                    }}
                    style={styles.input}
                  />
                  <div style={styles.quickAmounts}>
                    {quickAmounts.map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setAmount(amt.toString())}
                        style={styles.quickBtn}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleRecharge}
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
                    <div style={styles.emptyIcon}>📺</div>
                    <p style={styles.emptyText}>No transactions yet</p>
                    <p style={styles.emptySubtext}>
                      Your DTH recharge history will appear here
                    </p>
                  </div>
                ) : (
                  <div style={styles.transactionList}>
                    {transactions.slice(0, 5).map((t) => (
                      <div key={t.txid} style={styles.transactionItem}>
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
