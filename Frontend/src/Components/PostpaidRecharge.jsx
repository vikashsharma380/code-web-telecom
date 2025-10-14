import React, { useState, useEffect } from "react";
import { Smartphone, Zap, Clock, TrendingUp } from "lucide-react";
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

  const rechargeUser = {
    username: "500032",
    pwd: "k0ly9gts",
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

  // === OPERATORS & CIRCLES ===
  const operators = [
  { code: "PAT", name: "Airtel Postpaid" },
  { code: "IP", name: "Idea Postpaid" },
  { code: "VP", name: "Vodafone Postpaid" },
  { code: "DP", name: "Tata Docomo Postpaid" },
  { code: "BP", name: "BSNL Postpaid" },
  { code: "LBS", name: "BSNL Landline" },
  { code: "LMT", name: "MTNL Delhi Landline" },
  { code: "LAT", name: "Airtel Landline" },
  { code: "JPP", name: "Jio Postpaid" },
];



  const quickAmounts = [199, 299, 399, 499, 599, 999];

  // === FORM HANDLERS ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecharge = async (e) => {
     e.preventDefault();
     setLoading(true);
     setResult(null);
     try {
       const { consumerNumber, operatorcode: operator, amount } = formData;
       console.log("🚀 Form Data:", { consumerNumber, operator, amount });
       if (!consumerNumber || !operator || !amount) {
         throw new Error("All fields are required");
       }
       const payload = {
         ...rechargeUser, // includes username & pwd
         number: consumerNumber,
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
           number: consumerNumber,
           amount,
           status: data.status,
           date: new Date().toLocaleString(),
         },
         ...transactions,
       ]);
       // Reset form
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
 

  // === RETURN JSX ===
  return (
    <div style={styles.container}>
       {/* Navbar */}
          <Nav/>
     
           {/* Hero Section */}
         <Hero      
           title="Instant Postpaid Recharge"
           subtitle="Fast, secure, and reliable postpaid recharges for all accounts"
         />
     
           {/* Tabs */}
          <Tab/>

      {/* Form Section */}
      <div style={styles.mainContent}>
        <div style={styles.contentGrid}>
          {/* Form */}
          <div style={styles.formSection}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <Smartphone size={24} />
                <div>
                  <h2 style={styles.cardTitle}>Postpaid Recharge</h2>
                  <p style={styles.cardSubtitle}>
                    Pay your mobile bill in seconds
                  </p>
                </div>
              </div>
              <div style={styles.cardBody}>
                <form onSubmit={handleRecharge}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Mobile Number</label>
                    <input
  type="text"
  placeholder="Enter Mobile / Landline Number"
  value={formData.consumerNumber || ""}
  onChange={(e) =>
    setFormData({ ...formData, consumerNumber: e.target.value })
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
                  <p style={styles.cardSubtitle}>Last 5 postpaid bills</p>
                </div>
              </div>
              <div style={styles.cardBody}>
                {transactions.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>📱</div>
                    <p style={styles.emptyText}>No transactions yet</p>
                    <p style={styles.emptySubtext}>
                      Your postpaid recharge history will appear here
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
