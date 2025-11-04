import React, { useState, useEffect } from "react";
import axios from "axios";
import MasterDistributorPanel from "./MasterDistributorPanel";
import PanelHeader from "./PanelHeader";
import Header from "../Header";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ManageDistributor = () => {
  const [searchBy, setSearchBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const [distributors, setDistributors] = useState([]);

  useEffect(() => {
    loadDistributors();
  }, []);

  const loadDistributors = async () => {
    try {
      const res = await axios.get(`${API_URL}/master/distributors`);
      setDistributors(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/master/distributors?${searchBy}=${searchTerm}`
      );
      setDistributors(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = (distributor) => {
    setSelectedDistributor(distributor);
    setShowDashboard(true);
  };

  const totalBalance = distributors
    .reduce((sum, dist) => sum + Number(dist.balance), 0)
    .toFixed(2);

  const totalCommission = distributors
    .reduce((sum, dist) => sum + Number(dist.commission), 0)
    .toFixed(2);

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
    searchSection: {
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      marginBottom: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    label: {
      fontWeight: "600",
      fontSize: "14px",
      color: "#333",
    },
    select: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      minWidth: "120px",
    },
    input: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      flex: "1",
      maxWidth: "300px",
    },
    searchButton: {
      padding: "8px 24px",
      background: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background 0.3s",
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
    statusBadge: {
      background: "#22c55e",
      color: "white",
      padding: "6px 16px",
      borderRadius: "4px",
      fontSize: "13px",
      fontWeight: "600",
      display: "inline-block",
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
    viewProfileBtn: {
      background: "#2563eb",
      color: "white",
    },
    editProfileBtn: {
      background: "#f59e0b",
      color: "white",
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

  // ✅ After Login - PanelHeader + Dashboard
  if (showDashboard && selectedDistributor) {
    return (
      <>
        <PanelHeader userRole="distributor" />
        <MasterDistributorPanel
          dealer={selectedDistributor}
          // onBack={handleBackToList}
        />
      </>
    );
  }

  // ✅ Before Login - Admin Header + Table
  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.header}>
          TOTAL DISTRIBUTOR BALANCE: {totalBalance}
        </div>

        <div style={styles.searchSection}>
          <span style={styles.label}>Search by:</span>
          <select
            style={styles.select}
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <option value="Name">Name</option>
            <option value="Mobile">Mobile</option>
            <option value="UserId">User ID</option>
          </select>
          <input
            type="text"
            style={styles.input}
            placeholder="Enter search term..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            style={styles.searchButton}
            onClick={handleSearch}
            onMouseEnter={(e) => (e.target.style.background = "#1d4ed8")}
            onMouseLeave={(e) => (e.target.style.background = "#2563eb")}
          >
            Search
          </button>
        </div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>User ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Mobile</th>
                <th style={styles.th}>Balance</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>View Profile</th>
                <th style={styles.th}>Profile Edit</th>
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
                  <td style={styles.td}>{distributor.mobile}</td>
                  <td style={styles.td}>{distributor.balance}</td>
                  <td style={styles.td}>
                    <span style={styles.statusBadge}>{distributor.status}</span>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.button, ...styles.viewProfileBtn }}
                      onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                      onMouseLeave={(e) => (e.target.style.opacity = "1")}
                    >
                      View Profile
                    </button>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.button, ...styles.editProfileBtn }}
                      onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                      onMouseLeave={(e) => (e.target.style.opacity = "1")}
                    >
                      Edit Profile
                    </button>
                  </td>
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
                      onClick={() => handleLogin(distributor)}
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
      </div>
    </>
  );
};

export default ManageDistributor;
