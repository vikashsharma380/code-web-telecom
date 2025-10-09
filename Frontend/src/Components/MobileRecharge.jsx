// import React, { useState, useEffect } from "react";
// import '../CSS/MobileRecharge.css'

// export default function MobileRecharge() {
//   const [formData, setFormData] = useState({
//     number: "",
//     amount: "",
//     operatorcode: "",
//     circlecode: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [detecting, setDetecting] = useState(false);
//   const [result, setResult] = useState(null);

//  const operators = [
//   { code: "A", name: "Airtel" },
//   { code: "V", name: "Vodafone" },
//   { code: "BT", name: "BSNL - TOPUP" },
//   { code: "RC", name: "RELIANCE - JIO" },
//   { code: "I", name: "Idea" },
//   { code: "BR", name: "BSNL - STV" },
//   { code: "GLF", name: "Google Play" },
//   { code: "AXF", name: "Axis Bank Fastag" },
//   { code: "BBF", name: "Bank Of Baroda - Fastag" },
//   { code: "EFF", name: "Equitas Fastag Recharge" },
//   { code: "FDF", name: "Federal Bank - Fastag" },
//   { code: "HDF", name: "Hdfc Bank - Fastag" },
//   { code: "ICF", name: "Icici Bank Fastag" },
//   { code: "IBF", name: "Idbi Bank Fastag" },
//   { code: "IFF", name: "Idfc First Bank- Fastag" },
//   { code: "IHMCF", name: "Indian Highways Management Company Ltd Fastag" },
//   { code: "INDF", name: "Indusind Bank Fastag" },
//   { code: "JKF", name: "Jammu And Kashmir Bank Fastag" },
//   { code: "KMF", name: "Kotak Mahindra Bank - Fastag" },
//   { code: "PTF", name: "Paytm Payments Bank Fastag" },
//   { code: "SBF", name: "Sbi Bank Fastag" },
//   { code: "HPSEBL", name: "HP" },
//   { code: "Hpgas", name: "Hp Gas" },
// ];

// const circles = [
//   { code: "13", name: "Andhra Pradesh" },
//   { code: "24", name: "Assam" },
//   { code: "17", name: "Bihar" },
//   { code: "27", name: "Chhattisgarh" },
//   { code: "12", name: "Gujarat" },
//   { code: "20", name: "Haryana" },
//   { code: "21", name: "Himachal Pradesh" },
//   { code: "25", name: "Jammu And Kashmir" },
//   { code: "22", name: "Jharkhand" },
//   { code: "9",  name: "Karnataka" },
//   { code: "14", name: "Kerala" },
//   { code: "16", name: "Madhya Pradesh" },
//   { code: "4",  name: "Maharashtra" },
//   { code: "2",  name: "West Bengal" },
//   { code: "10", name: "Uttar Pradesh East" },
//   { code: "11", name: "Uttar Pradesh West" },
//   { code: "3",  name: "Mumbai" },
//   { code: "5",  name: "Delhi" },
//   { code: "7",  name: "CHENNAI" },
//   { code: "6",  name: "Kolkata" },
//   { code: "8",  name: "Tamil Nadu" },
//   { code: "1",  name: "Punjab" },
//   { code: "18", name: "Rajasthan" },
//   { code: "26", name: "NORTH EAST" },
// ];

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

//   // Auto detect operator safely
//   useEffect(() => {
//     const detectOperator = async () => {
//       if (formData.number.length === 10) {
//         setDetecting(true);
//         try {
//           const res = await fetch(`http://localhost:5000/api/lookup?number=${formData.number}`);
//           if (!res.ok) throw new Error(`Server returned ${res.status}`);
//           const data = await res.json();
//           if (data.operatorcode) setFormData((prev) => ({ ...prev, operatorcode: data.operatorcode }));
//           if (data.circlecode) setFormData((prev) => ({ ...prev, circlecode: data.circlecode }));
//         } catch (error) {
//           console.warn("Auto-detect failed, use dropdown manually", error);
//         } finally {
//           setDetecting(false);
//         }
//       }
//     };
//     detectOperator();
//   }, [formData.number]);

//   // Recharge API POST call
//   const handleRecharge = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResult(null);

//     try {
//       const res = await fetch("http://localhost:5000/api/recharge", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//     username: "8517007867",
//     pwd: "0936Ec211013@",
//     ...formData
//   }),
//       });
//       if (!res.ok) throw new Error(`Server returned ${res.status}`);
//       const data = await res.json();
//       setResult(data);
//     } catch (error) {
//       console.error("Recharge failed:", error);
//       setResult({ error: "Failed to connect to API" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="recharge-page">
//       <div className="recharge-container">
//         <div className="recharge-header">
//           <h2>MOBILE RECHARGE (Prepaid)</h2>
//         </div>

//         <div className="recharge-content">
//           <div className="recharge-form-section">
//             <form onSubmit={handleRecharge}>
//               <div className="form-group">
//                 <label>Mobile Number :</label>
//                 <input
//                   type="text"
//                   name="number"
//                   placeholder="Please Enter Mobile Number*"
//                   value={formData.number}
//                   onChange={handleChange}
//                   maxLength="10"
//                   required
//                 />
//                 {detecting && (
//                   <span className="detecting-text">Detecting operator...</span>
//                 )}
//               </div>

//               <div className="form-group">
//                 <label>Select Operator :</label>
//                 <select
//                   name="operatorcode"
//                   value={formData.operatorcode}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">--Select Operator--</option>
//                   {operators.map((op) => (
//                     <option key={op.code} value={op.code}>
//                       {op.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Circle Code :</label>
//                 <select
//                   name="circlecode"
//                   value={formData.circlecode}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">--Select Circle--</option>
//                   {circles.map((c) => (
//                     <option key={c.code} value={c.code}>
//                       {c.name}
//                     </option>
//                   ))}
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
//                 {loading ? "Processing..." : "Recharge"}
//               </button>
//             </form>
//           </div>
//         </div>

