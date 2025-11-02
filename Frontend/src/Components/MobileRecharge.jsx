import React, { useState, useEffect } from "react";
import { Smartphone, Zap } from "lucide-react";
import styles from "../styles";
import Nav from "../../hero/nav";
import Hero from "../../hero/hero";
import Tab from "../../hero/Tab";
import DTHRecharge from "./DTHRecharge";
import PostpaidRecharge from "./PostpaidRecharge";
import ElectricityRecharge from "./ElectricityRecharge";
import GasRecharge from "./GasRecharge";
import FASTagRecharge from "./FASTagRecharge";
import DataCardRecharge from "./DataCardRecharge";
import InsuranceRecharge from "./InsuranceRecharge";
import GooglePlayRecharge from "./GooglePlayRecharge";
import WaterBillRecharge from "./WaterBillRecharge";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ✅ Separated MobileRechargeForm to avoid recursion
function MobileRechargeForm({ rechargeUser }) {
  const [formData, setFormData] = useState({
    number: "",
    operatorcode: "",
    circlecode: "",
    amount: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [balance, setBalance] = useState(0);


  const fetchSimplePlan = async () => {
  const res = await fetch(
    "https://code-web-telecom-production.up.railway.app/api/simple-plan?circle=Gujarat&operator=Jio"
  );
  const data = await res.json();
  console.log(data);
};


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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setFormData((prev) => ({ ...prev, amount: value }));
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${API_URL}/api/transactions`);
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  };

  const fetchBalance = async () => {
    try {
      const { username, pwd } = rechargeUser;
      if (!username || !pwd) return;
      const res = await fetch(
        `${API_URL}/api/balance?username=${encodeURIComponent(
          username
        )}&pwd=${encodeURIComponent(pwd)}`
      );
      const data = await res.json();
      if (data.success) setBalance(data.balance);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchBalance();
  }, [rechargeUser]);

  const handleRecharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const token = localStorage.getItem("token");
      const { number, operatorcode, circlecode, amount } = formData;
      if (!number || !operatorcode || !circlecode || !amount)
        throw new Error("All fields are required");

      const res = await fetch(`${API_URL}/api/recharge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: rechargeUser.username,
          pwd: rechargeUser.pwd,
          number,
          operatorcode,
          circlecode,
          amount,
        }),
      });

      const data = await res.json();
     console.log(data);

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

      setTransactions([
        {
          rechargeId: data.txid || Math.random(),
          operator: operatorcode,
          operatorId: data.opid || operatorcode,
          number,
          amount,
          profit: data.profit || 0,
          balance: data.balance || balance,
          status: data.status,
          dateTime: new Date().toISOString(),
        },
        ...(Array.isArray(transactions) ? transactions : []),
      ]);

      setFormData({ number: "", operatorcode: "", circlecode: "", amount: "" });
    } catch (err) {
      console.error(err);
      setResult({ type: "error", message: err.message || "API Error" });
    } finally {
      setLoading(false);
      setTimeout(() => setResult(null), 5000);
    }
  };

  return (
    <div style={styles.contentGrid}>
      <div style={styles.formSection}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <Smartphone size={24} />
            <div>
              <h2 style={styles.cardTitle}>Mobile Recharge</h2>
              <p style={styles.cardSubtitle}>Recharge for all mobile operators</p>
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
  onChange={async (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, number: value }));

    if (value.length === 10) {
      try {
       const res = await fetch(`${API_URL}/api/operator-info/${value}`);

        const data = await res.json();

        if (data.Operator && data.Circle) {
          // find matching operator code from list
          const operatorMatch = operators.find((op) =>
            data.Operator.toLowerCase().includes(op.name.toLowerCase())
          );
          const circleMatch = circles.find((c) =>
            data.Circle.toLowerCase().includes(c.name.toLowerCase())
          );

          setFormData((prev) => ({
            ...prev,
            operatorcode: operatorMatch ? operatorMatch.code : "",
            circlecode: circleMatch ? circleMatch.code : "",
          }));
        }
      } catch (err) {
        console.error("Operator fetch failed", err);
      }
    }
  }}
  maxLength="10"
  style={styles.input}
