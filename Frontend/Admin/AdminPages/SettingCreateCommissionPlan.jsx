import React from "react";
import Header from "../Header";

export default function SettingCreateCommissionPlan() {
  return (
    <>
      {" "}
      <Header />
      <div style={styles.container}>
        {/* Create Scheme Section */}
        <div style={styles.card}>
          <h2 style={styles.title}>Create Scheme</h2>

          <div style={styles.formGroup}>
            <label style={styles.label}>Scheme Name</label>
            <input
              type="text"
              placeholder="Enter scheme name"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Scheme Detail</label>
            <textarea
              placeholder="Enter scheme details"
              rows="4"
              style={styles.textarea}
            ></textarea>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Scheme For</label>
            <select style={styles.select}>
              <option value="">Select</option>
              <option value="Distributor">Distributor</option>
              <option value="MasterDealer">Master Dealer</option>
              <option value="Agent">Agent</option>
            </select>
          </div>

          <div style={styles.buttonGroup}>
            <button style={styles.submitBtn}>Submit</button>
            <button style={styles.cancelBtn}>Cancel</button>
          </div>
        </div>

        {/* List Of Schemes Section */}
        <div style={styles.card}>
          <h2 style={styles.title}>List of Schemes</h2>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Scheme Name</th>
                <th style={styles.th}>Scheme Detail</th>
                <th style={styles.th}>Scheme Type</th>
                <th style={styles.th}>Scheme For</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {schemeData.map((scheme, index) => (
                <tr key={index} style={styles.tr}>
                  <td style={styles.td}>{scheme.name}</td>
                  <td style={styles.td}>{scheme.detail}</td>
                  <td style={styles.td}>{scheme.type}</td>
                  <td style={styles.td}>{scheme.for}</td>
                  <td style={styles.td}>
                    <button style={styles.actionBtn}>Set Commission</button>
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

// Sample table data
const schemeData = [
  {
    name: "Distributor Commission",
    detail: "Distributor Commission",
    type: "Variable",
    for: "Distributor",
  },
  {
    name: "DISTRIBUTORS",
    detail: "DISTRIBUTORS",
    type: "Variable",
    for: "Distributor",
  },
  {
    name: "MASTER DISTRIBUTORS",
    detail: "MASTER DISTRIBUTORS",
    type: "Variable",
    for: "MasterDealer",
  },
  {
    name: "Retailer Commission",
    detail: "Retailer Commission",
    type: "Variable",
    for: "Agent",
  },
  {
    name: "RETAILERS",
    detail: "RETAILERS",
    type: "Variable",
    for: "Agent",
  },
];

// Inline styles
const styles = {
  container: {
    padding: "30px",
    background: "#f5f7fb",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    padding: "25px",
    marginBottom: "25px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#2a4365",
    marginBottom: "20px",
    borderBottom: "2px solid #2b6cb0",
    paddingBottom: "8px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontSize: "15px",
    color: "#333",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
  },
  select: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },
  submitBtn: {
    background: "#2b6cb0",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.3s",
  },
  cancelBtn: {
    background: "#e53e3e",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.3s",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
  },
  th: {
    background: "#2b6cb0",
    color: "#fff",
    padding: "10px",
    textAlign: "left",
    fontSize: "14px",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "10px",
    fontSize: "14px",
    color: "#333",
  },
  actionBtn: {
    background: "#3182ce",
    color: "#fff",
    border: "none",
    padding: "7px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "13px",
  },
};
