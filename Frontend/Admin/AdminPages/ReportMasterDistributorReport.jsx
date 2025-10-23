import React, { useState } from "react";

export default function ReportMasterDistributorReport() {
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.iconWrapper}>
            <span style={styles.icon}>📈</span>
          </div>
          <div>
            <h1 style={styles.title}>Master Distributor Recharge Report</h1>
            <p style={styles.subtitle}>
              Comprehensive distributor analytics and insights
            </p>
          </div>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Filter Parameters</h3>
            <span style={styles.requiredText}>* All fields required</span>
          </div>

          <div style={styles.filterGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>👤</span>
                Select Master Distributor
              </label>
              <div style={styles.selectWrapper}>
                <select
                  value={selectedDistributor}
                  onChange={(e) => setSelectedDistributor(e.target.value)}
                  style={styles.select}
                >
                  <option value="">Choose a distributor...</option>
                  <option value="distributor1">Premium Distributor A</option>
                  <option value="distributor2">Enterprise Distributor B</option>
                  <option value="distributor3">Master Distributor C</option>
                  <option value="distributor4">Elite Distributor D</option>
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
                Generate Report
              </button>
              <button style={styles.secondaryButton}>
                <span style={styles.buttonIcon}>🔄</span>
                Reset
              </button>
            </div>
          </div>

          <div style={styles.infoBox}>
            <span style={styles.infoIcon}>ℹ️</span>
            <div>
              <div style={styles.infoTitle}>Quick Tips</div>
              <div style={styles.infoText}>
                Select a date range up to 90 days for optimal performance.
                Reports are generated in real-time.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e8ba3 100%)",
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
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
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
  requiredText: {
    fontSize: "13px",
    color: "#ef4444",
    fontWeight: "600",
  },
  filterGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    marginBottom: "28px",
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
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
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
  infoBox: {
    background: "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
    border: "2px solid #bfdbfe",
  },
  infoIcon: {
    fontSize: "24px",
  },
  infoTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#1e40af",
    marginBottom: "4px",
  },
  infoText: {
    fontSize: "14px",
    color: "#3730a3",
    lineHeight: "1.6",
  },
};
