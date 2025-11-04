import React, { useState, useEffect } from "react"; // 👈 useEffect add kar
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const BalanceTransferRetailer = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const [allRetailers, setAllRetailers] = useState([]);

  useEffect(() => {
    fetchRetailers();
  }, []);

  const fetchRetailers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/retailers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setAllRetailers(data.retailers);
      } else {
        alert("Failed to load retailers");
      }
    } catch (err) {
      console.error("Error fetching retailers:", err);
      alert("Server error while fetching retailers");
    }
  };
  const handleAddBalance = async (retailerId) => {
    const amount = prompt("Enter amount to add:");
    if (!amount || isNaN(amount)) return alert("Enter valid number");

    try {
      const res = await fetch(`${API_URL}/api/balance/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ retailerId, amount }),
      });

      const data = await res.json();
      if (data.success) {
        alert(`✅ ${data.message}`);
        fetchRetailers(); // refresh list
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("Add balance error:", err);
      alert("Server error while adding balance");
    }
  };

  const handleRevertBalance = async (retailerId) => {
    const amount = prompt("Enter amount to revert:");
    if (!amount || isNaN(amount)) return alert("Enter valid number");

    try {
      const res = await fetch(`${API_URL}/api/balance/revert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ retailerId, amount }),
      });

      const data = await res.json();
      if (data.success) {
        alert(`♻️ ${data.message}`);
        fetchRetailers(); // refresh list
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("Revert balance error:", err);
      alert("Server error while reverting balance");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRetailers = allRetailers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(allRetailers.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

const handleRetailerLogin = async (retailerId) => {
  try {
    const res = await fetch(`${API_URL}/api/users/${retailerId}`);
    const data = await res.json();

    if (!data.success) return alert(data.message || "Login failed");

    const { user } = data;

    // ✅ Store retailer details in localStorage
    localStorage.setItem(
      "token",
      JSON.stringify({ adminLoginAs: "retailer", userId: user.userId })
    );
    localStorage.setItem("user", JSON.stringify(user));

    alert(`Logged in as ${user.name}`);
    navigate("/MobileRecharge");
  } catch (err) {
    console.error("Login as retailer error:", err);
    alert("Server error while logging in retailer");
  }
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
    <>
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
              {currentRetailers.map((retailer, index) => (
                <tr key={index}>
                  <td style={styles.td}>{retailer.userId}</td>
                  <td style={styles.td}>{retailer.name}</td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.button, ...styles.addBalanceBtn }}
                      onClick={() => handleAddBalance(retailer.userId)} // 👈 added
                      onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                      onMouseLeave={(e) => (e.target.style.opacity = "1")}
                    >
                      Add Balance
                    </button>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.button, ...styles.revertBalanceBtn }}
                      onClick={() => handleRevertBalance(retailer.userId)} // 👈 added
                      onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                      onMouseLeave={(e) => (e.target.style.opacity = "1")}
                    >
                      Revert Balance
                    </button>
                  </td>
                  <td style={styles.td}>
                   <button
  style={{ ...styles.button, ...styles.loginBtn }}
  onClick={() => handleRetailerLogin(retailer.userId)}  // 👈 ye add kiya
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
                currentPage !== index + 1 &&
                (e.target.style.background = "white")
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
    </>
  );
};

export default BalanceTransferRetailer;
