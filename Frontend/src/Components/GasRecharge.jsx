import React, { useState, useEffect } from "react";
import { CreditCard, Clock, Zap } from "lucide-react";
import styles from "../styles";
import Nav from "../../hero/nav";
import Hero from "../../hero/hero";
import Tab from "../../hero/Tab";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function GasRecharge() {
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
  const [detecting, setDetecting] = useState(false);
  const [rechargeUser, setRechargeUser] = useState({ username: "", pwd: "" });

  const quickAmounts = [100, 200, 500, 1000, 2000];
  const operators = [
    { code: "MG", name: "Mahanagar Gas" },
    { code: "AG", name: "Adani Gas" },
    { code: "GG", name: "Gujarat Gas" },
    { code: "IG", name: "Indraprastha Gas" },
  ];

  // Load user credentials from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setRechargeUser({
        username: u.userId,
        pwd: u.apiPassword,
      });
      console.log("🔹 Recharge User:", u.userId);
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

  // Auto-detect operator (if you have API for it)
  useEffect(() => {
    const detectOperator = async () => {
      if (formData.consumerNumber.length === 10) {
        setDetecting(true);
        try {
          const res = await fetch(
            `${API_URL}/api/lookup?number=${formData.consumerNumber}`
          );
          if (!res.ok) throw new Error(`Server returned ${res.status}`);
          const data = await res.json();
          if (data.operatorcode)
            setFormData((prev) => ({ ...prev, operatorcode: data.operatorcode }));
        } catch (err) {
          console.warn("Operator auto-detect failed", err);
        } finally {
          setDetecting(false);
        }
      }
    };
    detectOperator();
  }, [formData.consumerNumber]);

  // Fetch transaction history
  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${API_URL}/api/transactions`);
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
      const token = localStorage.getItem("token");
      const { consumerNumber, operatorcode, amount } = formData;
      if (!consumerNumber || !operatorcode || !amount)
        throw new Error("All fields are required");

      const res = await fetch(`${API_URL}/api/gasrecharge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: rechargeUser.username,
          pwd: rechargeUser.pwd,
          number: consumerNumber,
          operatorcode,
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
    } catch (err) {
      console.error("Recharge failed:", err);
      setResult({ type: "error", message: err.message || "API connection failed" });
    } finally {
      setLoading(false);
      setTimeout(() => setResult(null), 5000);
    }
  };

  return (
    <div style={styles.container}>
      <Nav />
      <Hero title="Instant Gas Recharge" subtitle="Fast, secure, and reliable gas recharges" />
      <Tab />

      <div style={styles.mainContent}>
        <div style={styles.contentGrid}>
          {/* Recharge Form */}
          <div style={styles.formSection}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <CreditCard size={24} />
                <div>
                  <h2 style={styles.cardTitle}>Gas Bill Payment</h2>
                  <p style={styles.cardSubtitle}>All Gas Providers Supported</p>
                </div>
              </div>
              <div style={styles.cardBody}>
                <form onSubmit={handleRecharge}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Consumer Number</label>
                    <input
                      type="text"
                      placeholder="Enter Consumer Number"
                      value={formData.consumerNumber}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "" || /^\d+$/.test(val))
                          setFormData({ ...formData, consumerNumber: val });
                      }}
                      style={styles.input}
                    />
                    {detecting && <p>Detecting operator...</p>}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Select Gas Provider</label>
                    <select
                      value={formData.operatorcode}
                      onChange={(e) => setFormData({ ...formData, operatorcode: e.target.value })}
                      style={styles.select}
                    >
                      <option value="">Select Provider</option>
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
                      value={formData.amount}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "" || (/^\d+$/.test(val) && parseInt(val) > 0))
                          setFormData({ ...formData, amount: val });
                      }}
                      style={styles.input}
                    />
                    <div style={styles.quickAmounts}>
                      {quickAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setFormData({ ...formData, amount: amt.toString() })}
                          style={styles.quickAmountBtn}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" disabled={loading} style={styles.rechargeBtn}>
                    {loading ? "Processing..." : <><Zap size={20} /> Pay Bill</>}
                  </button>
                </form>

                {result && (
                  <div
                    style={{
                      ...styles.resultBox,
                      ...(result.type === "success" ? styles.successBox : styles.errorBox),
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
                  <p style={styles.cardSubtitle}>Your last 5 gas bill payments</p>
                </div>
              </div>
              <div style={styles.cardBody}>
                {transactions.length === 0 ? (
                  <p>No transactions yet</p>
                ) : (
                  transactions.slice(0, 5).map((t,i) => (
                    <div key={`${t.txid || 'tx'}-${t.number}-${i}`} style={styles.transactionItem}>
                      <div style={styles.transactionIcon}>{t.operator.charAt(0)}</div>
                      <div style={styles.transactionDetails}>
                        <div>{t.operator}</div>
                        <div>{t.number}</div>
                        <div>{t.date}</div>
                      </div>
                      <div style={styles.transactionRight}>
                        <div>₹{t.amount}</div>
                        <div>{t.status}</div>
                      </div>
                    </div>
                  ))
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
