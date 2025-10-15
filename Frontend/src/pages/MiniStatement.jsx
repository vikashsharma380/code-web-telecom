import React, { useState } from "react";
import Nav from "../../hero/nav";
const MiniStatement = () => {
  const [transactions] = useState([
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
      dateTime: "2025-10-15 11:45:33",
    },
  ]);

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
      <Nav />;
      <div style={styles.container}>
        <div style={styles.bgPattern} />
        <div style={styles.content}>
          <div style={styles.header}>
            <h1 style={styles.title}>Mini Statement</h1>
            <p style={styles.subtitle}>
              View your recent recharge transactions
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Recent Transactions</h2>
            </div>

            {transactions.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📊</div>
                <p style={styles.emptyText}>No transactions yet</p>
                <p style={styles.emptySubtext}>
                  Your transaction history will appear here
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
        </div>
      </div>{" "}
    </>
  );
};

export default MiniStatement;
