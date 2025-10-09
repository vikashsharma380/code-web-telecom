import React, { useState, useEffect } from "react";
import { Smartphone, Zap, TrendingUp, Clock } from "lucide-react";

export default function MobileRecharge() {
  const [formData, setFormData] = useState({
    number: "",
    operatorcode: "",
    circlecode: "",
    amount: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [detecting, setDetecting] = useState(false);
  const [activeTab, setActiveTab] = useState("mobile");

  const operators = [
    { code: "A", name: "Airtel" },
    { code: "V", name: "Vodafone" },
    { code: "BT", name: "BSNL - TOPUP" },
    { code: "RC", name: "RELIANCE - JIO" },
    { code: "I", name: "Idea" },
    { code: "BR", name: "BSNL - STV" },
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      if (value === "" || /^\d+$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "number") {
      if (value === "" || /^\d+$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    const detectOperator = async () => {
      if (formData.number.length === 10) {
        setDetecting(true);
        try {
          const res = await fetch(
            `https://code-web-telecom.onrender.com/api/lookup?number=${formData.number}`
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
  }, [formData.number]);

  const handleRecharge = async (e) => {
    e.preventDefault();

    if (
      !formData.number ||
      !formData.operatorcode ||
      !formData.circlecode ||
      !formData.amount
    ) {
      setResult({ type: "error", message: "Please fill all fields!" });
      return;
    }

    if (formData.number.length !== 10) {
      setResult({
        type: "error",
        message: "Please enter a valid 10-digit mobile number!",
      });
      return;
    }

    if (parseInt(formData.amount) <= 0) {
      setResult({ type: "error", message: "Please enter a valid amount!" });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("https://code-web-telecom.onrender.com/api/recharge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "500032",
          pwd: "k0ly9gts",
          ...formData,
        }),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      await res.json();

      setResult({ type: "success", message: "Recharge successful!" });

      const newTransaction = {
        txid: `TX${Date.now()}`,
        operator: formData.operatorcode,
        number: formData.number,
        operatorId: formData.operatorcode.toUpperCase(),
        amount: formData.amount,
        status: "Success",
        date: new Date().toLocaleString(),
      };
      setTransactions([newTransaction, ...transactions]);

      setFormData({ number: "", operatorcode: "", circlecode: "", amount: "" });

      setTimeout(() => setResult(null), 5000);
    } catch (error) {
      console.error("Recharge failed:", error);
      setResult({ type: "error", message: "Failed to connect to API" });
    } finally {
      setLoading(false);
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
              <span style={styles.balanceAmount}>₹0.00</span>
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
              Fast, secure, and reliable mobile recharge for all operators
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

// === STYLES ===
const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #1e1e2e 0%, #2d1b69 50%, #1e1e2e 100%)",
    position: "relative",
    overflow: "hidden",
  },
  bgPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.2) 0%, transparent 50%)",
    pointerEvents: "none",
  },
  navbar: {
    background: "rgba(30, 30, 46, 0.8)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "16px 0",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  navContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "32px",
    flexWrap: "wrap",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logoIcon: {
    width: "48px",
    height: "48px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
  },
  logoText: {
    fontSize: "18px",
    fontWeight: "700",
    color: "white",
    letterSpacing: "-0.5px",
  },
  logoSubtext: {
    fontSize: "12px",
    color: "rgba(255, 255, 255, 0.5)",
    marginTop: "2px",
  },
  navLinks: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
  },
  navLink: {
    color: "rgba(255, 255, 255, 0.7)",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    transition: "color 0.3s ease",
    whiteSpace: "nowrap",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  balanceBadge: {
    background: "rgba(102, 126, 234, 0.2)",
    border: "1px solid rgba(102, 126, 234, 0.3)",
    padding: "8px 16px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  balanceLabel: {
    fontSize: "10px",
    color: "rgba(255, 255, 255, 0.5)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  balanceAmount: {
    fontSize: "16px",
    fontWeight: "700",
    color: "white",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
  },
  hero: {
    padding: "60px 32px",
    position: "relative",
  },
  heroContent: {
    maxWidth: "1400px",
    margin: "0 auto",
  },
  heroLeft: {
    maxWidth: "600px",
  },
  welcomeBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(102, 126, 234, 0.2)",
    border: "1px solid rgba(102, 126, 234, 0.3)",
    padding: "8px 16px",
    borderRadius: "100px",
    color: "#a5b4fc",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "24px",
  },
  heroTitle: {
    fontSize: "56px",
    fontWeight: "800",
    color: "white",
    margin: "0 0 16px 0",
    lineHeight: "1.1",
    letterSpacing: "-2px",
  },
  heroSubtitle: {
    fontSize: "18px",
    color: "rgba(255, 255, 255, 0.6)",
    margin: "0 0 32px 0",
    lineHeight: "1.6",
  },
  statsGrid: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  statCard: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "16px 20px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#a5b4fc",
    flex: "1",
    minWidth: "180px",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "700",
    color: "white",
  },
  statLabel: {
    fontSize: "12px",
    color: "rgba(255, 255, 255, 0.5)",
    marginTop: "2px",
  },
  tabSection: {
    padding: "0 32px 32px",
    position: "relative",
  },
  tabsContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    gap: "8px",
    padding: "8px",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    overflowX: "auto",
  },
  tabBtn: {
    background: "transparent",
    color: "rgba(255, 255, 255, 0.5)",
    border: "none",
    padding: "12px 24px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
  },
  tabBtnActive: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    boxShadow: "0 4px 16px rgba(102, 126, 234, 0.4)",
  },
  mainContent: {
    padding: "0 32px 60px",
    position: "relative",
  },
  contentGrid: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "32px",
  },
  formSection: {
    minWidth: 0,
  },
  transactionSection: {
    minWidth: 0,
  },
  card: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "24px",
    overflow: "hidden",
  },
  cardHeader: {
    padding: "24px 32px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    color: "#a5b4fc",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "white",
    margin: 0,
  },
  cardSubtitle: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.5)",
    margin: "4px 0 0 0",
  },
  cardBody: {
    padding: "32px",
  },
  formGroup: {
    marginBottom: "24px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: "8px",
    letterSpacing: "0.3px",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    fontSize: "15px",
    color: "white",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
  },
  select: {
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
  },
  detectingText: {
    fontSize: "12px",
    color: "#a5b4fc",
    marginTop: "8px",
    fontWeight: "500",
  },
  quickAmounts: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "12px",
  },
  quickAmountBtn: {
    padding: "8px 16px",
    background: "rgba(102, 126, 234, 0.2)",
    border: "1px solid rgba(102, 126, 234, 0.3)",
    borderRadius: "8px",
    color: "#a5b4fc",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  rechargeBtn: {
    width: "100%",
    padding: "16px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
    transition: "all 0.3s ease",
  },
  btnDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  loadingSpinner: {
    width: "20px",
    height: "20px",
    border: "3px solid rgba(255, 255, 255, 0.3)",
    borderTop: "3px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  resultBox: {
    marginTop: "16px",
    padding: "16px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
  },
  successBox: {
    background: "rgba(16, 185, 129, 0.2)",
    border: "1px solid rgba(16, 185, 129, 0.3)",
    color: "#6ee7b7",
  },
  errorBox: {
    background: "rgba(239, 68, 68, 0.2)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    color: "#fca5a5",
  },
  emptyState: {
    textAlign: "center",
    padding: "48px 24px",
  },
  emptyIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  emptyText: {
    fontSize: "16px",
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.7)",
    margin: "0 0 8px 0",
  },
  emptySubtext: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.4)",
    margin: 0,
  },
  transactionList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  transactionItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    transition: "all 0.3s ease",
  },
  transactionIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "20px",
    fontWeight: "700",
    flexShrink: 0,
  },
  transactionDetails: {
    flex: 1,
    minWidth: 0,
  },
  transactionOperator: {
    fontSize: "16px",
    fontWeight: "600",
    color: "white",
    marginBottom: "4px",
  },
  transactionNumber: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.5)",
    marginBottom: "4px",
  },
  transactionDate: {
    fontSize: "12px",
    color: "rgba(255, 255, 255, 0.3)",
  },
  transactionRight: {
    textAlign: "right",
    flexShrink: 0,
  },
  transactionAmount: {
    fontSize: "18px",
    fontWeight: "700",
    color: "white",
    marginBottom: "4px",
  },
  transactionStatus: {
    fontSize: "12px",
    color: "#6ee7b7",
    fontWeight: "600",
  },
  footer: {
    padding: "32px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    textAlign: "center",
  },
  footerText: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.5)",
    margin: 0,
  },
  footerBrand: {
    color: "#a5b4fc",
    fontWeight: "600",
  },
  "@media (max-width: 1024px)": {
    contentGrid: {
      gridTemplateColumns: "1fr",
    },
  },
};
