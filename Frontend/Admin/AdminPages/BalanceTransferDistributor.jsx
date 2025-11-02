import React, { useState } from "react";
import Header from "../Header";

const BalanceTransferDistributor = () => {
  // Sample data - replace with actual API call
  const [distributors] = useState([
    { userId: "200002", name: "DEMO DISTRIBUTOR" },
    { userId: "200003", name: "CWT DISTRIBUTOR" },
    { userId: "200004", name: "SP Gupta" },
    { userId: "200005", name: "AMAN KUMAR" },
    { userId: "200006", name: "PAPPU KUMAR GIRI" },
    { userId: "200007", name: "ATUL PRAKASH" },
  ]);

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      background: "linear-gradient(to right, #3b82f6, #2563eb)",
      color: "white",
      padding: "15px 20px",
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
    tableContainer: {
      background: "white",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      background: "#f8f9fa",
      padding: "12px",
      textAlign: "left",
      fontWeight: "600",
      fontSize: "14px",
      color: "#333",
      borderBottom: "2px solid #ddd",
    },
    td: {
      padding: "12px",
      fontSize: "14px",
      borderBottom: "1px solid #f0f0f0",
      color: "#555",
    },
    button: {
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      fontSize: "13px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s",
      marginRight: "5px",
    },
    addBalanceBtn: {
      background: "#ef4444",
      color: "white",
    },
    revertBalanceBtn: {
      background: "#0891b2",
      color: "white",
    },
    loginBtn: {
      background: "#22c55e",
      color: "white",
    },
  };

  return (
    <>
      {" "}
      <Header />
      <div style={styles.container}>
        <div style={styles.header}>Credit/Debit</div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>User ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Add Balance</th>
                <th style={styles.th}>Revert Balance</th>
                <th style={styles.th}>Login</th>
              </tr>
            </thead>
            <tbody>
              {distributors.map((distributor, index) => (
                <tr key={index}>
                  <td style={styles.td}>{distributor.userId}</td>
                  <td style={styles.td}>{distributor.name}</td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.button, ...styles.addBalanceBtn }}
                      onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                      onMouseLeave={(e) => (e.target.style.opacity = "1")}
                    >
                      Add Balance
                    </button>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.button, ...styles.revertBalanceBtn }}
                      onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                      onMouseLeave={(e) => (e.target.style.opacity = "1")}
                    >
                      Revert Balance
                    </button>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.button, ...styles.loginBtn }}
                      onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                      onMouseLeave={(e) => (e.target.style.opacity = "1")}
                    >
                      Login
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>{" "}
    </>
  );
};

export default BalanceTransferDistributor;
