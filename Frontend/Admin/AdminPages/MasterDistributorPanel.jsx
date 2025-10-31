import React from "react";

const MasterDistributorPanel = ({ dealer, onBack }) => {
  const styles = {
    dashboardContainer: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
      fontFamily: "Arial, sans-serif",
    },
    dashboardHeader: {
      background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
      color: "white",
      padding: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    headerLeft: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    headerRight: {
      display: "flex",
      gap: "15px",
      alignItems: "center",
    },
    addFundBtn: {
      background: "#f59e0b",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s",
    },
    balanceText: {
      fontSize: "16px",
      fontWeight: "600",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      padding: "20px",
    },
    statCard: {
      background: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
    statHeader: {
      background: "rgba(59, 130, 246, 0.8)",
      color: "white",
      padding: "15px",
      fontSize: "16px",
      fontWeight: "600",
      textAlign: "center",
    },
    statValue: {
      background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      color: "white",
      padding: "30px",
      fontSize: "48px",
      fontWeight: "bold",
      textAlign: "center",
    },
    reportSection: {
      background: "white",
      margin: "20px",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    reportHeader: {
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "20px",
      color: "#333",
    },
    reportTable: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      background: "#f8f9fa",
      padding: "12px",
      textAlign: "left",
      fontWeight: "600",
      fontSize: "14px",
      color: "#333",
      borderBottom: "2px solid #ddd",
    },
    td: {
      padding: "12px",
      fontSize: "14px",
      borderBottom: "1px solid #f0f0f0",
      color: "#555",
    },
    backButton: {
      position: "fixed",
      top: "20px",
      right: "20px",
      background: "#ef4444",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      fontWeight: "600",
      cursor: "pointer",
      zIndex: 1000,
      transition: "all 0.3s",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    },
    noDataCell: {
      textAlign: "center",
      padding: "20px",
      color: "#999",
    },
  };

  return (
    <div style={styles.dashboardContainer}>
      {onBack && (
        <button
          style={styles.backButton}
          onClick={onBack}
          onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Back to List
        </button>
      )}

      <div style={styles.dashboardHeader}>
        <div style={styles.headerLeft}>
          Hi, {dealer ? dealer.name : "ADMIN"}
        </div>
        <div style={styles.headerRight}>
          <button
            style={styles.addFundBtn}
            onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Add Fund
          </button>
          <div style={styles.balanceText}>
            Balance: ₹ {dealer ? dealer.balance : "0.00"}
          </div>
        </div>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>Total Success</div>
          <div style={styles.statValue}>0</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>Total Failure</div>
          <div style={styles.statValue}>0</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>Total Pending</div>
          <div style={styles.statValue}>0</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>Wallet Topup</div>
          <div style={styles.statValue}>0</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>Opening Balance</div>
          <div style={styles.statValue}>0</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>Recharge Debit</div>
          <div style={styles.statValue}>0</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>Refund Credit</div>
          <div style={styles.statValue}>0</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>Revert</div>
          <div style={styles.statValue}>0</div>
        </div>
      </div>

      <div style={styles.reportSection}>
        <div style={styles.reportHeader}>Todays Operator Report-</div>
        <table style={styles.reportTable}>
          <thead>
            <tr>
              <th style={styles.th}>Company</th>
              <th style={styles.th}>Total Success</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="2" style={styles.noDataCell}>
                No data available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterDistributorPanel;
