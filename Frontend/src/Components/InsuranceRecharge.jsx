import React, { useState, useEffect } from "react";
import { ShieldCheck, Clock, TrendingUp, Zap } from "lucide-react";
import styles from "../styles";
import Nav from "../../hero/nav";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function InsuranceRecharge() {
  const [formData, setFormData] = useState({
    policyNumber: "",
    operatorcode: "",
    amount: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("insurance");
  const [balance, setBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(false);

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

  // === INSURANCE PROVIDERS ===
  const insuranceProviders = [
    { code: "INS01", name: "LIC of India" },
    { code: "INS02", name: "HDFC Life Insurance" },
    { code: "INS03", name: "ICICI Prudential Life" },
    { code: "INS04", name: "SBI Life Insurance" },
    { code: "INS05", name: "Max Life Insurance" },
    { code: "INS06", name: "Bajaj Allianz Life" },
  ];

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  // === FORM HANDLERS ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuickAmount = (amt) => {
    setFormData({ ...formData, amount: amt.toString() });
  };

  const handleRecharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const { policyNumber, operatorcode, amount } = formData;
      if (!policyNumber || !operatorcode || !amount)
        throw new Error("All fields are required");

      const res = await fetch(`${API_URL}/api/recharge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...rechargeUser,
          number: policyNumber, // Using 'number' param for API
          operatorcode,
          amount,
        }),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();

      if (data.status === "Success") {
        setResult({
          type: "success",
          message: `Payment Successful! TXID: ${data.txid}`,
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
          number: policyNumber,
          amount,
          status: data.status,
          date: new Date().toLocaleString(),
        },
        ...transactions,
      ]);

      setFormData({ policyNumber: "", operatorcode: "", amount: "" });
    } catch (error) {
      console.error("Payment failed:", error);
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
     <Nav/> 

      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroLeft}>
            <div style={styles.welcomeBadge}>
              <Zap size={16} />
              <span>Welcome back, Vikash!</span>
            </div>
            <h1 style={styles.heroTitle}>Insurance Premium Payment</h1>
            <p style={styles.heroSubtitle}>
              Pay your insurance premiums securely and instantly for all
              providers.
            </p>
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <TrendingUp size={20} />
                <div>
                  <div style={styles.statValue}>10,000+</div>
                  <div style={styles.statLabel}>Policies Paid</div>
                </div>
              </div>
              <div style={styles.statCard}>
                <Clock size={20} />
                <div>
                  <div style={styles.statValue}>3 Sec</div>
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
          {/* Insurance Payment Form */}
          <div style={styles.formSection}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <ShieldCheck size={24} />
                <div>
                  <h2 style={styles.cardTitle}>Insurance Payment</h2>
                  <p style={styles.cardSubtitle}>
                    Pay for all leading insurance providers
                  </p>
                </div>
              </div>

              <div style={styles.cardBody}>
                <form onSubmit={handleRecharge}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Policy Number</label>
                    <input
                      type="text"
                      name="policyNumber"
                      placeholder="Enter Policy Number"
                      value={formData.policyNumber}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      Select Insurance Provider
                    </label>
                    <select
                      name="operatorcode"
                      value={formData.operatorcode}
                      onChange={handleChange}
                      style={styles.select}
                    >
                      <option value="">Select Provider</option>
                      {insuranceProviders.map((op) => (
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
                      name="amount"
                      placeholder="Enter premium amount"
                      value={formData.amount}
                      onChange={handleChange}
                      style={styles.input}
                    />
                    <div style={styles.quickAmounts}>
                      {quickAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handleQuickAmount(amt)}
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
                        Pay Now
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
                  <p style={styles.cardSubtitle}>
                    Your last 5 insurance payments
                  </p>
                </div>
              </div>
              <div style={styles.cardBody}>
                {transactions.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>🧾</div>
                    <p style={styles.emptyText}>No transactions yet</p>
                    <p style={styles.emptySubtext}>
                      Your payment history will appear here
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
