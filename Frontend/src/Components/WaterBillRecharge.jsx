import React, { useState, useEffect } from "react";
import { Smartphone, Zap, Clock, TrendingUp } from "lucide-react";
import styles from "../styles";
import Nav from "../../hero/nav";
import Hero from "../../hero/hero";
import Tab from "../../hero/Tab";
import DTHRecharge from "./DTHRecharge"; // adjust the path correctly
import PostpaidRecharge from "./PostpaidRecharge"; // etc
import ElectricityRecharge from "./ElectricityRecharge";
import GasRecharge from "./GasRecharge";
import FASTagRecharge from "./FASTagRecharge";
import DataCardRecharge from "./DataCardRecharge";
import InsuranceRecharge from "./InsuranceRecharge";
import GooglePlayRecharge from "./GooglePlayRecharge";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function WaterBillRecharge() {
  const [formData, setFormData] = useState({
    consumerNumber: "",
    operatorcode: "",
    amount: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [balance, setBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(false);
const [activeTab, setActiveTab] = useState("waterbill");
  const rechargeUser = {
    username: "500032",
    pwd: "k0ly9gts",
  };

  // === FETCH BALANCE ===
useEffect(() => {
    fetchBalance();
  }, []);

    const fetchBalance = async () => {
  try {
    const username = localStorage.getItem("username");
    const pwd = localStorage.getItem("apiPassword");

    if (!username || !pwd) {
      console.warn("Missing username or password for balance fetch");
      return;
    }

    const response = await fetch(
      `/api/balance?username=${username}&pwd=${pwd}`
    );
    const data = await response.json();

    if (data.success) {
      setBalance(data.balance); // Balance state update
    } else {
      console.error("Balance fetch failed:", data.error);
    }
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
};
  // === WATER BOARDS / OPERATORS ===
  const operators = [
    { code: "MWB", name: "Mumbai Water Board" },
    { code: "DWB", name: "Delhi Water Board" },
    { code: "KWB", name: "Kolkata Water Board" },
    { code: "CWB", name: "Chennai Water Board" },
  ];

  const quickAmounts = [100, 200, 500, 1000];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const { consumerNumber, operatorcode, amount } = formData;
      if (!consumerNumber || !operatorcode || !amount)
        throw new Error("All fields are required");

      const res = await fetch(`${API_URL}/api/waterbill`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...rechargeUser,
          consumerNumber,
          operatorcode,
          amount,
        }),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();

      if (data.status === "Success") {
        setResult({
          type: "success",
          message: `Water Bill Payment Successful! TXID: ${data.txid}`,
        });
        fetchBalance();
      } else {
        setResult({
          type: "error",
          message: `Payment Failed: ${data.opid || "Unknown"}`,
        });
      }

      setTransactions([
        {
          txid: data.txid || Math.random(),
          operator: operatorcode,
          number: consumerNumber,
          amount,
          status: data.status,
          date: new Date().toLocaleString(),
        },
        ...transactions,
      ]);

      setFormData({ consumerNumber: "", operatorcode: "", amount: "" });
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
      <Nav 
      />

      {/* Hero */}
   <Hero />

      {/* Tabs */}
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />


      {/* Form Section */}
      <div style={styles.mainContent}>
        {activeTab === "dth" && <DTHRecharge />}
          {activeTab === "datacard" && <DataCardRecharge />}
          {activeTab === "postpaid" && <PostpaidRecharge />}
          {activeTab === "electricity" && <ElectricityRecharge />}
          {activeTab === "gas" && <GasRecharge />}
          {activeTab === "insurance" && <Insurance />}
          {activeTab === "fastag" && <FASTagRecharge />}
          {activeTab === "google play" && <GooglePlayRecharge />}
          {activeTab === "landline" && <Landline />}
  {activeTab === "more" && <MoreServices />}
        <div style={styles.contentGrid}>
          {/* Form */}
          <div style={styles.formSection}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <Smartphone size={24} />
                <div>
                  <h2 style={styles.cardTitle}>Water Bill Payment</h2>
                  <p style={styles.cardSubtitle}>
                    Pay your water bill in seconds
                  </p>
                </div>
              </div>
              <div style={styles.cardBody}>
                <form onSubmit={handleRecharge}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Consumer Number</label>
                    <input
                      type="text"
                      name="consumerNumber"
                      placeholder="Enter your consumer number"
                      value={formData.consumerNumber}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Select Water Board</label>
                    <select
                      name="operatorcode"
                      value={formData.operatorcode}
                      onChange={handleChange}
                      style={styles.select}
                    >
                      <option value="">Choose your operator</option>
                      {operators.map((op) => (
                        <option key={op.code} value={op.code}>
                          {op.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Bill Amount</label>
                    <input
                      type="text"
                      name="amount"
                      placeholder="Enter bill amount"
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
                        Pay Bill Now
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

          {/* Transactions */}
          <div style={styles.transactionSection}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <Clock size={24} />
                <div>
                  <h2 style={styles.cardTitle}>Recent Transactions</h2>
                  <p style={styles.cardSubtitle}>Last 5 water bills</p>
                </div>
              </div>
              <div style={styles.cardBody}>
                {transactions.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>💧</div>
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