/>

              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Operator</label>
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
                <label style={styles.label}>Circle</label>
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
                <div style={{ marginTop: "10px" }}>
  <button
    type="button"
    onClick={async () => {
      try {
        const circleName = circles.find(c => c.code === formData.circlecode)?.name;
        const operatorName = operators.find(o => o.code === formData.operatorcode)?.name;

        if (!circleName || !operatorName) {
          alert("Please select operator and circle first");
          return;
        }

        const res = await fetch(
          `https://code-web-telecom-production.up.railway.app/api/simple-plan?circle=${circleName}&operator=${operatorName}`
        );
        const data = await res.json();
        console.log("Fetched Plans:", data);
        alert(`Plans fetched for ${operatorName} (${circleName}) — Check console`);
      } catch (err) {
        console.error("Plan fetch failed", err);
      }
    }}
    style={{
      padding: "10px 15px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "500",
    }}
  >
    Show Plans
  </button>
</div>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Amount</label>
                <input
                  type="text"
                  name="amount"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleAmountChange}
                  style={styles.input}
                />
                <div style={styles.quickAmounts}>
                  {quickAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, amount: amt.toString() }))
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
                {loading ? <div style={styles.loadingSpinner}></div> : <><Zap size={20} /> Recharge Now</>}
              </button>
              {result && (
                <div
                  style={{
                    ...styles.resultBox,
                    ...(result.type === "success" ? styles.successBox : styles.errorBox),
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
      <div style={styles.transactionList}>
        {Array.isArray(transactions) &&transactions.slice(0, 5).map((t, i) => (
          <div key={`${t.rechargeId}-${t.number}-${i}`} style={styles.transactionItem}>
            <div style={styles.transactionIcon}>{t.operator.charAt(0)}</div>
            <div style={styles.transactionDetails}>
              <div style={styles.transactionOperator}>
                {t.operator} (ID: {t.operatorId})
              </div>
              <div style={styles.transactionNumber}>{t.number}</div>
              <div style={styles.transactionDate}>
                {new Date(t.dateTime).toLocaleString()}
              </div>
            </div>
            <div style={styles.transactionRight}>
              <div style={styles.transactionAmount}>₹{t.amount}</div>
              <div style={styles.transactionProfit}>Profit: ₹{t.profit}</div>
              <div style={styles.transactionBalance}>Balance: ₹{t.balance}</div>
              <div style={styles.transactionStatus}>{t.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ✅ Main Component
export default function MobileRecharge() {
  const [activeTab, setActiveTab] = useState("mobile");
  const [rechargeUser, setRechargeUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setRechargeUser({ username: u.userId, pwd: u.apiPassword });
    }
  }, []);

  return (
    <div style={styles.container}>
      <Nav />
      <Hero title="Instant Mobile Recharge" subtitle="Fast, secure, and reliable mobile recharges for all operators" />
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tabs */}
      {activeTab === "mobile" && <MobileRechargeForm rechargeUser={rechargeUser} />}
      {activeTab === "dth" && <DTHRecharge />}
      {activeTab === "datacard" && <DataCardRecharge />}
      {activeTab === "postpaid" && <PostpaidRecharge />}
      {activeTab === "electricity" && <ElectricityRecharge />}
      {activeTab === "gas" && <GasRecharge />}
      {activeTab === "insurance" && <InsuranceRecharge />}
      {activeTab === "fastag" && <FASTagRecharge />}
      {activeTab === "google play" && <GooglePlayRecharge />}
      {activeTab === "water bill" && <WaterBillRecharge />}

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © 2025 <span style={styles.footerBrand}>CodeWeb Telecom</span> - All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
