import React, { useState, useEffect } from "react";
import { CreditCard, Clock, Zap, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
import styles from "../styles";
import Tab from "../../hero/Tab";
import Hero from "../../hero/hero";
import Nav from "../../hero/nav";

export default function FASTagRecharge() {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    operatorcode: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("fastag");
  const [balance, setBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);

  const quickAmounts = [100, 200, 500, 1000, 2000];

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
      if (formData.vehicleNumber.length === 10) {
        setDetecting(true);
        try {
          const res = await fetch(
            `${API_URL}/api/lookup?number=${formData.vehicleNumber}`
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
  }, [formData.vehicleNumber]);
  // === OPERATORS & CIRCLES ===

  const handleRecharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const { vehicleNumber, operatorcode: operator, amount } = formData;
      console.log("🚀 Form Data:", { vehicleNumber, operator, amount });
      if (!vehicleNumber || !operator || !amount) {
        throw new Error("All fields are required");
      }
      const payload = {
        ...rechargeUser, // includes username & pwd
        number: vehicleNumber,
        operatorcode: operator,
        circlecode: "1", // circlecode is not used for DTH
        amount,
        // circlecode is intentionally omitted
      };
      console.log("🚀 Sending Payload:", payload);
      const res = await fetch(`${API_URL}/api/fastagrecharge`, {
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
        fetchBalance(); // refresh balance
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
          number: vehicleNumber,
          amount,
          status: data.status,
          date: new Date().toLocaleString(),
        },
        ...transactions,
      ]);
      // Reset form
      setFormData({ vehicleNumber: "", operatorcode: "", amount: "" });
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
      {/* Navbar */}
      <Nav />

      {/* Hero */}
      <Hero />

      {/* Tabs */}
      <Tab />

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.contentGrid}>
          {/* Recharge Form */}
          <div style={styles.formSection}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <CreditCard size={24} />
                <div>
                  <h2 style={styles.cardTitle}>FASTag Recharge</h2>
                  <p style={styles.cardSubtitle}>Recharge for all banks</p>
                </div>
              </div>

              <div style={styles.cardBody}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Vehicle Number</label>
                  <input
                    type="text"
                     name="vehicleNumber"
                    
                    placeholder="Enter Vehicle Number"
                    value={formData.vehicleNumber}
                     onChange={handleChange}
                    style={styles.input}
                  />
                </div>

               
                <div style={styles.formGroup}>
                  <label style={styles.label}>Select Operators</label>
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
  <label style={styles.label}>Amount</label>
  <input
    type="text"
    name="amount" // important for handleChange
    placeholder="Enter Amount"
    value={formData.amount} // use formData.amount
    onChange={handleChange} // updates formData.amount
    style={styles.input}
  />

  <div style={styles.quickAmounts}>
    {quickAmounts.map((amt) => (
      <button
        key={amt}
        type="button"
        onClick={() =>
          setFormData((prev) => ({
            ...prev,
            amount: amt.toString(),
          }))
        }
        style={styles.quickAmountBtn}
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
                    <>Recharge</>
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

          {/* Transactions */}
          <div style={styles.transactionSection}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <Clock size={24} />
                <div>
                  <h2 style={styles.cardTitle}>Recent Transactions</h2>
                  <p style={styles.cardSubtitle}>
                    Your last 5 FASTag recharges
                  </p>
                </div>
              </div>

              <div style={styles.cardBody}>
                {transactions.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>⚡</div>
                    <p style={styles.emptyText}>No transactions yet</p>
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
