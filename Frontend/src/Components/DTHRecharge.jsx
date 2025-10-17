import React, { useState, useEffect } from "react";
import { Smartphone, Zap, Clock } from "lucide-react";
import styles from "../styles";
import Nav from "../../hero/nav";
import Hero from "../../hero/hero";
import Tab from "../../hero/Tab";

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
  const [activeTab, setActiveTab] = useState("recharge");
  const [rechargeUser, setRechargeUser] = useState({});
  const [balance, setBalance] = useState(0);

  // ✅ Load User Credentials from LocalStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setRechargeUser({
        username: u.userId,
        pwd: u.apiPassword,
      });
      console.log("🔹 Recharge User:", {
        username: u.userId,
        pwd: u.apiPassword,
      });
    }
  }, []);

  // ✅ Fetch Balance
  const fetchBalance = async () => {
    try {
      const query = new URLSearchParams(rechargeUser).toString();
      const res = await fetch(`${API_URL}/api/balance?${query}`);
      const data = await res.json();
      setBalance(data.balance || 0);
    } catch (error) {
      console.error("Balance fetch failed:", error);
      setBalance(0);
    }
  };

  useEffect(() => {
    if (rechargeUser.username) fetchBalance();
  }, [rechargeUser]);

  // ✅ Fetch Transactions (from backend)
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

  // ✅ Operator List
 const operators = [
  { code: "ATV", name: "Airtel Digital DTH TV" },
  { code: "STV", name: "SUNDIRECT DTH TV" },
  { code: "TTV", name: "TATASKY DTH TV" },
  { code: "VTV", name: "VIDEOCON DTH TV" },
  { code: "DTV", name: "DISH TV" },
];


  const quickAmounts = [99, 199, 299, 499, 999, 1499];

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuickAmount = (amt) => {
    setFormData({ ...formData, amount: amt.toString() });
  };

  // ✅ DTH Recharge
  const handleRecharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const token = localStorage.getItem("token");
      const { dthNumber, operatorcode, amount } = formData;
      const { username, pwd } = rechargeUser;

      if (!dthNumber || !operatorcode || !amount)
        throw new Error("All fields are required");

      const payload = {
        username,
        pwd,
        number: dthNumber,
        operatorcode,
        amount,
        circlecode: "1",
        
      };

      console.log("🚀 Sending Payload:", payload);

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

      console.log("✅ DTH Recharge API Response:", data);

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

      // ✅ Add to Transaction List
      setTransactions((prev) => [
        {
          txid: data.txid || Math.random(),
          operator: operatorcode,
          number: dthNumber,
          amount,
          status: data.status,
          date: new Date().toLocaleString(),
        },
        ...prev,
      ]);

      // ✅ Reset Form
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

  // ✅ UI
  return (
    <div style={styles.container}>
      <Nav />
      <Hero
        title="Instant DTH Recharge"
        subtitle="Recharge your DTH account instantly and securely"
      />
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={styles.mainContent}>
        <div style={styles.contentGrid}>
          {/* DTH Recharge Form */}
          <div style={styles.formSection}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <Smartphone size={24} />
                <div>
                  <h2 style={styles.cardTitle}>DTH Recharge</h2>
                  <p style={styles.cardSubtitle}>For all DTH providers</p>
                </div>
              </div>
              <div style={styles.cardBody}>
                <form onSubmit={handleRecharge}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>DTH Subscriber ID</label>
                    <input
                      type="text"
                      name="dthNumber"
                      placeholder="Enter your DTH number"
                      value={formData.dthNumber}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Select Operator</label>
                    <select
                      name="operatorcode"
                      value={formData.operatorcode}
                      onChange={handleChange}
                      style={styles.select}
                    >
                      <option value="">Choose your DTH operator</option>
                      {operators.map((op) => (
                        <option key={op.code} value={op.code}>
                          {op.name}
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
                  <p style={styles.cardSubtitle}>Your last 5 DTH recharges</p>
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
                    {transactions.slice(0, 5).map((t, i) => (
                      <div
                        key={`${t.txid}-${t.number}-${i}`}
                        style={styles.transactionItem}
                      >
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
