import React, { useState } from "react";
import Header from "../Header";

export default function ReportDistributorReport() {
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <>
      {" "}
      <Header />
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.iconWrapper}>
              <span style={styles.icon}>📊</span>
            </div>
            <div>
              <h1 style={styles.title}>Distributor Recharge Report</h1>
              <p style={styles.subtitle}>
                Track and analyze distributor performance metrics
              </p>
            </div>
          </div>
        </div>

        <div style={styles.content}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Report Filters</h3>
              <span style={styles.badge}>Generate Custom Reports</span>
            </div>

            <div style={styles.filterGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>🏢</span>
                  Select Distributor
                </label>
                <div style={styles.selectWrapper}>
                  <select
                    value={selectedDistributor}
                    onChange={(e) => setSelectedDistributor(e.target.value)}
                    style={styles.select}
                  >
                    <option value="">--Select--</option>
                    <option value="dist1">Distributor Alpha</option>
                    <option value="dist2">Distributor Beta</option>
                    <option value="dist3">Distributor Gamma</option>
                    <option value="dist4">Distributor Delta</option>
                  </select>
                  <span style={styles.selectArrow}>▼</span>
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>📅</span>
                  From Date
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>📅</span>
                  To Date
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.buttonGroup}>
                <button style={styles.primaryButton}>
                  <span style={styles.buttonIcon}>🔍</span>
                  Search
                </button>
                <button style={styles.secondaryButton}>
                  <span style={styles.buttonIcon}>📥</span>
                  Export
                </button>
              </div>
            </div>

            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>💰</div>
                <div style={styles.statValue}>₹0</div>
                <div style={styles.statLabel}>Total Amount</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>📱</div>
                <div style={styles.statValue}>0</div>
                <div style={styles.statLabel}>Transactions</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>✅</div>
                <div style={styles.statValue}>0</div>
                <div style={styles.statLabel}>Success Rate</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>⚡</div>
                <div style={styles.statValue}>0</div>
                <div style={styles.statLabel}>Pending</div>
              </div>
            </div>
          </div>

          <div style={styles.tableCard}>
            <div style={styles.tableHeader}>
              <h3 style={styles.tableTitle}>Recharge Records</h3>
              <div style={styles.tableActions}>
                <button style={styles.iconButton}>🔄</button>
                <button style={styles.iconButton}>⚙️</button>
              </div>
            </div>

            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Sr</th>
                    <th style={styles.th}>Date & Time</th>
                    <th style={styles.th}>Distributor Name</th>
                    <th style={styles.th}>Mobile Number</th>
                    <th style={styles.th}>Operator</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>Commission</th>
                    <th style={styles.th}>Balance</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="10" style={styles.emptyState}>
                      <div style={styles.emptyIcon}>📋</div>
                      <div style={styles.emptyText}>
                        No recharge records found
                      </div>
                      <div style={styles.emptySubtext}>
                        Select a distributor and date range to view records
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
    background:
      "linear-gradient(135deg, #2196F3 0%, #1976D2 50%, #0D47A1 100%)",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    background: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    padding: "32px 40px",
  },
  headerContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  iconWrapper: {
    width: "70px",
    height: "70px",
    background: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 30px rgba(33, 150, 243, 0.3)",
  },
  icon: {
    fontSize: "36px",
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: "32px",
    fontWeight: "800",
    color: "#1f2937",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    margin: 0,
    fontSize: "16px",
    color: "#6b7280",
    fontWeight: "500",
  },
  content: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "40px",
  },
  card: {
    background: "white",
    borderRadius: "20px",
    padding: "32px",
    marginBottom: "24px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
    paddingBottom: "20px",
    borderBottom: "2px solid #f3f4f6",
  },
  cardTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
    color: "#1f2937",
  },
  badge: {
    background: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
    color: "white",
    padding: "8px 18px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "700",
  },
  filterGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    marginBottom: "32px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#374151",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    letterSpacing: "0.3px",
  },
  labelIcon: {
    fontSize: "16px",
  },
  selectWrapper: {
    position: "relative",
  },
  select: {
    width: "100%",
    padding: "14px 40px 14px 16px",
    fontSize: "15px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    backgroundColor: "white",
    cursor: "pointer",
    appearance: "none",
    transition: "all 0.3s ease",
    outline: "none",
    color: "#1f2937",
    fontWeight: "500",
  },
  selectArrow: {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    color: "#6b7280",
    fontSize: "12px",
  },
  input: {
    padding: "14px 16px",
    fontSize: "15px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    outline: "none",
    fontWeight: "500",
    color: "#1f2937",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    alignSelf: "flex-end",
  },
  primaryButton: {
    padding: "14px 28px",
    background: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 8px 24px rgba(33, 150, 243, 0.4)",
    transition: "all 0.3s ease",
  },
  secondaryButton: {
    padding: "14px 24px",
    background: "white",
    color: "#6b7280",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  },
  buttonIcon: {
    fontSize: "16px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  statCard: {
    background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
    padding: "24px",
    borderRadius: "16px",
    textAlign: "center",
    border: "2px solid #bae6fd",
    transition: "all 0.3s ease",
  },
  statIcon: {
    fontSize: "32px",
    marginBottom: "12px",
  },
  statValue: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#0c4a6e",
    marginBottom: "8px",
  },
  statLabel: {
    fontSize: "13px",
    color: "#0369a1",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  tableCard: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
  },
  tableHeader: {
    padding: "24px 32px",
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
  tableActions: {
    display: "flex",
    gap: "12px",
  },
  iconButton: {
    width: "40px",
    height: "40px",
    background: "#f3f4f6",
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "all 0.3s ease",
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
