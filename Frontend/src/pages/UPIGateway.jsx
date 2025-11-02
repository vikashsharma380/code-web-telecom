import React from "react";
import Header from "../../Admin/Header";

export default function UPIGateway() {
  const styles = {
    page: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    card: {
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "800px",
      padding: "2rem",
      marginBottom: "2rem",
    },
    title: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      padding: "1rem 1.5rem",
      borderRadius: "10px",
      fontSize: "1.25rem",
      fontWeight: "600",
      marginBottom: "1.5rem",
    },
    label: {
      display: "block",
      fontSize: "0.9rem",
      fontWeight: "600",
      color: "#2d3748",
      marginBottom: "0.5rem",
    },
    input: {
      width: "100%",
      padding: "0.75rem 1rem",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      marginBottom: "1rem",
      fontSize: "0.9rem",
      outline: "none",
      transition: "0.3s",
    },
    select: {
      width: "100%",
      padding: "0.75rem 1rem",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      marginBottom: "1rem",
      fontSize: "0.9rem",
      outline: "none",
    },
    button: {
      background: "#667eea",
      color: "white",
      padding: "0.75rem 2rem",
      border: "none",
      borderRadius: "8px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "0.3s",
      display: "block",
      marginTop: "1rem",
    },
  };

  return (
    <>
      {" "}
      <Header />
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.title}>Paytm Payment Gateway Setting</div>
          <label style={styles.label}>Merchant ID</label>
          <input
            type="text"
            placeholder="Enter Merchant ID"
            style={styles.input}
          />

          <label style={styles.label}>Merchant Key</label>
          <input
            type="text"
            placeholder="Enter Merchant Key"
            style={styles.input}
          />

          <label style={styles.label}>App Status</label>
          <select style={styles.select}>
            <option>ON</option>
            <option>OFF</option>
          </select>

          <label style={styles.label}>Web Status</label>
          <select style={styles.select}>
            <option>ON</option>
            <option>OFF</option>
          </select>

          <button style={styles.button}>Update</button>
        </div>

        <div style={styles.card}>
          <div style={styles.title}>UPI Gateway Setting</div>
          <label style={styles.label}>Callback URL</label>
          <input
            type="text"
            placeholder="Enter Callback URL"
            style={styles.input}
          />

          <label style={styles.label}>Merchant Token</label>
          <input
            type="text"
            placeholder="Enter Merchant Token"
            style={styles.input}
          />

          <label style={styles.label}>App Status</label>
          <select style={styles.select}>
            <option>ON</option>
            <option>OFF</option>
          </select>

          <label style={styles.label}>Web Status</label>
          <select style={styles.select}>
            <option>ON</option>
            <option>OFF</option>
          </select>

          <button style={styles.button}>Update</button>
        </div>
      </div>{" "}
    </>
  );
}
