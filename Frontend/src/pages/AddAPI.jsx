import React from "react";
import Header from "../../Admin/Header";

export default function AddAPI() {
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
      maxWidth: "900px",
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
    formRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1.5rem",
    },
    buttonGroup: {
      display: "flex",
      gap: "1rem",
      marginTop: "1rem",
    },
    updateBtn: {
      background: "#667eea",
      color: "white",
      padding: "0.75rem 2rem",
      border: "none",
      borderRadius: "8px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "0.3s",
    },
    deleteBtn: {
      background: "#e53e3e",
      color: "white",
      padding: "0.75rem 2rem",
      border: "none",
      borderRadius: "8px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "0.3s",
    },
  };

  return (
    <>
      {" "}
      <Header />
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.title}>AITopup</div>
          <div style={styles.formRow}>
            <div>
              <label style={styles.label}>API Name</label>
              <input
                type="text"
                placeholder="Enter API Name"
                style={styles.input}
              />
            </div>
            <div>
              <label style={styles.label}>Response Type</label>
              <select style={styles.select}>
                <option>json</option>
                <option>xml</option>
              </select>
            </div>
          </div>

          <div style={styles.formRow}>
            <div>
              <label style={styles.label}>Method</label>
              <select style={styles.select}>
                <option>GET</option>
                <option>POST</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>Request URL</label>
              <input
                type="text"
                placeholder="Enter request URL"
                style={styles.input}
              />
            </div>
          </div>

          <div>
            <label style={styles.label}>Recharge Response</label>
            <input
              type="text"
              placeholder="Enter Status, Transaction ID, etc."
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Balance API URL</label>
            <input
              type="text"
              placeholder="Enter balance API URL"
              style={styles.input}
            />
          </div>

          <div style={styles.buttonGroup}>
            <button style={styles.updateBtn}>Update</button>
            <button style={styles.deleteBtn}>Delete</button>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.title}>AITopup Utility</div>
          <div style={styles.formRow}>
            <div>
              <label style={styles.label}>API Name</label>
              <input
                type="text"
                placeholder="Enter API Name"
                style={styles.input}
              />
            </div>
            <div>
              <label style={styles.label}>Response Type</label>
              <select style={styles.select}>
                <option>json</option>
                <option>xml</option>
              </select>
            </div>
          </div>

          <div>
            <label style={styles.label}>Request URL</label>
            <input
              type="text"
              placeholder="Enter request URL"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Balance API URL</label>
            <input
              type="text"
              placeholder="Enter balance API URL"
              style={styles.input}
            />
          </div>

          <div style={styles.buttonGroup}>
            <button style={styles.updateBtn}>Update</button>
            <button style={styles.deleteBtn}>Delete</button>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
