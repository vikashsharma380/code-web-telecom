import React, { useState, useEffect } from "react";
import { CreditCard, Clock, Zap, Smartphone } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

import { Link } from "react-router-dom";
import Nav from "../../hero/nav";
import Hero from "../../hero/hero";
import Tab from "../../hero/Tab";
import styles from "../styles";
import DTHRecharge from "./DTHRecharge"; // adjust the path correctly
import PostpaidRecharge from "./PostpaidRecharge"; // etc
import ElectricityRecharge from "./ElectricityRecharge";
import GasRecharge from "./GasRecharge";
import FASTagRecharge from "./FASTagRecharge";
import DataCardRecharge from "./DataCardRecharge";
import InsuranceRecharge from "./InsuranceRecharge";

import WaterBillRecharge from "./WaterBillRecharge";

export default function GooglePlayRecharge() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [provider, setProvider] = useState("GooglePlay");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("googleplay");

  const quickAmounts = [100, 200, 500, 1000, 2000];

  const [formData, setFormData] = useState({
    email: "",
    operatorcode: "GPLAY",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      if (value === "" || (/^\d+$/.test(value) && parseInt(value) > 0)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const [balance, setBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(false);

  const rechargeUser = {
    username: "500032",
    pwd: "k0ly9gts",
  };

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

const handleRecharge = async (e) => {
  e.preventDefault();
  setLoading(true);
  setResult(null);

  try {
    const { email, operatorcode: operator, amount } = formData;
    if (!email || !operator || !amount) {
      throw new Error("All fields are required");
    }

    const payload = {
      ...rechargeUser,
      number: email,
      operatorcode: operator,
      amount,
    };

    const res = await fetch(`${API_URL}/api/recharge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.status === "Success" || data.success) {
      setResult({
        type: "success",
        message: `Purchase Successful! TXID: ${data.txid}`,
      });
      fetchBalance();
    } else {
      setResult({
        type: "error",
        message: `Purchase Failed: ${data.opid || "Unknown"}`,
      });
    }

    // Save transaction
    setTransactions((prev) => [
      {
        txid: data.txid || Math.random(),
        operator,
        number: email,
        amount,
        status: data.status,
        date: new Date().toLocaleString(),
      },
      ...(Array.isArray(prev) ? prev : []),
    ]);

    // --- UPDATE LEADERBOARD ---
    try {
      await fetch(`${API_URL}/api/update-leaderboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: rechargeUser.username,
          amount: amount,
          commission: data.profit || data.commissionAmount || 0,
          operator: operator,
          number: email,
          service: "GOOGLE_PLAY",
        }),
      });
    } catch (err) {
      console.error("Leaderboard update failed:", err);
    }

    setFormData({ email: "", operatorcode: "GPLAY", amount: "" });

  } catch (error) {
    setResult({
      type: "error",
      message: error.message || "API error",
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
      <Hero
        title="Instant Google Play Recharge"
        subtitle="Fast, secure, and reliable Google Play recharges for all accounts"
      />
      {/* Tabs */}
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div style={styles.mainContent}>
        {activeTab === "mobile" && <MobileRecharge />}
        {activeTab === "dth" && <DTHRecharge />}
        {activeTab === "datacard" && <DataCardRecharge />}
        {activeTab === "postpaid" && <PostpaidRecharge />}
        {activeTab === "electricity" && <ElectricityRecharge />}
        {activeTab === "gas" && <GasRecharge />}
        {activeTab === "insurance" && <Insurance />}
        {activeTab === "fastag" && <FASTagRecharge />}

        {activeTab === "water bill" && <WaterBill />}
        {activeTab === "landline" && <Landline />}
        {activeTab === "more" && <MoreServices />}
        <div style={styles.contentGrid}>
          {/* Google Play Recharge Form */}
          <div style={styles.formSection}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <CreditCard size={24} />
                <div>
                  <h2 style={styles.cardTitle}>Google Play Gift Card</h2>
                  <p style={styles.cardSubtitle}>Instant Google Play Top-Up</p>
                </div>
              </div>

              <div style={styles.cardBody}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Google Account Email</label>
                  <input
                    type="email"
                    placeholder="Enter Google Account Email"
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Select Amount</label>
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  <div style={styles.quickAmounts}>
                    {quickAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() =>
                          setFormData({ ...formData, amount: amt.toString() })
                        }
                        style={styles.quickAmountBtn}
                        type="button"
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
                    <>Buy Gift Card</>
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
                    Last 5 Google Play Purchases
                  </p>
                </div>
              </div>

              <div style={styles.cardBody}>
                {transactions.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>🎮</div>
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
          © 2025 <span style={styles.footerBrand}>Code Web Telecom</span> - All
          Rights Reserved
        </p>
      </footer>
    </div>
  );
}
