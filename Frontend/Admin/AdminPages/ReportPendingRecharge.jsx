import React, { useState } from "react";
import Header from "../Header";

export default function ReportPendingRecharge() {
  const [selectedDate, setSelectedDate] = useState("");

  const pendingRecharges = [
    {
      id: 1,
      rechargeId: "RC001",
      date: "2025-10-12 10:38:45 AM",
      name: "Gupta IT Solution",
      company: "Airtel",
      mobile: "9266982764",
      amount: "249",
      api: "A1Topup",
      rechargeBy: "GPRS",
      response: "Already in pending process",
      status: "Pending",
    },
    {
      id: 2,
      rechargeId: "RC002",
      date: "2025-09-12 07:23:54 PM",
      name: "Gupta IT Solution",
      company: "RELIANCE - JIO",
      mobile: "6203225632",
      amount: "29",
      api: "A1Topup",
      rechargeBy: "GPRS",
      response: "Already in pending process",
      status: "Pending",
    },
    {
      id: 3,
      rechargeId: "RC003",
      date: "2025-09-07 09:58:35 PM",
      name: "Gupta IT Solution",
      company: "Airtel",
      mobile: "7763042717",
      amount: "249",
      api: "A1Topup",
      rechargeBy: "GPRS",
      response: "Already in pending process",
      status: "Pending",
    },
  ];

  return (
    <>
      {" "}
      <Header />
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.iconWrapper}>
              <span style={styles.icon}>⏳</span>
            </div>
            <div>
              <h1 style={styles.title}>List of Pending Recharge</h1>
              <p style={styles.subtitle}>
                Monitor and manage pending recharge transactions
              </p>
            </div>
          </div>
        </div>

        <div style={styles.content}>
          <div style={styles.filterCard}>
            <div style={styles.filterRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>📅</span>
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={styles.input}
                />
              </div>
              <button style={styles.primaryButton}>
                <span style={styles.buttonIcon}>🔍</span>
                Search
              </button>
            </div>
          </div>

          <div style={styles.tableCard}>
            <div style={styles.tableHeader}>
              <h3 style={styles.tableTitle}>Pending Transactions</h3>
              <span style={styles.badge}>
                {pendingRecharges.length} Records
              </span>
            </div>

            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>SR No.</th>
                    <th style={styles.th}>Recharge Id</th>
                    <th style={styles.th}>Recharge Date</th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Company Name</th>
                    <th style={styles.th}>Mobile No</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>API</th>
                    <th style={styles.th}>Recharge By</th>
                    <th style={styles.th}>Response</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRecharges.map((recharge) => (
                    <tr key={recharge.id} style={styles.tableRow}>
                      <td style={styles.td}>{recharge.id}</td>
                      <td style={styles.td}>
                        <span style={styles.idBadge}>
                          {recharge.rechargeId}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.dateCell}>{recharge.date}</div>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.nameCell}>{recharge.name}</div>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.companyBadge}>
                          {recharge.company}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.mobileCell}>
                          📱 {recharge.mobile}
                        </div>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.amountCell}>₹{recharge.amount}</div>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.apiBadge}>{recharge.api}</span>
                      </td>
                      <td style={styles.td}>{recharge.rechargeBy}</td>
                      <td style={styles.td}>
                        <div style={styles.responseCell}>
                          {recharge.response}
                        </div>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.statusPending}>
                          ⏳ {recharge.status}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.actionButtons}>
                          <button style={styles.actionBtn} title="View Details">
                            👁️
                          </button>
                          <button
                            style={styles.actionBtn}
                            title="Refresh Status"
                          >
                            🔄
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={styles.pagination}>
              <button style={styles.paginationBtn}>◀ Previous</button>
              <span style={styles.pageInfo}>Page 1 of 1</span>
              <button style={styles.paginationBtn}>Next ▶</button>
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
    boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
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
  filterCard: {
    background: "white",
    borderRadius: "20px",
    padding: "28px",
    marginBottom: "24px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
  },
  filterRow: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-end",
    flexWrap: "wrap",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: "1",
    minWidth: "250px",
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
  primaryButton: {
    padding: "14px 32px",
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
  buttonIcon: {
    fontSize: "16px",
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
    background: "#f9fafb",
  },
  tableRow: {
    transition: "all 0.2s ease",
    cursor: "pointer",
  },
  td: {
    padding: "16px 20px",
    fontSize: "14px",
    color: "#374151",
    borderBottom: "1px solid #f3f4f6",
  },
  idBadge: {
    background: "#e0e7ff",
    color: "#4338ca",
    padding: "4px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
  },
  dateCell: {
    fontSize: "13px",
    color: "#6b7280",
    whiteSpace: "nowrap",
  },
  nameCell: {
    fontWeight: "600",
    color: "#1f2937",
  },
  companyBadge: {
    background: "#dbeafe",
    color: "#1e40af",
    padding: "4px 12px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  mobileCell: {
    fontFamily: "monospace",
    fontSize: "13px",
    color: "#4b5563",
  },
  amountCell: {
    fontWeight: "700",
    color: "#059669",
    fontSize: "15px",
  },
  apiBadge: {
    background: "#fef3c7",
    color: "#92400e",
    padding: "4px 12px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "600",
  },
  responseCell: {
    fontSize: "13px",
    color: "#6b7280",
    maxWidth: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  statusPending: {
    background: "#fef3c7",
    color: "#92400e",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "700",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },
  actionButtons: {
    display: "flex",
    gap: "8px",
  },
  actionBtn: {
    width: "32px",
    height: "32px",
    background: "#f3f4f6",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pagination: {
    padding: "20px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "2px solid #f3f4f6",
  },
  paginationBtn: {
    padding: "10px 20px",
    background: "white",
    border: "2px solid #e5e7eb",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  pageInfo: {
    fontSize: "14px",
    color: "#6b7280",
    fontWeight: "600",
  },
};
