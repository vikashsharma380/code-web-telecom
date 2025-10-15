import React, { useState } from "react";

const RechargeHistory = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const allTransactions = [
    {
      id: "RCH001",
      operator: "Airtel",
      number: "9876543210",
      amount: 299,
      profit: 15,
      balance: 5215,
      status: "Success",
      operatorId: "AIR123",
      dateTime: "2025-10-15 14:30:25",
      date: "2025-10-15",
    },
    {
      id: "RCH002",
      operator: "Jio",
      number: "8765432109",
      amount: 499,
      profit: 25,
      balance: 5740,
      status: "Success",
      operatorId: "JIO456",
      dateTime: "2025-10-15 13:15:10",
      date: "2025-10-15",
    },
    {
      id: "RCH003",
      operator: "Vi",
      number: "7654321098",
      amount: 199,
      profit: 10,
      balance: 5939,
      status: "Success",
      operatorId: "VI789",
      dateTime: "2025-10-14 11:45:33",
      date: "2025-10-14",
    },
    {
      id: "RCH004",
      operator: "BSNL",
      number: "9123456789",
      amount: 399,
      profit: 20,
      balance: 6338,
      status: "Success",
      operatorId: "BSN101",
      dateTime: "2025-10-13 09:20:15",
      date: "2025-10-13",
    },
    {
      id: "RCH005",
      operator: "Airtel",
      number: "8912345678",
      amount: 599,
      profit: 30,
      balance: 6937,
      status: "Success",
      operatorId: "AIR124",
      dateTime: "2025-10-12 16:55:42",
      date: "2025-10-12",
    },
  ];

  const handleSubmit = () => {
    if (!fromDate || !toDate) {
      alert("Please select both From Date and To Date");
      return;
    }

    const filtered = allTransactions.filter((txn) => {
      return txn.date >= fromDate && txn.date <= toDate;
    });

    setFilteredTransactions(filtered);
    setShowResults(true);
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
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(52, 152, 219, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(52, 152, 219, 0.4)";
              }}
            >
              Submit
            </button>
          </div>
        </div>

        {showResults && (
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>
                Search Results{" "}
                {filteredTransactions.length > 0 &&
                  `(${filteredTransactions.length})`}
              </h2>
            </div>

            {filteredTransactions.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>🔍</div>
                <p style={styles.emptyText}>No transactions found</p>
                <p style={styles.emptySubtext}>Try adjusting your date range</p>
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
                    {filteredTransactions.map((txn, index) => (
                      <tr
                        key={index}
                        style={{
                          ...styles.tr,
                          background:
                            index % 2 === 0
                              ? "rgba(255, 255, 255, 0.02)"
                              : "transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(102, 126, 234, 0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            index % 2 === 0
                              ? "rgba(255, 255, 255, 0.02)"
                              : "transparent";
                        }}
                      >
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
  );
};

export default RechargeHistory;
