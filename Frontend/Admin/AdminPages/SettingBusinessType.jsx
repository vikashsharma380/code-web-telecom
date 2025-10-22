import React, { useState } from "react";

export default function SettingBusinessType() {
  const [businessName, setBusinessName] = useState("");
  const businessList = [
    "Book Stores",
    "Cable & DTH",
    "Cybercafe & PCO",
    "Electronics & Computer",
    "Grossary Store",
    "Kirana & General Store",
    "Medical Store",
    "Mobile & Spare Store",
    "Mobile Recharge Shop",
    "Photo & Video Studio",
    "Stationary Shop",
    "Travel Service",
  ];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Retailer Business Type</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Retailer Business Name:</label>
          <input
            type="text"
            placeholder="Enter business name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.btnRow}>
          <button style={styles.btnPrimary}>Submit</button>
          <button style={styles.btnSecondary}>Cancel</button>
        </div>
      </div>

      <div style={styles.tableCard}>
        <h3 style={styles.tableTitle}>Agent Business Name List</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Agent Business Name</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {businessList.map((item, index) => (
              <tr key={index} style={styles.tr}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{item}</td>
                <td style={styles.td}>
                  <button style={styles.iconBtn}>✏️</button>
                  <button style={styles.iconBtn}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f4f7fb",
    minHeight: "100vh",
    padding: "30px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "25px",
  },
  title: {
    marginBottom: "15px",
    color: "#1e3a8a",
    borderBottom: "2px solid #1e3a8a",
    paddingBottom: "8px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  },
  label: {
    fontWeight: "600",
    marginBottom: "8px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },
  btnRow: {
    display: "flex",
    gap: "10px",
  },
  btnPrimary: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  btnSecondary: {
    backgroundColor: "#e5e7eb",
    color: "#333",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  tableCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  tableTitle: {
    marginBottom: "10px",
    color: "#1e3a8a",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#1e40af",
    color: "#fff",
    padding: "10px",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
  },
  tr: {
    backgroundColor: "#fff",
    transition: "background 0.2s",
  },
  iconBtn: {
    marginRight: "8px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};
