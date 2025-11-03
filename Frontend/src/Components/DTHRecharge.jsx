import React, { useState, useEffect } from "react";
import { Smartphone, Zap, Clock } from "lucide-react";
import styles from "../styles";
import Nav from "../../hero/nav";
import Hero from "../../hero/hero";
import Tab from "../../hero/Tab";

import PostpaidRecharge from "./PostpaidRecharge"; // etc
import ElectricityRecharge from "./ElectricityRecharge";
import GasRecharge from "./GasRecharge";
import FASTagRecharge from "./FASTagRecharge";
import DataCardRecharge from "./DataCardRecharge";
import InsuranceRecharge from "./InsuranceRecharge";
import GooglePlayRecharge from "./GooglePlayRecharge";
import WaterBillRecharge from "./WaterBillRecharge";


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
  const [dthInfo, setDthInfo] = useState(null);
const [dthPlans, setDthPlans] = useState(null);


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

const fetchDTHInfo = async () => {
    if(!formData.dthNumber || !formData.operatorcode) return alert("Enter DTH number & select operator first");
    const res = await fetch(`${API_URL}/api/dth-info-check?mobile=${formData.dthNumber}&operatorcode=${formData.operatorcode}`);
    const data = await res.json();
    console.log("DTH INFO => ", data);
    setDthInfo(data);
}

const fetchDTHPlans = async () => {
    if(!formData.operatorcode) return alert("select operator first");
    const res = await fetch(`${API_URL}/api/fetch-dth-plans?operatorcode=${formData.operatorcode}`);
    const data = await res.json();
    console.log("DTH PLANS => ", data);
    setDthPlans(data.RDATA?.Combo || []); // only RDATA.Combo pickup
}

const detectDTHOperator = async () => {
  if(formData.dthNumber.length < 6) return;

  const res = await fetch(`${API_URL}/api/dth-operator-info/${formData.dthNumber}`);

  const data = await res.json();

  if(data && data.OperatorCode) {
    setFormData(prev => ({
      ...prev,
      operatorcode: data.OperatorCode
    }))
  }
};


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
       ...(Array.isArray(prev) ? prev : []),
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
          {activeTab === "mobile" && <MobileRecharge />}
  
  {activeTab === "datacard" && <DataCardRecharge />}
  {activeTab === "postpaid" && <PostpaidRecharge />}
  {activeTab === "electricity" && <ElectricityRecharge />}
  {activeTab === "gas" && <GasRecharge />}
  {activeTab === "insurance" && <Insurance />}
  {activeTab === "fastag" && <FASTagRecharge />}
  {activeTab === "google play" && <GooglePlayRecharge />}
  {activeTab === "water bill" && <WaterBill />}
  {activeTab === "landline" && <Landline />}
  {activeTab === "more" && <MoreServices />}
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
 onBlur={detectDTHOperator}  // <-- THIS LINE
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

                  <div style={{ display:"flex", gap:"10px", marginTop:"10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <button type="button" style={styles.quickAmountBtn} onClick={fetchDTHInfo}>Fetch DTH Info</button>
  <button type="button" style={styles.quickAmountBtn} onClick={fetchDTHPlans}>Fetch DTH Plans</button>
</div>


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
                  {/* DTH INFO Result */}
{dthInfo && (
  <div style={{marginTop:"10px", padding:"10px", background:"#eef7ff", borderRadius:"8px"}}>
    <h3 style={{fontWeight:"bold"}}>DTH Info Details</h3>
    <pre style={{whiteSpace:"pre-wrap", fontSize:"14px"}}>
      {JSON.stringify(dthInfo, null, 2)}
    </pre>
  </div>
)}

{/* DTH PLANS Result */}
{dthPlans && dthPlans.length > 0 && (
  <div style={{marginTop:"10px", padding:"10px", background:"#FFF6E0", borderRadius:"8px"}}>
    <h3 style={{fontWeight:"bold"}}>DTH Plans</h3>

    {dthPlans.map((c,i)=>(
      <div key={i} style={{border:"1px solid #ccc", margin:"8px 0", padding:"8px", borderRadius:"6px"}}>
        <p><b>Language:</b> {c.Language}</p>
        <p><b>Total Packs:</b> {c.PackCount}</p>

        {c.Details.map((p,j)=>(
          <div key={j} style={{background:"#fafafa", padding:"8px", marginTop:"6px", borderRadius:"6px"}}>
            <p><b>{p.PlanName}</b></p>
            <p>{p.Channels}</p>
            <p>{p.PaidChannels}</p>
            <p>{p.HdChannels}</p>
            <p><small>Updated: {p.last_update}</small></p>

            <div style={{display:"flex", gap:"6px", flexWrap:"wrap", marginTop:"6px"}}>
              {p.PricingList.map((price,k)=>(
                <div key={k} style={{border:"1px solid #dadada", padding:"6px 8px", borderRadius:"6px"}}>
                  <p>{price.Amount}</p>
                  <small>{price.Month}</small>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ))}

  </div>
)}
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
                    {Array.isArray(transactions) &&transactions.slice(0, 5).map((t, i) => (
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
