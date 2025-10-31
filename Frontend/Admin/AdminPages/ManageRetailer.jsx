import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ManageRetailer = () => {
  const [retailers, setRetailers] = useState([]);
  const [searchBy, setSearchBy] = useState("Name");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    distributorName: "",
    address: "",
    pinCode: "",
    state: "",
    city: "",
    mobile: "",
    altMobile: "",
    retailerType: "",
    email: "",
    panNo: "",
    contactPerson: "",
    scheme: "",
  });

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
  const currentRetailers = filteredRetailers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
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
    <>
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}
      </style>
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
                    <button
                      style={{ ...styles.button, ...styles.viewProfileBtn }}
                      onClick={() => {
                        setSelectedUser(retailer);
                        setShowModal(true);
                      }}
                    >
                      View Profile
                    </button>
                  </td>

                  <td style={styles.td}>
                    <button
                      style={{ ...styles.button, ...styles.editProfileBtn }}
                      onClick={() => {
                        setSelectedUser(retailer);
                        setEditData({
                          name: retailer.name || "",
                          distributorName: retailer.distributorName || "",
                          address: retailer.address || "",
                          pinCode: retailer.pinCode || "",
                          state: retailer.state || "",
                          city: retailer.city || "",
                          mobile: retailer.mobile || "",
                          altMobile: retailer.altMobile || "",
                          retailerType: retailer.retailerType || "",
                          email: retailer.email || "",
                          panNo: retailer.panNo || "",
                          contactPerson: retailer.contactPerson || "",
                          scheme: retailer.scheme || "",
                        });
                        setShowEditModal(true);
                      }}
                    >
                      Edit Profile
                    </button>
                  </td>

                  <td style={styles.td}>
                    <button
                      style={{ ...styles.button, ...styles.addBalanceBtn }}
                    >
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
          {showModal && selectedUser && (
            <div style={modalStyles.overlay}>
              <div style={modalStyles.modal}>
                <h2 style={modalStyles.header}>User Profile</h2>

                <div style={modalStyles.body}>
                  <p>
                    <strong>User ID:</strong> {selectedUser.userId}
                  </p>
                  <p>
                    <strong>Name:</strong> {selectedUser.name}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {selectedUser.mobile}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedUser.email || "N/A"}
                  </p>
                  <p>
                    <strong>Balance:</strong> ₹{selectedUser.balance}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedUser.status || "Active"}
                  </p>
                  <p>
                    <strong>Role:</strong> {selectedUser.role || "Retailer"}
                  </p>
                </div>

                <button
                  style={modalStyles.closeButton}
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {showEditModal && selectedUser && (
            <div style={modalStyles.overlay}>
              <div
                style={{
                  ...modalStyles.modal,
                  width: "500px",
                  maxHeight: "90vh",
                  overflowY: "auto",
                }}
              >
                <h2 style={modalStyles.header}>Edit Profile</h2>

                <div style={modalStyles.body}>
                  <label>Retailer Name :</label>
                  <input
                    style={inputStyle}
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />

                  <label>Under Distributor Name :</label>
                  <input
                    style={inputStyle}
                    type="text"
                    value={editData.distributorName}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        distributorName: e.target.value,
                      })
                    }
                  />

                  <label>Postal Address :</label>
                  <textarea
                    style={{ ...inputStyle, height: "60px" }}
                    value={editData.address}
                    onChange={(e) =>
                      setEditData({ ...editData, address: e.target.value })
                    }
                  />

                  <label>Pin Code :</label>
                  <input
                    style={inputStyle}
                    type="text"
                    value={editData.pinCode}
                    onChange={(e) =>
                      setEditData({ ...editData, pinCode: e.target.value })
                    }
                  />

                  <label>State :</label>
                  <select
                    style={inputStyle}
                    value={editData.state}
                    onChange={(e) =>
                      setEditData({ ...editData, state: e.target.value })
                    }
                  >
                    <option value="">Select State</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    {/* aur bhi states add kar sakte ho */}
                  </select>

                  <label>City/District :</label>
                  <select
                    style={inputStyle}
                    value={editData.city}
                    onChange={(e) =>
                      setEditData({ ...editData, city: e.target.value })
                    }
                  >
                    <option value="">Select City</option>
                    <option value="Gwalior">Gwalior</option>
                    <option value="Bhopal">Bhopal</option>
                    <option value="Indore">Indore</option>
                  </select>

                  <label>Mobile No :</label>
                  <input
                    style={inputStyle}
                    type="text"
                    value={editData.mobile}
                    onChange={(e) =>
                      setEditData({ ...editData, mobile: e.target.value })
                    }
                  />

                  <label>Alternate Number :</label>
                  <input
                    style={inputStyle}
                    type="text"
                    value={editData.altMobile}
                    onChange={(e) =>
                      setEditData({ ...editData, altMobile: e.target.value })
                    }
                  />

                  <label>Retailer Type :</label>
                  <input
                    style={inputStyle}
                    type="text"
                    value={editData.retailerType}
                    onChange={(e) =>
                      setEditData({ ...editData, retailerType: e.target.value })
                    }
                  />

                  <label>Email :</label>
                  <input
                    style={inputStyle}
                    type="email"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                  />

                  <label>Pan No :</label>
                  <input
                    style={inputStyle}
                    type="text"
                    value={editData.panNo}
                    onChange={(e) =>
                      setEditData({ ...editData, panNo: e.target.value })
                    }
                  />

                  <label>Contact Person :</label>
                  <input
                    style={inputStyle}
                    type="text"
                    value={editData.contactPerson}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        contactPerson: e.target.value,
                      })
                    }
                  />

                  <label>Scheme :</label>
                  <input
                    style={inputStyle}
                    type="text"
                    value={editData.scheme}
                    onChange={(e) =>
                      setEditData({ ...editData, scheme: e.target.value })
                    }
                  />
                </div>

                <button
                  style={modalStyles.closeButton}
                  onClick={async () => {
                    try {
                      await axios.put(
                        `${API_URL}/api/users/${selectedUser._id}`,
                        editData
                      );
                      alert("Profile updated successfully!");
                      setRetailers((prev) =>
                        prev.map((r) =>
                          r._id === selectedUser._id ? { ...r, ...editData } : r
                        )
                      );
                      setShowEditModal(false);
                    } catch (err) {
                      console.error("Error updating profile:", err);
                      alert("Error updating profile!");
                    }
                  }}
                >
                  Save Changes
                </button>

                <button
                  style={{
                    ...modalStyles.closeButton,
                    background: "#ef4444",
                    marginTop: "10px",
                  }}
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "25px",
    width: "400px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    textAlign: "left",
    animation: "fadeIn 0.3s ease",
  },
  header: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "15px",
    textAlign: "center",
  },
  body: {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#333",
  },
  closeButton: {
    display: "block",
    width: "100%",
    padding: "10px 0",
    marginTop: "20px",
    background: "#2563eb",
    color: "white",
    fontWeight: "600",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "14px",
};

export default ManageRetailer;
