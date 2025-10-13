import React, { useState, useEffect } from "react";
import { Zap, Clock, TrendingUp, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
import styles from "../styles";
import Nav from "../../hero/nav";
import Hero from "../../hero/Hero";
import Tab from "../../hero/Tab";

export default function ElectricityRecharge() {
  const [consumerNumber, setConsumerNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [amount, setAmount] = useState("");



  const [formData, setFormData] = useState({
     consumerNumber: "",
     operatorcode: "",
     amount: "",
   });
 
   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData((prev) => ({ ...prev, [name]: value }));
   };
   
   const [loading, setLoading] = useState(false);
   const [result, setResult] = useState(null);
   const [transactions, setTransactions] = useState([]);
   const [activeTab, setActiveTab] = useState("fastag");
   const [balance, setBalance] = useState(0);
   const [balanceLoading, setBalanceLoading] = useState(false);
   const [detecting, setDetecting] = useState(false);
 
   const quickAmounts = [100, 200, 500, 1000, 2000];
 
   const operators = [
    { code: "BSES", name: "BSES Rajdhani Power Limited - Delhi" },
    { code: "BSESY", name: "BSES Yamuna Power Limited - Delhi" },
    { code: "TPD", name: "Tata Power Delhi Limited - Delhi" },
    { code: "REL", name: "Reliance Energy Limited" },
    { code: "NBE", name: "North Bihar Electricity" },
    { code: "SBE", name: "South Bihar Electricity" },
    { code: "BEST", name: "BEST Electricity" },
    { code: "AJV", name: "Ajmer Vidyut Vitran Nigam - RAJASTHAN" },
    { code: "BESCOM", name: "BESCOM - BENGALURU" },
    { code: "CESC", name: "CESC - WEST BENGAL" },
    { code: "CSEB", name: "CSEB - CHHATTISGARH" },
    { code: "JVV", name: "Jaipur Vidyut Vitran Nigam - RAJASTHAN" },
    { code: "JDVV", name: "Jodhpur Vidyut Vitran Nigam - RAJASTHAN" },
    { code: "MKV1", name: "Madhya Kshetra Vitaran - MADHYA PRADESH" },
    { code: "MSEDC", name: "MSEDC - MAHARASHTRA" },
    { code: "NP", name: "Noida Power - NOIDA" },
    { code: "PKV", name: "Paschim Kshetra Vitaran - MADHYA PRADESH" },
    { code: "SPA", name: "Southern Power - ANDHRA PRADESH" },
    { code: "SPT", name: "Southern Power - TELANGANA" },
    { code: "TRP", name: "Torrent Power" },
    { code: "APDCLN", name: "APDCL (Non-RAPDR) - ASSAM" },
    { code: "APEPDCL", name: "APEPDCL - ANDHRA PRADESH" },
    { code: "APDCLR", name: "Assam Power Distribution Company Ltd (RAPDR)" },
    { code: "BHES", name: "Bharatpur Electricity Services Ltd" },
    { code: "BESL", name: "Bikaner Electricity Supply Limited" },
    { code: "BMESTU", name: "Brihan Mumbai Electricity Supply and Transport" },
    { code: "APCPDCL", name: "Central Power Distribution Company of Andhra Pradesh Ltd" },
    { code: "CESCOM", name: "Chamundeshwari Electricity Supply Corporation Ltd." },
    { code: "CSPDCL", name: "Chhattisgarh State Power Distribution Company Ltd." },
    { code: "DGVCL", name: "Dakshin Gujarat Vij Company Ltd" },
    { code: "DHBVN", name: "Dakshin Haryana Bijli Vitran Nigam" },
    { code: "ARPDOP", name: "Department of Power Arunachal Pradesh" },
    { code: "NDOP", name: "Department of Power, Nagaland" },
    { code: "DDCL", name: "DNHPower Distribution Company Limited" },
    { code: "GPCL", name: "Gift Power Company Limited" },
    { code: "GOAELC", name: "Goa Electricity" },
    { code: "PGPED", name: "Government of Puducherry Electricity Department" },
    { code: "GG", name: "Gujarat Gas" },
    { code: "HPSEBL", name: "Himachal Pradesh State Electricity Board Ltd" },
    { code: "HESCOM", name: "Hubli Electricity Supply Company Ltd." },
    { code: "IPWB", name: "India Power - WEST BENGAL" },
    { code: "IPCL", name: "India Power Corporation Limited" },
    { code: "IG", name: "Indraprastha Gas" },
    { code: "JKPDD", name: "Jammu & Kashmir power Development department" },
    { code: "JUSCL", name: "Jamshedpur Utilities and Services Company Limited" },
    { code: "JBVNL", name: "JBVNL - JHARKHAND" },
    { code: "KDHPCPL", name: "Kannan Devan Hills Power" },
    { code: "KESCO", name: "Kanpur Electricity Supply Company" },
    { code: "KEDL", name: "KEDL - KOTA" },
    { code: "KSEB", name: "Kerala State Electricity Board Ltd." },
    { code: "LED", name: "Lakshadweep Electricity Department" },
    { code: "MGVCL", name: "Madhya Gujarat Vij Company Ltd" },
    { code: "MPPKVVCLMR", name: "MP Madhya Kshetra Vidyut Vitaran-RURAL" },
    { code: "MPPKVVCL", name: "MP Poorv Kshetra Vidyut Vitaran-URBAN" },
    { code: "MG", name: "Mahanagar Gas" },
    { code: "MESCOMR", name: "Mangalore Electricity Supply Co. Ltd (MESCOM) - RAPDR" },
    { code: "MESCOMNR", name: "Mangalore Electricity Supply Co. Ltd (Non) - RAPDR" },
    { code: "MSPDCLPR", name: "Manipur State Power Distribution Company Limited (Prepaid)" },
    { code: "MEPDCL", name: "MEPDCL - MEGHALAYA" },
    { code: "MKV2", name: "MP Madhya Kshetra Vidyut Vitaran -Urban" },
    { code: "MPPKVVCLPU", name: "MP Poorv Kshetra Vidyut Vitaran - Jabalpur/Rular" },
    { code: "MCG", name: "Municipal Corporation of Gurugram" },
    { code: "MVV", name: "Muzaffarpur Vidyut Vitran" },
    { code: "NESCO", name: "NESCO Odisha" },
    { code: "NDMC", name: "New Delhi Municipal Council (NDMC)" },
    { code: "NDPL", name: "North Delhi Power Limited" },
    { code: "PGVCL", name: "Paschim Gujarat Vij Company Ltd" },
    { code: "PMF", name: "Paul Merchants" },
    { code: "MPED", name: "Power & Electricity Department - Mizoram" },
    { code: "PSPCL", name: "Punjab State Power Corporation Limited" },
    { code: "SPR", name: "Sikkim Power Rural" },
    { code: "SPU", name: "Sikkim Power Urban" },
    { code: "SNDL", name: "SNDL Power - NAGPUR" },
    { code: "SOUTHCO", name: "SOUTHCO Odisha" },
    { code: "TNEB", name: "TNEB - TAMIL NADU" },
    { code: "TORRENTAHM", name: "Torrent Power Ahmedabad" },
    { code: "TORRENTBHI", name: "Torrent Power Bhivandi" },
    { code: "TORRENTDAH", name: "Torrent Power Dahej" },
    { code: "TORRENTSHI", name: "Torrent Power SHIL" },
    { code: "TORRENTSUR", name: "Torrent Power Surat" },
    { code: "TPADL", name: "TP Ajmer Distribution Ltd" },
    { code: "TPCODL", name: "TP Central Odisha Distribution Ltd" },
    { code: "TSECL", name: "Tripura State Electricity Corporation Ltd" },
    { code: "TSNPDCL", name: "TSNPDCL Telangana northern power" },
    { code: "UPPCLU", name: "UPPCL (URBAN) - UTTAR PRADESH" },
    { code: "UPPCLR", name: "Uttar Pradesh Power Corporation Limited(Rural)" },
    { code: "UKPCL", name: "Uttarakhand Power Corporation Limited" },
    { code: "UGVCL", name: "Uttar Gujarat Vij Company Ltd" },
    { code: "UHBV", name: "Uttar Haryana Bijli Vitran Nigam" },
    { code: "WBSEDCL", name: "WBSEDCL - WEST BENGAL" },
    { code: "WESCO", name: "Western Electricity Supply Co. Of Orissa Ltd" },
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
 

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.bgPattern}></div>

      {/* Navbar */}
     <Nav/>

      {/* Hero Section */}
    <Hero/>

      {/* Tabs */}
     <Tab/>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.contentGrid}>
          {/* Recharge Form */}
          <div style={styles.formSection}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <Zap size={24} />
                <div>
                  <h2 style={styles.cardTitle}>Electricity Bill Payment</h2>
                  <p style={styles.cardSubtitle}>
                    Pay your bills for all providers
                  </p>
                </div>
              </div>

              <div style={styles.cardBody}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Consumer Number</label>
                  <input
                    type="text"
                    placeholder="Enter your consumer number"
                    value={formData.consumerNumber}
                    onChange={(e) => setFormData({ ...formData, consumerNumber: e.target.value })}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Select Operator</label>
                <select
                    name="operatorcode"
                    value={formData.operatorcode}
                    onChange={handleChange}
                    className="selectBox"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      fontSize: "15px",
                      color: "black",
                      boxSizing: "border-box",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <option value="">Select Operator</option>
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
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    style={styles.input}
                  />

                  <div style={styles.quickAmounts}>
                    {quickAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setFormData({ ...formData, amount: amt.toString() })}
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
                      Pay Bill
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
                  <p style={styles.cardSubtitle}>Your last 5 payments</p>
                </div>
              </div>

              <div style={styles.cardBody}>
                {transactions.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>⚡</div>
                    <p style={styles.emptyText}>No transactions yet</p>
                    <p style={styles.emptySubtext}>
                      Your electricity payment history will appear here
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


