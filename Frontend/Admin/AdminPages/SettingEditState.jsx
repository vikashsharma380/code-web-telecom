import React, { useState } from "react";
import Header from "../Header";

export default function SettingEditState() {
  const [state, setState] = useState({ name: "", code: "", circle: "" });

  const stateList = [
    { name: "Andhra Pradesh", code: "AP", circle: 13 },
    { name: "Bihar", code: "BR", circle: 17 },
    { name: "Delhi", code: "DL", circle: 10 },
    { name: "Gujarat", code: "GJ", circle: 8 },
    { name: "Maharashtra", code: "MH", circle: 4 },
    { name: "Uttar Pradesh", code: "UP", circle: 15 },
    { name: "West Bengal", code: "WB", circle: 7 },
  ];

  return (
    <>
      {" "}
      <Header />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>State Master / Edit</h2>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>State Name:</label>
              <input
                type="text"
                placeholder="Enter state name"
                value={state.name}
                onChange={(e) => setState({ ...state, name: e.target.value })}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>State Code:</label>
              <input
                type="text"
                placeholder="Enter code"
                value={state.code}
                onChange={(e) => setState({ ...state, code: e.target.value })}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Circle Code:</label>
              <input
                type="text"
                placeholder="Enter circle code"
                value={state.circle}
                onChange={(e) => setState({ ...state, circle: e.target.value })}
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.btnRow}>
            <button style={styles.btnPrimary}>Submit</button>
            <button style={styles.btnSecondary}>Cancel</button>
          </div>
        </div>

        <div style={styles.tableCard}>
          <h3 style={styles.tableTitle}>State List</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>State Name</th>
                <th style={styles.th}>State Code</th>
                <th style={styles.th}>Circle Code</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stateList.map((item, index) => (
                <tr key={index} style={styles.tr}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{item.name}</td>
                  <td style={styles.td}>{item.code}</td>
                  <td style={styles.td}>{item.circle}</td>
                  <td style={styles.td}>
                    <button style={styles.iconBtn}>✏️</button>
                    <button style={styles.iconBtn}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>{" "}
    </>
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
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
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
    marginTop: "15px",
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
