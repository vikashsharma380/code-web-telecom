import React, { useState } from "react";
import { Zap, Clock, TrendingUp, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "../styles";
import Nav from "../../hero/nav";
import Hero from "../../hero/hero";
import Tab from "../../hero/Tab";

export default function ElectricityRecharge() {
  const [consumerNumber, setConsumerNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("electricity");

  const quickAmounts = [100, 200, 500, 1000, 2000];

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && parseInt(value) > 0)) {
      setAmount(value);
    }
  };

  const handleRecharge = () => {
    if (!consumerNumber || !operator || !amount) {
      setResult({ type: "error", message: "Please fill all fields!" });
      return;
    }

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setLoading(false);
      setResult({ type: "success", message: "Payment successful!" });

      const newTransaction = {
        txid: `TX${Date.now()}`,
        operator,
        number: consumerNumber,
        operatorId: operator.toUpperCase(),
        amount,
        status: "Success",
        date: new Date().toLocaleString(),
      };

      setTransactions([newTransaction, ...transactions]);
      setConsumerNumber("");
      setOperator("");
      setAmount("");

      setTimeout(() => setResult(null), 5000);
    }, 1500);
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
                    value={consumerNumber}
                    onChange={(e) => setConsumerNumber(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Select Operator</label>
                  <select
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                    style={styles.select}
                  >
                    <option value="">Select Operator</option>
                    <option value="BSES Rajdhani">BSES Rajdhani</option>
                    <option value="BSES Yamuna">BSES Yamuna</option>
                    <option value="Tata Power Delhi">Tata Power Delhi</option>
                    <option value="Reliance Energy">Reliance Energy</option>
                    <option value="MSEB Maharashtra">MSEB Maharashtra</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Amount</label>
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


