import React from "react";

export default function SettingAddBankDetails() {
  return (
    <div style={styles.container}>
      {/* Bank Details Form */}
      <div style={styles.card}>
        <h2 style={styles.title}>Bank Details</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Bank Name :</label>
          <select style={styles.select}>
            <option value="">Select Bank</option>
            <option value="State Bank Of India">State Bank Of India</option>
            <option value="HDFC Bank">HDFC Bank</option>
            <option value="ICICI Bank">ICICI Bank</option>
            <option value="Axis Bank">Axis Bank</option>
            <option value="Punjab National Bank">Punjab National Bank</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>IFSC Code :</label>
          <input
            type="text"
            placeholder="Enter IFSC Code"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Account No :</label>
          <input
            type="text"
            placeholder="Enter Account Number"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Branch Name :</label>
          <input
            type="text"
            placeholder="Enter Branch Name"
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button style={styles.submitBtn}>Submit</button>
          <button style={styles.cancelBtn}>Cancel</button>
        </div>
      </div>

      {/* List of Bank Details */}
      <div style={styles.card}>
        <h2 style={styles.title}>Saved Bank Details</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Delete</th>
              <th style={styles.th}>Edit</th>
              <th style={styles.th}>Bank Name</th>
              <th style={styles.th}>IFSC Code</th>
              <th style={styles.th}>Account No</th>
              <th style={styles.th}>Branch Name</th>
            </tr>
          </thead>
          <tbody>
            {bankData.map((bank, index) => (
              <tr key={index} style={styles.tr}>
                <td style={styles.td}>
                  <span style={styles.deleteIcon}>❌</span>
                </td>
                <td style={styles.td}>
                  <span style={styles.editIcon}>✏️</span>
                </td>
                <td style={styles.td}>{bank.bankName}</td>
                <td style={styles.td}>{bank.ifsc}</td>
                <td style={styles.td}>{bank.account}</td>
                <td style={styles.td}>{bank.branch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Sample Data
const bankData = [
  {
    bankName: "State Bank Of India",
    ifsc: "SBIN0014661",
    account: "44067485059",
    branch: "RAGHUNATHPUR MOTIHARI",
  },
];

// Inline CSS styles
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
  select: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "#fff",
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
    verticalAlign: "middle",
  },
  deleteIcon: {
    cursor: "pointer",
    color: "#e53e3e",
    fontSize: "18px",
  },
  editIcon: {
    cursor: "pointer",
    color: "#2b6cb0",
    fontSize: "18px",
  },
};
