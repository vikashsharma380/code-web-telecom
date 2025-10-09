// import React, { useState } from "react";
// import "./CSS/rechargeForm.css";

// export default function GasRecharge() {
//   const [formData, setFormData] = useState({
//     number: "",
//     amount: "",
//     operatorcode: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);

//   const username = "8517007867";
//   const pwd = "0936Ec211013@";

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "amount") {
//       if (value === "" || (/^\d+$/.test(value) && parseInt(value) > 0)) {
//         setFormData({ ...formData, [name]: value });
//       }
//     } else if (name === "number") {
//       if (value === "" || /^\d+$/.test(value)) {
//         setFormData({ ...formData, [name]: value });
//       }
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleRecharge = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResult(null);

//     const { number, amount, operatorcode } = formData;
//     const orderid = "ORD" + Date.now();

//     const url = `http://localhost:5000/api/recharge?username=${username}&pwd=${pwd}&operatorcode=${operatorcode}&circlecode=&number=${number}&amount=${amount}&orderid=${orderid}&format=json`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setResult(data);
//     } catch (error) {
//       console.error("Payment failed:", error);
//       setResult({ error: "Failed to connect to API" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="recharge-page">
//       <div className="recharge-container">
//         <div className="recharge-header">
//           <h2>GAS BILL PAYMENT</h2>
//         </div>

//         <div className="recharge-content">
//           <div className="recharge-form-section">
//             <form onSubmit={handleRecharge}>
//               <div className="form-group">
//                 <label>Consumer Number :</label>
//                 <input
//                   type="text"
//                   name="number"
//                   placeholder="Please Enter Consumer Number*"
//                   value={formData.number}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Select Gas Provider :</label>
//                 <select
//                   name="operatorcode"
//                   value={formData.operatorcode}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Gas Provider*</option>
//                   <option value="GAS01">Indraprastha Gas Limited</option>
//                   <option value="GAS02">Mahanagar Gas Limited</option>
//                   <option value="GAS03">Gujarat Gas Limited</option>
//                   <option value="GAS04">Adani Gas Limited</option>
//                   <option value="GAS05">Bhagyanagar Gas Limited</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Amount :</label>
//                 <input
//                   type="text"
//                   name="amount"
//                   placeholder="Amount"
//                   value={formData.amount}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <button type="submit" className="recharge-btn" disabled={loading}>
//                 {loading ? "Processing..." : "Pay Bill"}
//               </button>
//             </form>
//           </div>
//         </div>

//         {result && (
//           <div className="result-section">
//             {result.error ? (
//               <p className="result-error">Error: {result.error}</p>
//             ) : (
//               <p className="result-success">Payment processed successfully!</p>
//             )}
//             <div className="result-data">{JSON.stringify(result, null, 2)}</div>
//           </div>
//         )}

//         <div className="transaction-section">
//           <h3>Last 5 Transaction</h3>
//           <table className="transaction-table">
//             <thead>
//               <tr>
//                 <th>TXID</th>
//                 <th>Operator</th>
//                 <th>Number</th>
//                 <th>Operator Id</th>
//                 <th>Amount</th>
//                 <th>Status</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td
//                   colspan="7"
//                   style={{ textAlign: "center", padding: "20px" }}
//                 >
//                   No transactions yet
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { CreditCard, Clock, Zap, Smartphone } from "lucide-react";

export default function GasRecharge() {
  const [consumerNumber, setConsumerNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [provider, setProvider] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("gas");

  const quickAmounts = [100, 200, 500, 1000, 2000];

  const handleRecharge = () => {
    if (!consumerNumber || !provider || !amount) {
      setResult({ type: "error", message: "Please fill all fields!" });
      return;
    }

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setLoading(false);
      setResult({ type: "success", message: "Gas bill paid successfully!" });

      const newTransaction = {
        txid: `TX${Date.now()}`,
        operator: provider,
        number: consumerNumber,
        operatorId: provider.toUpperCase(),
        amount,
        status: "Success",
        date: new Date().toLocaleString(),
      };

      setTransactions([newTransaction, ...transactions]);
      setConsumerNumber("");
      setProvider("");
      setAmount("");

      setTimeout(() => setResult(null), 5000);
    }, 1500);
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
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
            <div style={styles.avatar}>G</div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroLeft}>
            <div style={styles.welcomeBadge}>
              <Zap size={16} />
              <span>Welcome back, Vikash!</span>
            </div>
            <h1 style={styles.heroTitle}>Gas Bill Payment</h1>
            <p style={styles.heroSubtitle}>
              Pay your gas bills quickly and securely
            </p>

            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <Zap size={20} />
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

      {/* Tabs */}
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
            "FASTag",
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
                <CreditCard size={24} />
                <div>
                  <h2 style={styles.cardTitle}>Gas Bill Payment</h2>
                  <p style={styles.cardSubtitle}>All Gas Providers Supported</p>
                </div>
              </div>

              <div style={styles.cardBody}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Consumer Number</label>
                  <input
                    type="text"
                    placeholder="Enter Consumer Number"
                    value={consumerNumber}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || /^\d+$/.test(val))
                        setConsumerNumber(val);
                    }}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Select Gas Provider</label>
                  <select
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    style={styles.select}
                  >
                    <option value="">Select Provider</option>
                    <option value="Indraprastha Gas Limited">
                      Indraprastha Gas Limited
                    </option>
                    <option value="Mahanagar Gas Limited">
                      Mahanagar Gas Limited
                    </option>
                    <option value="Gujarat Gas Limited">
                      Gujarat Gas Limited
                    </option>
                    <option value="Adani Gas Limited">Adani Gas Limited</option>
                    <option value="Bhagyanagar Gas Limited">
                      Bhagyanagar Gas Limited
                    </option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Amount</label>
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (
                        val === "" ||
                        (/^\d+$/.test(val) && parseInt(val) > 0)
                      )
                        setAmount(val);
                    }}
                    style={styles.input}
                  />

                  <div style={styles.quickAmounts}>
                    {quickAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setAmount(amt.toString())}
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
                    <>Pay Bill</>
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
                    Your last 5 Gas bill payments
                  </p>
                </div>
              </div>

              <div style={styles.cardBody}>
                {transactions.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>🔥</div>
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
