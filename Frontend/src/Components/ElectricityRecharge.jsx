import React, { useState, useEffect } from "react";
import { Zap, Clock, Smartphone } from "lucide-react";
import styles from "../styles";
import Nav from "../../hero/nav";
import Hero from "../../hero/hero";
import Tab from "../../hero/Tab";
import DTHRecharge from "./DTHRecharge"; // adjust the path correctly
import PostpaidRecharge from "./PostpaidRecharge"; // etc

import GasRecharge from "./GasRecharge";
import FASTagRecharge from "./FASTagRecharge";
import DataCardRecharge from "./DataCardRecharge";
import InsuranceRecharge from "./InsuranceRecharge";
import GooglePlayRecharge from "./GooglePlayRecharge";
import WaterBillRecharge from "./WaterBillRecharge";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ElectricityRecharge() {
  const [formData, setFormData] = useState({
    consumerNumber: "",
    operatorcode: "",
    amount: "",
  });
  const [activeTab, setActiveTab] = useState("electricity");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [detecting, setDetecting] = useState(false);
  const [rechargeUser, setRechargeUser] = useState({
    username: "500032",
    pwd: "k0ly9gts",
  });
  const [districtCodes, setDistrictCodes] = useState([]);
  const [billDetails, setBillDetails] = useState(null);

  const fetchDistrictCodes = async () => {
    try {
      const res = await fetch(`${API_URL}/api/electricity-district-code`);
      const data = await res.json();
      console.log("District Codes:", data);
      setDistrictCodes(data);
    } catch (err) {
      console.error("District code fetch failed", err);
    }
  };

  const fetchBillDetails = async () => {
    try {
      if (!formData.billNumber || !formData.operatorcode) {
        alert("Enter Bill Number & Operator first");
        return;
      }

      const res = await fetch(
        `${API_URL}/api/electricity-bill-fetch?bill_number=${
          formData.billNumber
        }&operator_code=${formData.operatorcode}&optional1=${
          formData.optional1 || ""
        }&optional2=${formData.optional2 || ""}&optional3=${
          formData.optional3 || ""
        }`
      );

      const data = await res.json();
      console.log("Bill Fetch:", data);
      setBillDetails(data);
    } catch (err) {
      console.error("Bill fetch failed", err);
    }
  };

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
    { code: "MKV", name: "Madhya Kshetra Vitaran - MADHYA PRADESH" },
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
    {
      code: "BMESTU",
      name: "Brihan Mumbai Electric Supply and Transport Undertaking",
    },
    {
      code: "APCPDCL",
      name: "Central Power Distribution Company of Andhra Pradesh Ltd",
    },
    {
      code: "CESCOM",
      name: "Chamundeshwari Electricity Supply Corporation Ltd. (Cesc,Mysore)",
    },
    {
      code: "CSPDCL",
      name: "Chhattisgarh State Power Distribution Company Ltd. (CSPDCL)",
    },
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
    { code: "HESCOM", name: "Hubli Electricity Supply Company Ltd. (HESCOM)" },
    { code: "IPWB", name: "India Power - WEST BENGAL" },
    { code: "IPCL", name: "India Power Corporation Limited" },
    { code: "IG", name: "Indraprastha Gas" },
    { code: "JKPDD", name: "Jammu & Kashmir power Development department" },
    {
      code: "JUSCL",
      name: "Jamshedpur Utilities and Services Company Limited",
    },
    { code: "JBVNL", name: "JBVNL - JHARKHAND" },
    { code: "KDHPCPL", name: "kannan devan hills power" },
    { code: "KESCO", name: "Kanpur Electricity Supply Company" },
    { code: "KEDL", name: "KEDL - KOTA" },
    { code: "KSEB", name: "Kerala State Electricity Board Ltd." },
    { code: "LED", name: "Lakshadweep Electricity Department" },
    { code: "MGVCL", name: "Madhya Gujarat Vij Company Ltd" },
    {
      code: "MPPKVVCLMR",
      name: "Madhya Pradesh Madhya Kshetra Vidyut Vitaran-RURAL",
    },
    {
      code: "MPPKVVCL",
      name: "Madhya Pradesh Poorv Kshetra Vidyut Vitaran-URBAN",
    },
    { code: "MG", name: "Mahanagar Gas" },
    {
      code: "MESCOMR",
      name: "Mangalore Electricity Supply Co. Ltd (MESCOM) - RAPDR",
    },
    {
      code: "MESCOMNR",
      name: "Mangalore Electricity Supply Co. Ltd (Non) - RAPDR",
    },
    {
      code: "MSPDCLPR",
      name: "Manipur State Power Distribution Company Limited (Prepaid)",
    },
    { code: "MEPDCL", name: "MEPDCL - MEGHALAYA" },
    { code: "MPPKVVCLPU", name: "MP Poorv Kshetra Vidyut Vitaran - Jabalpur" },
    { code: "MCG", name: "MUNICIPAL CORPORATION OF GURUGRAM" },
    { code: "MVV", name: "Muzaffarpur Vidyut Vitran" },
    { code: "NESCO", name: "NESCO Odisha" },
    { code: "NDMC", name: "New Delhi Municipal Council (NDMC) - Electricity" },
    { code: "NDPL", name: "North Delhi Power Limited" },
    { code: "PGVCL", name: "Paschim Gujarat Vij Company Ltd" },
    { code: "PMF", name: "Paul Merchants" },
    { code: "MPED", name: "Power & Electricity Department - Mizoram" },
    { code: "PSPCL", name: "Punjab State Power Corporation Limted" },
    { code: "SPR", name: "Sikkim Power Rural" },
    { code: "SPU", name: "Sikkim Power Urban" },
    { code: "SNDL", name: "SNDL Power - NAGPUR" },
    { code: "SOUTHCO", name: "SOUTHCO Odisha" },
    { code: "TNEB", name: "TNEB - TAMIL NADU" },
    { code: "TORRENTAHM", name: "Torrent Power Ahemdabad" },
    { code: "TORRENTBHI", name: "Torrent Power Bhivandi" },
    { code: "TORRENTDAH", name: "Torrent Power Dahej" },
    { code: "TORRENTSHI", name: "Torrent Power SHIL" },
    { code: "TORRENTSUR", name: "Torrent Power Surat" },
    { code: "TPADL", name: "TP Ajmer Distribution Ltd" },
    { code: "TPCODL", name: "TP central odisha distribution limited" },
    { code: "TSECL", name: "Tripura State Electricity Corporation Ltd" },
    { code: "TSNPDCL", name: "TSNPDCL Telangana northern power" },
    { code: "UPPCLU", name: "UPPCL (URBAN) - UTTAR PRADESH" },
    { code: "UPPCLR", name: "Uttar Pradesh Power Corporation Limited(Rular)" },
    { code: "UKPCL", name: "Uttarakhand Power Corporation Limited" },
    { code: "UGVCL", name: "Uttar Gujarat Vij Company Ltd" },
    { code: "UHBV", name: "Uttar Haryana Bijli Vitran Nigam" },
    { code: "WBSEDCL", name: "WBSEDCL - WEST BENGAL" },
    { code: "WESCO", name: "Western Electricity supply co. Of Orissa Ltd." },
  ];

  const quickAmounts = [100, 200, 500, 1000, 2000];

  // === Handle input changes ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // === Auto-detect operator based on number ===
  useEffect(() => {
    const detectOperator = async () => {
      if (formData.consumerNumber.length === 10) {
        setDetecting(true);
        try {
          const res = await fetch(
            `${API_URL}/api/lookup?number=${formData.consumerNumber}`
          );
          const data = await res.json();
          if (data.operatorcode)
            setFormData((prev) => ({
              ...prev,
              operatorcode: data.operatorcode,
            }));
        } catch (error) {
          console.warn("Auto-detect failed", error);
        } finally {
          setDetecting(false);
        }
      }
    };
    detectOperator();
  }, [formData.consumerNumber]);

  // === Fetch transactions ===
  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${API_URL}/api/transactions`);
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

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
  // === Handle recharge ===
  const handleRecharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const { consumerNumber, operatorcode, amount } = formData;
      if (!consumerNumber || !operatorcode || !amount)
        throw new Error("All fields are required");

      const payload = {
        username: rechargeUser.username,
        pwd: rechargeUser.pwd,
        number: consumerNumber,
        operatorcode,
        amount,
        circlecode: "1",
      };
      console.log("Sending recharge request:", payload);
      const res = await fetch(`${API_URL}/api/recharge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ye zaruri hai
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.status === "Success") {
        setResult({
          type: "success",
          message: `Recharge Successful! TXID: ${data.txid}`,
        });
      } else {
        setResult({
          type: "error",
          message: `Recharge Failed: ${data.opid || "Unknown"}`,
        });
      }

      // Update transactions
      setTransactions((prev) => [
        {
          txid: data.txid || Math.random(),
          operator: operatorcode,
          number: consumerNumber,
          amount,
          status: data.status,
          date: new Date().toLocaleString(),
        },
        ...(Array.isArray(prev) ? prev : []),
      ]);

      // Reset form
      setFormData({ consumerNumber: "", operatorcode: "", amount: "" });
    } catch (error) {
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
      <Nav />
      <Hero
        title="Instant Electricity Recharge"
        subtitle="Fast, secure, and reliable electricity recharges for all operators"
      />
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={styles.mainContent}>
        {activeTab === "mobile" && <MobileRecharge />}
        {activeTab === "dth" && <DTHRecharge />}
        {activeTab === "datacard" && <DataCardRecharge />}
        {activeTab === "postpaid" && <PostpaidRecharge />}

        {activeTab === "gas" && <GasRecharge />}
        {activeTab === "insurance" && <Insurance />}
        {activeTab === "fastag" && <FASTagRecharge />}
        {activeTab === "google play" && <GooglePlayRecharge />}
        {activeTab === "water bill" && <WaterBill />}
        {activeTab === "landline" && <Landline />}
        {activeTab === "more" && <MoreServices />}
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
                <form onSubmit={handleRecharge}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Consumer Number</label>
                    <input
                      type="text"
                      name="consumerNumber"
                      value={formData.consumerNumber}
                      onChange={handleChange}
                      placeholder="Enter your consumer number"
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
                      <option value="">Choose your operator</option>
                      {operators.map((op) => (
                        <option key={op.code} value={op.code}>
                          {op.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Amount</label>
                    <input
                      type="text"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="Enter amount"
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
                        {" "}
                        <Zap size={20} /> Pay Bill{" "}
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

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "10px 0",
              }}
            >
              <button
                type="button"
                onClick={fetchDistrictCodes}
                style={styles.quickAmountBtn}
              >
                Fetch District Codes
              </button>
              <button
                type="button"
                onClick={fetchBillDetails}
                style={styles.quickAmountBtn}
              >
                Fetch Bill
              </button>
            </div>
          </div>

          {districtCodes.length > 0 && (
            <div style={{ marginTop: "15px" }}>
              <h3>Available District Codes</h3>
              <ul>
                {districtCodes.map((d, i) => (
                  <li key={i}>{d.DistrictCode}</li>
                ))}
              </ul>
            </div>
          )}

          {billDetails && billDetails.BILLDEATILS && (
            <div
              style={{
                marginTop: "15px",
                background: "#eef7ff",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #cce5ff",
              }}
            >
              <h3>Bill Details</h3>
              <p>
                <b>Name:</b> {billDetails.BILLDEATILS.Name}
              </p>
              <p>
                <b>Due Amount:</b> ₹{billDetails.BILLDEATILS.DueAmount}
              </p>
              <p>
                <b>Due Date:</b> {billDetails.BILLDEATILS.DueDate}
              </p>
              <p>
                <b>Bill Period:</b>{" "}
                {billDetails.BILLDEATILS.BillPeriod || "N/A"}
              </p>
            </div>
          )}

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
                    {Array.isArray(transactions) &&
                      transactions.slice(0, 5).map((t, i) => (
                        <div
                          key={`${t.txid}-${i}`}
                          style={styles.transactionItem}
                        >
                          <div style={styles.transactionIcon}>
                            {t.operator.charAt(0)}
                          </div>
                          <div style={styles.transactionDetails}>
                            <div style={styles.transactionOperator}>
                              {t.operator}
                            </div>
                            <div style={styles.transactionNumber}>
                              {t.number}
                            </div>
                            <div style={styles.transactionDate}>{t.date}</div>
                          </div>
                          <div style={styles.transactionRight}>
                            <div style={styles.transactionAmount}>
                              ₹{t.amount}
                            </div>
                            <div style={styles.transactionStatus}>
                              {t.status}
                            </div>
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

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © 2025 <span style={styles.footerBrand}>Code Web Telecom</span> - All
          Rights Reserved
        </p>
      </footer>
    </div>
  );
}
