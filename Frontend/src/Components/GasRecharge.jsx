import React, { useState , useEffect} from "react";
import { CreditCard, Clock, Zap, Smartphone } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

import { Link } from "react-router-dom";
import Nav from "../../hero/nav";
import Hero from "../../hero/hero";
import Tab from "../../hero/Tab";
import styles from "../styles";
export default function GasRecharge() {
  const [consumerNumber, setConsumerNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [provider, setProvider] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("gas");

  const quickAmounts = [100, 200, 500, 1000, 2000];



  const [formData, setFormData] = useState({
     consumerNumber: "",
     operatorcode: "",
     amount: "",
   });
 
   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData((prev) => ({ ...prev, [name]: value }));
   };
   

   const [balance, setBalance] = useState(0);
   const [balanceLoading, setBalanceLoading] = useState(false);
   const [detecting, setDetecting] = useState(false);
 
   
 
   const operators = [
   
  { code: "MG", name: "Mahanagar Gas" },
  { code: "AG", name: "Adani Gas" },
  { code: "GG", name: "Gujarat Gas" },
  { code: "IG", name: "Indraprastha Gas" },
];

  
 
   const rechargeUser = {
     username: "500032",
     pwd: "k0ly9gts",
   };
   const payload = {
     number: formData.number,
     operatorcode: formData.operator,
     amount: formData.amount,
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
   // === OPERATOR AUTO-DETECT ===
   useEffect(() => {
     const detectOperator = async () => {
       if (formData.consumerNumber && formData.consumerNumber.length === 10) {
         setDetecting(true);
         try {
           const res = await fetch(
             `${API_URL}/api/lookup?number=${formData.consumerNumber}`
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
   }, [formData.consumerNumber]);
   // === OPERATORS & CIRCLES ===
 
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
       const res = await fetch(`${API_URL}/api/gasrecharge`, {
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
 
  return (
    <div style={styles.container}>
      {/* Navbar */}
      <Nav />
      {/* Hero */}
      <Hero />

      {/* Tabs */}
      <Tab />

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
                    value={formData.consumerNumber}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || /^\d+$/.test(val))
                        setFormData({ ...formData, consumerNumber: val });
                    }}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Select Gas Provider</label>
                  <select
                    value={formData.operatorcode}
                    onChange={(e) => setFormData({ ...formData, operatorcode: e.target.value })}
                    style={styles.select}
                  >
                    <option value="">Select Provider</option>
                     {operators.map((operator) => (
                      <option key={operator.code} value={operator.code}>
                        {operator.name}
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
      if (val === "" || (/^\d+$/.test(val) && parseInt(val) > 0)) {
        setFormData((prev) => ({
          ...prev,
          amount: val,
        }));
      }
    }}
    style={styles.input}
  />

  <div style={styles.quickAmounts}>
    {quickAmounts.map((amt) => (
      <button
        key={amt}
        onClick={() =>
          setFormData((prev) => ({
            ...prev,
            amount: amt.toString(),
          }))
        }
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
