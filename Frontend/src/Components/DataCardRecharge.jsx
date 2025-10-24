import React, { useState, useEffect } from "react";
import { Smartphone, Zap, Clock } from "lucide-react";
import Nav from "../../hero/nav";
import Hero from "../../hero/hero";
import Tab from "../../hero/Tab";
import styles from "../styles";
import DTHRecharge from "./DTHRecharge"; // adjust the path correctly
import PostpaidRecharge from "./PostpaidRecharge"; // etc
import ElectricityRecharge from "./ElectricityRecharge";
import GasRecharge from "./GasRecharge";
import FASTagRecharge from "./FASTagRecharge";

import InsuranceRecharge from "./InsuranceRecharge";
import GooglePlayRecharge from "./GooglePlayRecharge";
import WaterBillRecharge from "./WaterBillRecharge";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function DataCardRecharge() {
  const [formData, setFormData] = useState({
    consumerNumber: "",
    operatorcode: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [rechargeUser, setRechargeUser] = useState({});
  const [activeTab, setActiveTab] = useState("Data Card");

  const quickAmounts = [100, 200, 500, 1000, 2000];

  const operators = [
    { code: "RNET", name: "Reliance NetConnect 1X" },
    { code: "RNET3", name: "Reliance NetConnect 3G" },
    { code: "RNETP", name: "Reliance NetConnect+" },
    { code: "TPW", name: "Tata Photon Whiz" },
    { code: "TPP", name: "Tata Photon+" },
    { code: "MTM", name: "MTS Mblaze" },
    { code: "MTBR", name: "MTS Mbrowse" },
  ];

  // Get user credentials from localStorage
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

  // Fetch balance
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

  // Fetch transaction history
  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Handle recharge
  const handleRecharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const { consumerNumber, operatorcode, amount } = formData;
      if (!consumerNumber || !operatorcode || !amount)
        throw new Error("All fields are required");

      const token = localStorage.getItem("token");
      const payload = {
        username: rechargeUser.username,
        pwd: rechargeUser.pwd,
        number: consumerNumber,
        operatorcode,
        circlecode: "1", // optional for DataCard
        amount,
      };

      const res = await fetch(`${API_URL}/api/recharge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      console.log("Recharge API response:", data);

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

      setTransactions((prev) => [
        {
          txid: data.txid || Math.random(),
          operator: operatorcode,
          number: consumerNumber,
          amount,
          status: data.status || "Failed",
          date: new Date().toLocaleString(),
        },
      ...(Array.isArray(prev) ? prev : []),
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
      <Nav />
      <Hero title="Instant Data Card Recharge" subtitle="Fast, secure, and reliable data card recharges for all operators" />
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={styles.mainContent}>
          {activeTab === "mobile" && <MobileRecharge />}
  {activeTab === "dth" && <DTHRecharge />}
  
  {activeTab === "postpaid" && <PostpaidRecharge />}
  {activeTab === "electricity" && <ElectricityRecharge />}
  {activeTab === "gas" && <GasRecharge />}
  {activeTab === "insurance" && <Insurance />}
  {activeTab === "fastag" && <FASTagRecharge />}
  {activeTab === "google play" && <GooglePlayRecharge />}
  {activeTab === "water bill" && <WaterBill />}
  {activeTab === "landline" && <Landline />}
  {activeTab === "more" && <MoreServices />}
        <div style={styles.contentGrid}>
          {/* Recharge Form */}
          <div style={styles.formSection}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <Smartphone size={24} />
                <div>
                  <h2 style={styles.cardTitle}>Data Card Recharge</h2>
                  <p style={styles.cardSubtitle}>Recharge your Data Card easily</p>
                </div>
              </div>
              <div style={styles.cardBody}>
                <form onSubmit={handleRecharge}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Data Card Number</label>
                    <input
                      type="text"
                      placeholder="Enter Consumer Number"
                      value={formData.consumerNumber}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "" || /^\d+$/.test(val))
                          setFormData((prev) => ({ ...prev, consumerNumber: val.slice(0, 11) }));
                      }}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Operator</label>
                    <select
                      name="operatorcode"
                      value={formData.operatorcode}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, operatorcode: e.target.value }))
                      }
                      style={styles.selectBox}
                    >
                      <option value="">Select Operator</option>
                      {operators.map((op) => (
                        <option key={op.code} value={op.code}>
                          {op.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Amount</label>
                    <input
                      type="text"
                      placeholder="Enter Amount"
                      value={formData.amount}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "" || (/^\d+$/.test(val) && parseInt(val) > 0))
                          setFormData((prev) => ({ ...prev, amount: val }));
                      }}
                      style={styles.input}
                    />
                    <div style={styles.quickAmounts}>
                      {quickAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, amount: amt.toString() }))}
                          style={styles.quickAmountBtn}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" disabled={loading} style={{ ...styles.rechargeBtn, ...(loading ? styles.btnDisabled : {}) }}>
                    {loading ? <div style={styles.loadingSpinner}></div> : <><Zap size={20} /> Recharge Now</>}
                  </button>

                  {result && <div style={{ ...styles.resultBox, ...(result.type === "success" ? styles.successBox : styles.errorBox) }}>{result.message}</div>}
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
                  <p style={styles.cardSubtitle}>Your last 5 recharges</p>
                </div>
              </div>
              <div style={styles.cardBody}>
                {transactions.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>💳</div>
                    <p style={styles.emptyText}>No transactions yet</p>
                  </div>
                ) : (
                  <div style={styles.transactionList}>
                    {Array.isArray(transactions) &&transactions.slice(0, 5).map((t, i) => (
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

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © 2025 <span style={styles.footerBrand}>CodeWeb Telecom</span> - All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
