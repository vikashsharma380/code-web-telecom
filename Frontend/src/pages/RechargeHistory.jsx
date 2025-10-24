import React, { useState } from "react";
import Nav from "../../hero/nav";

const RechargeHistory = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = async () => {
    if (!fromDate || !toDate) {
      alert("Please select both From Date and To Date");
      return;
    }

    setLoading(true);

    try {
    const token = localStorage.getItem("token"); // ya jahan bhi store ho

const response = await fetch(
  `http://localhost:5000/api/recharges?from=${fromDate}&to=${toDate}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ Add this
    },
  }
);      const data = await response.json();
console.log(data);
      if (data.success) {
        setTransactions(data.transactions || []);
      } else {
        setTransactions([]);
        alert("Failed to fetch transactions");
      }

      setShowResults(true);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      alert("Error fetching transactions");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #1e1e2e 0%, #2d1b69 50%, #1e1e2e 100%)",
      position: "relative",
      overflow: "hidden",
      padding: "40px 20px",
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
    content: {
      position: "relative",
      maxWidth: "1400px",
      margin: "0 auto",
    },
    header: {
      marginBottom: "32px",
    },
    title: {
      fontSize: "36px",
      fontWeight: "800",
      color: "white",
      margin: "0 0 8px 0",
      letterSpacing: "-1px",
    },
    subtitle: {
      fontSize: "16px",
      color: "rgba(255, 255, 255, 0.6)",
      margin: 0,
    },
    filterCard: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "24px",
      padding: "32px",
      marginBottom: "32px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    },
    filterHeader: {
      background: "rgba(52, 152, 219, 0.15)",
      padding: "16px 24px",
      borderRadius: "16px",
      marginBottom: "24px",
    },
    filterTitle: {
      fontSize: "18px",
      fontWeight: "700",
      color: "white",
      margin: 0,
    },
    filterForm: {
      display: "flex",
      alignItems: "end",
      gap: "24px",
      flexWrap: "wrap",
    },
    formGroup: {
      flex: "1",
      minWidth: "200px",
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
      background: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      borderRadius: "12px",
      fontSize: "15px",
      color: "white",
      boxSizing: "border-box",
      transition: "all 0.3s ease",
    },
    submitBtn: {
      padding: "14px 32px",
      background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
      border: "none",
      borderRadius: "12px",
      color: "white",
      fontSize: "16px",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: "0 8px 24px rgba(52, 152, 219, 0.4)",
      transition: "all 0.3s ease",
      whiteSpace: "nowrap",
    },
    card: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "24px",
      overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    },
    cardHeader: {
      padding: "24px 32px",
      background: "rgba(102, 126, 234, 0.1)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    },
    cardTitle: {
      fontSize: "20px",
      fontWeight: "700",
      color: "white",
      margin: 0,
    },
    tableWrapper: {
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    thead: {
      background: "rgba(255, 255, 255, 0.03)",
    },
    th: {
      padding: "16px 24px",
      textAlign: "left",
      fontSize: "13px",
      fontWeight: "700",
      color: "#a5b4fc",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      whiteSpace: "nowrap",
    },
    td: {
      padding: "20px 24px",
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.8)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    },
    tr: {
      transition: "all 0.3s ease",
    },
    operatorCell: {
      fontWeight: "600",
      color: "white",
    },
    amountCell: {
      fontWeight: "700",
      color: "white",
      fontSize: "15px",
    },
    profitCell: {
      fontWeight: "600",
      color: "#6ee7b7",
    },
    balanceCell: {
      fontWeight: "700",
      color: "#a5b4fc",
      fontSize: "15px",
    },
    statusBadge: {
      display: "inline-flex",
      alignItems: "center",
      padding: "6px 12px",
      borderRadius: "8px",
      fontSize: "12px",
      fontWeight: "600",
      background: "rgba(16, 185, 129, 0.2)",
      border: "1px solid rgba(16, 185, 129, 0.3)",
      color: "#6ee7b7",
    },
    emptyState: {
      padding: "80px 24px",
      textAlign: "center",
    },
    emptyIcon: {
      fontSize: "64px",
      marginBottom: "16px",
    },
    emptyText: {
      fontSize: "18px",
      fontWeight: "600",
      color: "rgba(255, 255, 255, 0.7)",
      margin: "0 0 8px 0",
    },
    emptySubtext: {
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.4)",
      margin: 0,
    },
  };

 return (
    <>
      <Nav />
      <div style={styles.container}>
        <div style={styles.bgPattern} />
        <div style={styles.content}>
          <div style={styles.header}>
            <h1 style={styles.title}>Recharge History</h1>
            <p style={styles.subtitle}>
              Search and view your recharge transaction history
            </p>
          </div>

          <div style={styles.filterCard}>
            <div style={styles.filterHeader}>
              <h2 style={styles.filterTitle}>Filter Transactions</h2>
            </div>
            <div style={styles.filterForm}>
              <div style={styles.formGroup}>
                <label style={styles.label}>From Date:</label>
                <input
                  type="date"
                  style={styles.input}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>To Date:</label>
                <input
                  type="date"
                  style={styles.input}
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
              <button
                style={styles.submitBtn}
                onClick={handleSubmit}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>

          {showResults && (
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>
                  Search Results{" "}
                  {transactions.length > 0 && `(${transactions.length})`}
                </h2>
              </div>

              {transactions.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>🔍</div>
                  <p style={styles.emptyText}>No transactions found</p>
                  <p style={styles.emptySubtext}>
                    Try adjusting your date range
                  </p>
                </div>
              ) : (
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead style={styles.thead}>
                      <tr>
                        <th style={styles.th}>Recharge ID</th>
                        <th style={styles.th}>Operator</th>
                        <th style={styles.th}>Number</th>
                        <th style={styles.th}>Amount</th>
                        <th style={styles.th}>Profit</th>
                        <th style={styles.th}>Balance</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Operator ID</th>
                        <th style={styles.th}>Date Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((txn, index) => (
                        <tr key={txn.id} style={{ ...styles.tr }}>
                          <td style={styles.td}>{txn.id}</td>
                          <td style={{ ...styles.td, ...styles.operatorCell }}>
                            {txn.operator}
                          </td>
                          <td style={styles.td}>{txn.number}</td>
                          <td style={{ ...styles.td, ...styles.amountCell }}>
                            ₹{txn.amount}
                          </td>
                          <td style={{ ...styles.td, ...styles.profitCell }}>
                            ₹{txn.profit}
                          </td>
                          <td style={{ ...styles.td, ...styles.balanceCell }}>
                            ₹{txn.balance}
                          </td>
                          <td style={styles.td}>
                            <span style={styles.statusBadge}>{txn.status}</span>
                          </td>
                          <td style={styles.td}>{txn.operatorId}</td>
                          <td style={styles.td}>{txn.dateTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default RechargeHistory;
