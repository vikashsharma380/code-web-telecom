import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ManageRetailer = () => {
  const [retailers, setRetailers] = useState([]);
  const [searchBy, setSearchBy] = useState("Name");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // ✅ Fetch retailers from backend
  useEffect(() => {
    const fetchRetailers = async () => {
      try {
       const res = await axios.get(`${API_URL}/api/users/retailers`);

        setRetailers(res.data);
      } catch (err) {
        console.error("Error fetching retailers:", err);
      }
    };
    fetchRetailers();
  }, []);

  // ✅ Search filter
  const filteredRetailers = retailers.filter((retailer) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === "Name") return retailer.name.toLowerCase().includes(term);
    if (searchBy === "Mobile") return retailer.mobile.includes(term);
    if (searchBy === "UserId") return retailer.userId.toString().includes(term);
    return true;
  });

  // ✅ Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRetailers = filteredRetailers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRetailers.length / itemsPerPage);

  const totalBalance = filteredRetailers
    .reduce((sum, r) => sum + parseFloat(r.balance || 0), 0)
    .toFixed(2);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // ✅ Same style object
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
    label: { fontWeight: "600", fontSize: "14px", color: "#333" },
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
      marginBottom: "20px",
    },
    table: { width: "100%", borderCollapse: "collapse" },
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
    viewProfileBtn: { background: "#2563eb", color: "white" },
    editProfileBtn: { background: "#f59e0b", color: "white" },
    addBalanceBtn: { background: "#ef4444", color: "white" },
    revertBalanceBtn: { background: "#0891b2", color: "white" },
    loginBtn: { background: "#22c55e", color: "white" },
    pagination: {
      background: "white",
      padding: "15px",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    pageButton: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      background: "white",
      color: "#333",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      transition: "all 0.3s",
    },
    activePageButton: {
      background: "#2563eb",
      color: "white",
      border: "1px solid #2563eb",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>TOTAL AGENT BALANCE: {totalBalance}</div>

      {/* 🔍 Search Section */}
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

      {/* 📋 Retailer Table */}
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
            {currentRetailers.map((retailer, index) => (
              <tr key={index}>
                <td style={styles.td}>{retailer.userId}</td>
                <td style={styles.td}>{retailer.name}</td>
                <td style={styles.td}>{retailer.mobile}</td>
                <td style={styles.td}>{retailer.balance}</td>
                <td style={styles.td}>
                  <span style={styles.statusBadge}>
                    {retailer.status || "Active"}
                  </span>
                </td>
                <td style={styles.td}>
                  <button style={{ ...styles.button, ...styles.viewProfileBtn }}>
                    View Profile
                  </button>
                </td>
                <td style={styles.td}>
                  <button style={{ ...styles.button, ...styles.editProfileBtn }}>
                    Edit Profile
                  </button>
                </td>
                <td style={styles.td}>
                  <button style={{ ...styles.button, ...styles.addBalanceBtn }}>
                    Add Balance
                  </button>
                </td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.button, ...styles.revertBalanceBtn }}
                  >
                    Revert Balance
                  </button>
                </td>
                <td style={styles.td}>
                  <button style={{ ...styles.button, ...styles.loginBtn }}>
                    Login
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📄 Pagination */}
      <div style={styles.pagination}>
        <button
          style={styles.pageButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            style={
              currentPage === index + 1
                ? { ...styles.pageButton, ...styles.activePageButton }
                : styles.pageButton
            }
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          style={styles.pageButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageRetailer;
