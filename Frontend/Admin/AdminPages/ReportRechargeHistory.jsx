import React, { useState } from "react";
import Header from "../Header";

export default function ReportRechargeHistory() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchText, setSearchText] = useState("");

  return (
    <>
      {" "}
      <Header />
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <h1 style={styles.title}>Recharge History</h1>
            <p style={styles.subtitle}>
              View and manage all recharge transactions
            </p>
          </div>
        </div>

        <div style={styles.content}>
          <div style={styles.filterCard}>
            <div style={styles.filterSection}>
              <div style={styles.filterGroup}>
                <label style={styles.label}>From Date</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.label}>To Date</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  style={styles.input}
                />
              </div>

              <button style={styles.button}>
                <span style={styles.buttonIcon}>🔍</span>
                Search
              </button>
            </div>

            <div style={styles.searchSection}>
              <label style={styles.label}>Quick Search</label>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={styles.searchInput}
                placeholder="Search by TxID, Name, Number..."
              />
            </div>
          </div>

          <div style={styles.tableCard}>
            <div style={styles.tableHeader}>
              <h3 style={styles.tableTitle}>Transaction Records</h3>
              <span style={styles.badge}>0 Records</span>
            </div>

            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Sr</th>
                    <th style={styles.th}>TxID</th>
                    <th style={styles.th}>Wallet</th>
                    <th style={styles.th}>Operator Id</th>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Balance</th>
                    <th style={styles.th}>Operator</th>
                    <th style={styles.th}>Number</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>API</th>
                    <th style={styles.th}>By</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="14" style={styles.emptyState}>
                      <div style={styles.emptyIcon}>📊</div>
                      <div style={styles.emptyText}>
                        No transaction records found
                      </div>
                      <div style={styles.emptySubtext}>
                        Try adjusting your search criteria
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    padding: "30px 40px",
  },
  headerContent: {
    maxWidth: "1400px",
    margin: "0 auto",
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: "32px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subtitle: {
    margin: 0,
    fontSize: "16px",
    color: "#666",
  },
  content: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "30px 40px",
  },
  filterCard: {
    background: "white",
    borderRadius: "16px",
    padding: "28px",
    marginBottom: "24px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
  },
  filterSection: {
    display: "flex",
    gap: "20px",
    marginBottom: "24px",
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: "1",
    minWidth: "200px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    letterSpacing: "0.3px",
  },
  input: {
    padding: "12px 16px",
    fontSize: "15px",
    border: "2px solid #e5e7eb",
    borderRadius: "10px",
    transition: "all 0.3s ease",
    outline: "none",
  },
  button: {
    padding: "12px 32px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    transition: "all 0.3s ease",
  },
  buttonIcon: {
    fontSize: "16px",
  },
  searchSection: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  searchInput: {
    padding: "12px 16px",
    fontSize: "15px",
    border: "2px solid #e5e7eb",
    borderRadius: "10px",
    width: "100%",
    transition: "all 0.3s ease",
    outline: "none",
  },
  tableCard: {
    background: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
  },
  tableHeader: {
    padding: "24px 28px",
    borderBottom: "2px solid #f3f4f6",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tableTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
    color: "#1f2937",
  },
  badge: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "16px 20px",
    textAlign: "left",
    fontSize: "13px",
    fontWeight: "700",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    borderBottom: "2px solid #f3f4f6",
    whiteSpace: "nowrap",
  },
  emptyState: {
    padding: "80px 40px",
    textAlign: "center",
  },
  emptyIcon: {
    fontSize: "64px",
    marginBottom: "16px",
    opacity: 0.5,
  },
  emptyText: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#4b5563",
    marginBottom: "8px",
  },
  emptySubtext: {
    fontSize: "14px",
    color: "#9ca3af",
  },
};
