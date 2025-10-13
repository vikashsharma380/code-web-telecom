import React, { useState,useEffect } from "react";
import { Smartphone, Zap, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function DataCardRecharge() {
  const [dataCardNumber, setDataCardNumber] = useState("");
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
            {/* <a href="#" style={styles.navLink}>
              Dashboard
            </a> */}{" "}
            <Link to="/dashboard" style={styles.navLink}>
              Dashboard
            </Link>
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

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroLeft}>
            <div style={styles.welcomeBadge}>
              <Zap size={16} />
              <span>Welcome back, Vikash!</span>
            </div>
            <h1 style={styles.heroTitle}>Data Card Recharge</h1>
            <p style={styles.heroSubtitle}>
              Fast, secure, and reliable Data Card recharge for all operators
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
                  <h2 style={styles.cardTitle}>Data Card Recharge</h2>
                  <p style={styles.cardSubtitle}>
                    Recharge your Data Card easily
                  </p>
                </div>
              </div>
              <div style={styles.cardBody}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Data Card Number</label>
                  <input
                    type="text"
                    placeholder="Enter your Data Card number"
                    value={dataCardNumber}
                    onChange={(e) => setDataCardNumber(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Operator</label>
                  <select
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                    style={styles.select}
                  >
                    <option value="">Select operator</option>
                    <option value="Jio">Jio</option>
                    <option value="Airtel">Airtel</option>
                    <option value="BSNL">BSNL</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Amount</label>
                  <input
                    type="text"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={handleChange} 
                    style={styles.input}
                  />
                  <div style={styles.quickAmounts}>
                    {quickAmounts.map((a) => (
                      <button
                        key={a}
                        onClick={() => setAmount(a.toString())}
                        style={styles.quickAmountBtn}
                      >
                        ₹{a}
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
                      <Zap size={20} /> Recharge Now
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
                    <p style={styles.emptySubtext}>
                      Your Data Card recharge history will appear here
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
    color: "gray",
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