//         {result && (
//           <div className="result-section">
//             {result.error ? (
//               <p className="result-error">Error: {result.error}</p>
//             ) : (
//               <p className="result-success">Recharge processed successfully!</p>
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
//                 <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
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
/* ============================
   Mobile Recharge - Premium UI
   Compatible with Code Web Telecom Website
   ============================ */
import React, { useState } from "react";
import { Smartphone, Zap, TrendingUp, Clock } from "lucide-react";

export default function MobileRecharge() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

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
  { code: "9",  name: "Karnataka" },
  { code: "14", name: "Kerala" },
  { code: "16", name: "Madhya Pradesh" },
  { code: "4",  name: "Maharashtra" },
  { code: "2",  name: "West Bengal" },
  { code: "10", name: "Uttar Pradesh East" },
  { code: "11", name: "Uttar Pradesh West" },
  { code: "3",  name: "Mumbai" },
  { code: "5",  name: "Delhi" },
  { code: "7",  name: "CHENNAI" },
  { code: "6",  name: "Kolkata" },
  { code: "8",  name: "Tamil Nadu" },
  { code: "1",  name: "Punjab" },
  { code: "18", name: "Rajasthan" },
  { code: "26", name: "NORTH EAST" },
];


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      if (value === "" || (/^\d+$/.test(value) && parseInt(value) > 0)) {
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

  // Auto detect operator safely
  useEffect(() => {
    const detectOperator = async () => {
      if (formData.number.length === 10) {
        setDetecting(true);
        try {
          const res = await fetch(`http://localhost:5000/api/lookup?number=${formData.number}`);
          if (!res.ok) throw new Error(`Server returned ${res.status}`);
          const data = await res.json();
          if (data.operatorcode) setFormData((prev) => ({ ...prev, operatorcode: data.operatorcode }));
          if (data.circlecode) setFormData((prev) => ({ ...prev, circlecode: data.circlecode }));
        } catch (error) {
          console.warn("Auto-detect failed, use dropdown manually", error);
        } finally {
          setDetecting(false);
        }
      }
    };
    detectOperator();
  }, [formData.number]);

  // Recharge API POST call
  const handleRecharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:5000/api/recharge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
    username: "8517007867",  
    pwd: "0936Ec211013@",   
    ...formData             
  }),
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Recharge failed:", error);
      setResult({ error: "Failed to connect to API" });
    } finally {
      setLoading(false);
      setResult({ type: "success", message: "Recharge successful!" });
      const newTransaction = {
        txid: `TX${Date.now()}`,
        operator,
        number: mobileNumber,
        operatorId: operator.toUpperCase(),
        amount: amount,
        status: "Success",
        date: new Date().toLocaleString(),
      };
      setTransactions([newTransaction, ...transactions]);
      setMobileNumber("");
      setOperator("");
      setAmount("");

      setTimeout(() => setResult(null), 5000);
    }, 1500);
  };

  const quickAmounts = [49, 99, 199, 299, 499, 999];
  const cellStyle = {
    color: "rgba(255,255,255,0.8)",
    fontSize: "13px",
    padding: "10px 16px",
    whiteSpace: "nowrap",
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

        <div className="recharge-content">
          <div className="recharge-form-section">
            <form onSubmit={handleRecharge}>
              <div className="form-group">
                <label>Mobile Number :</label>
                <input
                  type="text"
                  name="number"
                  placeholder="Please Enter Mobile Number*"
                  value={formData.number}
                  onChange={handleChange}
                  maxLength="10"
                  required
                />
                {detecting && (
                  <span className="detecting-text">Detecting operator...</span>
                )}
              </div>

              <div className="form-group">
                <label>Select Operator :</label>
                <select
                  name="operatorcode"
                  value={formData.operatorcode}
                  onChange={handleChange}
                  required
                >
                  <option value="">--Select Operator--</option>
                  {operators.map((op) => (
                    <option key={op.code} value={op.code}>
                      {op.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Circle Code :</label>
                <select
                  name="circlecode"
                  value={formData.circlecode}
                  onChange={handleChange}
                  required
                >
                  <option value="">--Select Circle--</option>
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
                    placeholder="Enter amount"
                    value={amount}
                    onChange={handleAmountChange}
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
                      Your recharge history will appear here
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

      {/* Last 5 Transactions Table */}
      <div style={{ marginTop: "32px" }}>
        <h3
          style={{
            color: "white",
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "12px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            paddingBottom: "8px",
          }}
        >
          Last 5 Transactions
        </h3>
        <div
          style={{
            overflowX: "auto",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "700px",
            }}
          >
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                {[
                  "TXID",
                  "Operator",
                  "Number",
                  "Operator Id",
                  "Amount",
                  "Status",
                  "Date",
                ].map((col) => (
                  <th
                    key={col}
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "13px",
                      fontWeight: "600",
                      textAlign: "left",
                      padding: "12px 16px",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      padding: "16px",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.slice(0, 5).map((t) => (
                  <tr
                    key={t.txid}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <td style={cellStyle}>{t.txid}</td>
                    <td style={cellStyle}>{t.operator}</td>
                    <td style={cellStyle}>{t.number}</td>
                    <td style={cellStyle}>{t.operatorId}</td>
                    <td style={cellStyle}>₹{t.amount}</td>
                    <td style={{ ...cellStyle, color: "#6ee7b7" }}>
                      {t.status}
                    </td>
                    <td style={cellStyle}>{t.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
