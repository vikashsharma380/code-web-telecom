import React, { useState } from "react";

const DistributorPanel = () => {
  const [stats] = useState({
    totalSuccess: 0,
    totalFailure: 0,
    totalPending: 0,
    walletTopup: 0,
    openingBalance: 0,
    rechargeDebit: 0,
    refundCredit: 0,
    revert: 0,
  });

  const [operatorReports] = useState([
    // Sample data - replace with actual API data
  ]);

  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    heroSection: {
      padding: "3rem 2rem",
    },
    heroContent: {
      maxWidth: "1400px",
      margin: "0 auto",
    },
    greetingSection: {
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(10px)",
      borderRadius: "12px",
      padding: "2rem",
      color: "white",
      marginBottom: "2rem",
    },
    greeting: {
      margin: "0 0 1.5rem 0",
      fontSize: "2rem",
      fontWeight: "600",
    },
    balanceInfo: {
      display: "flex",
      gap: "3rem",
      flexWrap: "wrap",
      alignItems: "center",
    },
    balanceItem: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    balanceLabel: {
      fontSize: "0.875rem",
      opacity: "0.9",
    },
    balanceAmount: {
      fontSize: "1.75rem",
      fontWeight: "700",
    },
    actionBtn: {
      background: "white",
      color: "#667eea",
      border: "2px solid white",
      padding: "0.75rem 1.5rem",
      borderRadius: "8px",
      fontSize: "0.875rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    },
    statsGrid: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "0 2rem 2rem 2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem",
    },
    statCard: {
      background: "white",
      borderRadius: "12px",
      padding: "2rem",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    statIcon: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.5rem",
      marginBottom: "1rem",
      fontWeight: "bold",
    },
    successCard: { borderLeft: "4px solid #48bb78" },
    successIcon: { background: "#c6f6d5", color: "#48bb78" },
    failureCard: { borderLeft: "4px solid #f56565" },
    failureIcon: { background: "#fed7d7", color: "#f56565" },
    pendingCard: { borderLeft: "4px solid #ed8936" },
    pendingIcon: { background: "#feebc8", color: "#ed8936" },
    purchaseCard: { borderLeft: "4px solid #667eea" },
    purchaseIcon: { background: "#e9d8fd", color: "#667eea" },
    statTitle: {
      margin: "0 0 0.5rem 0",
      fontSize: "1rem",
      color: "#718096",
      fontWeight: "500",
    },
    statNumber: {
      margin: 0,
      fontSize: "2rem",
      color: "#2d3748",
      fontWeight: "700",
    },
    dataSection: {
      maxWidth: "1400px",
      margin: "0 auto 2rem auto",
      padding: "0 2rem",
    },
    sectionHeader: {
      background: "white",
      borderRadius: "12px 12px 0 0",
      padding: "1.5rem",
      borderBottom: "2px solid #e2e8f0",
    },
    sectionTitle: {
      margin: 0,
      fontSize: "1.25rem",
      color: "#2d3748",
      fontWeight: "600",
    },
    tableContainer: {
      background: "white",
      overflowX: "auto",
      borderRadius: "0 0 12px 12px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    thead: {
      background: "#f7fafc",
    },
    th: {
      padding: "1rem",
      textAlign: "left",
      fontSize: "0.875rem",
      color: "#4a5568",
      fontWeight: "600",
      borderBottom: "2px solid #e2e8f0",
    },
    tr: {
      borderBottom: "1px solid #e2e8f0",
      transition: "all 0.2s ease",
    },
    td: {
      padding: "1rem",
      fontSize: "0.875rem",
      color: "#2d3748",
    },
    emptyRow: {
      textAlign: "center",
      padding: "3rem 1rem",
      color: "#a0aec0",
      fontSize: "0.875rem",
    },
  };

  const statsData = [
    {
      title: "Total Success",
      value: stats.totalSuccess,
      cardStyle: styles.successCard,
      iconStyle: styles.successIcon,
      icon: "✓",
    },
    {
      title: "Total Failure",
      value: stats.totalFailure,
      cardStyle: styles.failureCard,
      iconStyle: styles.failureIcon,
      icon: "✕",
    },
    {
      title: "Total Pending",
      value: stats.totalPending,
      cardStyle: styles.pendingCard,
      iconStyle: styles.pendingIcon,
      icon: "⏱",
    },
    {
      title: "Wallet Topup",
      value: stats.walletTopup,
      cardStyle: styles.purchaseCard,
      iconStyle: styles.purchaseIcon,
      icon: "₹",
    },
    {
      title: "Opening Balance",
      value: stats.openingBalance,
      cardStyle: styles.successCard,
      iconStyle: styles.successIcon,
      icon: "💰",
    },
    {
      title: "Recharge Debit",
      value: stats.rechargeDebit,
      cardStyle: styles.failureCard,
      iconStyle: styles.failureIcon,
      icon: "↓",
    },
    {
      title: "Refund Credit",
      value: stats.refundCredit,
      cardStyle: styles.successCard,
      iconStyle: styles.successIcon,
      icon: "↑",
    },
    {
      title: "Revert",
      value: stats.revert,
      cardStyle: styles.pendingCard,
      iconStyle: styles.pendingIcon,
      icon: "↺",
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.greetingSection}>
            <h1 style={styles.greeting}>Hi, DEMO DISTRIBUTOR</h1>
            <div style={styles.balanceInfo}>
              <div style={styles.balanceItem}>
                <span style={styles.balanceLabel}>Current Balance</span>
                <span style={styles.balanceAmount}>
                  ₹ {stats.openingBalance.toFixed(2)}
                </span>
              </div>
              <button
                style={styles.actionBtn}
                onMouseEnter={(e) => {
                  e.target.style.background = "#667eea";
                  e.target.style.color = "white";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "white";
                  e.target.style.color = "#667eea";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
                }}
              >
                Add Fund
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.statsGrid}>
        {statsData.map((stat, index) => (
          <div
            key={index}
            style={{ ...styles.statCard, ...stat.cardStyle }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
            }}
          >
            <div style={{ ...styles.statIcon, ...stat.iconStyle }}>
              {stat.icon}
            </div>
            <p style={styles.statTitle}>{stat.title}</p>
            <h2 style={styles.statNumber}>{stat.value}</h2>
          </div>
        ))}
      </div>

      <div style={styles.dataSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Todays Operator Report</h2>
        </div>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>Company</th>
                <th style={styles.th}>Total Success</th>
              </tr>
            </thead>
            <tbody>
              {operatorReports.length === 0 ? (
                <tr>
                  <td colSpan="2" style={styles.emptyRow}>
                    No operator reports available for today
                  </td>
                </tr>
              ) : (
                operatorReports.map((report, index) => (
                  <tr
                    key={index}
                    style={styles.tr}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f7fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "white";
                    }}
                  >
                    <td style={styles.td}>{report.company}</td>
                    <td style={styles.td}>{report.totalSuccess}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DistributorPanel;
