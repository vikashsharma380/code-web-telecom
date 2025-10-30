import React, { useState } from "react";

const ManageRetailer = () => {
  const [searchBy, setSearchBy] = useState("Name");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Sample data - replace with actual API call
  const allRetailers = [
    // Page 1 data
    {
      userId: "300021",
      name: "MUNNA KUMAR",
      mobile: "9162693250",
      balance: "0.00",
      status: "Active",
    },
    {
      userId: "300022",
      name: "neha",
      mobile: "8115903936",
      balance: "0.00",
      status: "Active",
    },
    {
      userId: "300023",
      name: "Gupta IT Solution",
      mobile: "7870442209",
      balance: "846.99",
      status: "Active",
    },
    {
      userId: "300024",
      name: "nazar",
      mobile: "8294821902",
      balance: "0.00",
      status: "Active",
    },
    {
      userId: "300025",
      name: "Imran",
      mobile: "8178947826",
      balance: "10.00",
      status: "Active",
    },
    {
      userId: "300026",
      name: "sana",
      mobile: "6206197036",
      balance: "0.00",
      status: "Active",
    },
    {
      userId: "300027",
      name: "Nadeem mallick",
      mobile: "7209172207",
      balance: "0.00",
      status: "Active",
    },
    {
      userId: "300028",
      name: "Abhishek Dewand",
      mobile: "7004970988",
      balance: "0.00",
      status: "Active",
    },
    {
      userId: "300029",
      name: "Moin",
      mobile: "9693936734",
      balance: "0.00",
      status: "Active",
    },
    {
      userId: "300031",
      name: "Ayush Gupta",
      mobile: "7779067090",
      balance: "10.00",
      status: "Active",
    },
    {
      userId: "300046",
      name: "Mohit Kumar",
      mobile: "7004094316",
      balance: "0.00",
      status: "Active",
    },
    {
      userId: "300072",
      name: "Manjay Kumar",
      mobile: "9162826778",
      balance: "0.00",
      status: "Active",
    },
    {
      userId: "300073",
      name: "Prince S",
      mobile: "8407874876",
      balance: "4.68",
      status: "Active",
    },
    {
      userId: "300074",
      name: "arshad ansari",
      mobile: "9097758093",
      balance: "0.00",
      status: "Active",
    },
    {
      userId: "300075",
      name: "sabir ansari",
      mobile: "7061198879",
      balance: "0.00",
      status: "Active",
    },
    {
      userId: "300076",
      name: "Pawan Kumar Gupta",
      mobile: "9608079462",
      balance: "0.00",
      status: "Active",
    },
    {
      userId: "300077",
      name: "Vinay",
      mobile: "8318786430",
      balance: "0.00",
      status: "Active",
    },
    {
      userId: "300078",
      name: "prince",
      mobile: "9097889362",
      balance: "5.92",
      status: "Active",
    },
    {
      userId: "300079",
      name: "om parkash",
      mobile: "6200973478",
      balance: "7.09",
      status: "Active",
    },
    {
      userId: "300091",
      name: "Shamshaad Khan",
      mobile: "9161019161",
      balance: "0.00",
      status: "Active",
    },
    {
      userId: "300021",
      name: "Niraj Kumar",
      mobile: "9123487048",
      balance: "0.00",
      status: "Active",
    },
    {
      userId: "300022",
      name: "Vinay",
      mobile: "7903746880",
      balance: "0.00",
      status: "Active",
    },
    {
      userId: "300023",
      name: "ATUL PRAKASH",
      mobile: "8252339220",
      balance: "2.47",
      status: "Active",
    },
    {
      userId: "300024",
      name: "MICKEY USMAN",
      mobile: "7667636428",
      balance: "0.00",
      status: "Active",
    },
    {
      userId: "300025",
      name: "Sunny Kumar",
      mobile: "9162541535",
      balance: "0.00",
      status: "Active",
    },
    // Page 2 data
    {
      userId: "300027",
      name: "Sombhu Raj",
      mobile: "9905468620",
      balance: "-62.70",
      status: "Active",
    },
    {
      userId: "300028",
      name: "Piyush Kumar",
      mobile: "7903836661",
      balance: "1.40",
      status: "Active",
    },
    {
      userId: "300029",
      name: "vijay",
      mobile: "8434601949",
      balance: "4.05",
      status: "Active",
    },
    {
      userId: "300030",
      name: "Abhishek Ranjan",
      mobile: "7973047851",
      balance: "0.00",
      status: "Active",
    },
    {
      userId: "300031",
      name: "shashi",
      mobile: "8271607847",
      balance: "0.00",
      status: "Active",
    },
    {
      userId: "300032",
      name: "Vikash Sharma",
      mobile: "9031738909",
      balance: "10.00",
      status: "Active",
    },
    {
      userId: "300033",
      name: "ashik ali",
      mobile: "7903542180",
      balance: "11.93",
      status: "Active",
    },
  ];

  const totalBalance = allRetailers
    .reduce((sum, ret) => sum + parseFloat(ret.balance), 0)
    .toFixed(2);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRetailers = allRetailers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(allRetailers.length / itemsPerPage);

  const handleSearch = () => {
    console.log("Searching by:", searchBy, "Term:", searchTerm);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
      marginBottom: "20px",
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
            {currentRetailers.map((retailer, index) => (
              <tr key={index}>
                <td style={styles.td}>{retailer.userId}</td>
                <td style={styles.td}>{retailer.name}</td>
                <td style={styles.td}>{retailer.mobile}</td>
                <td style={styles.td}>{retailer.balance}</td>
                <td style={styles.td}>
                  <span style={styles.statusBadge}>{retailer.status}</span>
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

      {/* Pagination */}
      <div style={styles.pagination}>
        <button
          style={styles.pageButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          onMouseEnter={(e) =>
            !e.target.disabled && (e.target.style.background = "#f0f0f0")
          }
          onMouseLeave={(e) =>
            !e.target.disabled && (e.target.style.background = "white")
          }
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
            onMouseEnter={(e) =>
              currentPage !== index + 1 &&
              (e.target.style.background = "#f0f0f0")
            }
            onMouseLeave={(e) =>
              currentPage !== index + 1 && (e.target.style.background = "white")
            }
          >
            {index + 1}
          </button>
        ))}

        <button
          style={styles.pageButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          onMouseEnter={(e) =>
            !e.target.disabled && (e.target.style.background = "#f0f0f0")
          }
          onMouseLeave={(e) =>
            !e.target.disabled && (e.target.style.background = "white")
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageRetailer;
