// import React, { useState } from "react";
// import Header from "../Header";

// const BalanceTransferRetailer = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 25;

//   // Sample data - replace with actual API call
//   const allRetailers = [
//     { userId: "300021", name: "MUNNA KUMAR" },
//     { userId: "300022", name: "neha" },
//     { userId: "300023", name: "Gupta IT Solution" },
//     { userId: "300024", name: "nazar" },
//     { userId: "300025", name: "Imran" },
//     { userId: "300026", name: "sana" },
//     { userId: "300027", name: "Nadeem mallick" },
//     { userId: "300028", name: "Abhishek Dewand" },
//     { userId: "300029", name: "Moin" },
//     { userId: "300031", name: "Ayush Gupta" },
//     { userId: "300046", name: "Mohit Kumar" },
//     { userId: "300072", name: "Manjay Kumar" },
//     { userId: "300073", name: "Prince S" },
//     { userId: "300074", name: "arshad ansari" },
//     { userId: "300075", name: "sabir ansari" },
//     { userId: "300076", name: "Pawan Kumar Gupta" },
//     { userId: "300077", name: "Vinay" },
//     { userId: "300078", name: "prince" },
//     { userId: "300079", name: "om parkash" },
//     { userId: "300091", name: "Shamshaad Khan" },
//     { userId: "300092", name: "Niraj Kumar" },
//     { userId: "300093", name: "Vinay" },
//     { userId: "300094", name: "ATUL PRAKASH" },
//     { userId: "300095", name: "MICKEY USMAN" },
//     { userId: "300096", name: "Sunny Kumar" },
//     { userId: "300097", name: "Sombhu Raj" },
//     { userId: "300098", name: "Piyush Kumar" },
//     { userId: "300099", name: "vijay" },
//     { userId: "300100", name: "Abhishek Ranjan" },
//     { userId: "300101", name: "shashi" },
//     { userId: "300102", name: "Vikash Sharma" },
//     { userId: "300103", name: "ashik ali" },
//   ];

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentRetailers = allRetailers.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );
//   const totalPages = Math.ceil(allRetailers.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const styles = {
//     container: {
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       padding: "20px",
//       fontFamily: "Arial, sans-serif",
//     },
//     header: {
//       background: "linear-gradient(to right, #3b82f6, #2563eb)",
//       color: "white",
//       padding: "15px 20px",
//       fontSize: "18px",
//       fontWeight: "bold",
//       marginBottom: "20px",
//       borderRadius: "8px",
//       boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//     },
//     tableContainer: {
//       background: "white",
//       borderRadius: "8px",
//       overflow: "hidden",
//       boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//       marginBottom: "20px",
//     },
//     table: {
//       width: "100%",
//       borderCollapse: "collapse",
//     },
//     th: {
//       background: "#f8f9fa",
//       padding: "12px",
//       textAlign: "left",
//       fontWeight: "600",
//       fontSize: "14px",
//       color: "#333",
//       borderBottom: "2px solid #ddd",
//     },
//     td: {
//       padding: "12px",
//       fontSize: "14px",
//       borderBottom: "1px solid #f0f0f0",
//       color: "#555",
//     },
//     button: {
//       padding: "8px 16px",
//       border: "none",
//       borderRadius: "4px",
//       fontSize: "13px",
//       fontWeight: "600",
//       cursor: "pointer",
//       transition: "all 0.3s",
//       marginRight: "5px",
//     },
//     addBalanceBtn: {
//       background: "#ef4444",
//       color: "white",
//     },
//     revertBalanceBtn: {
//       background: "#0891b2",
//       color: "white",
//     },
//     loginBtn: {
//       background: "#22c55e",
//       color: "white",
//     },
//     pagination: {
//       background: "white",
//       padding: "15px",
//       borderRadius: "8px",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       gap: "10px",
//       boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//     },
//     pageButton: {
//       padding: "8px 12px",
//       border: "1px solid #ddd",
//       background: "white",
//       color: "#333",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "14px",
//       fontWeight: "600",
//       transition: "all 0.3s",
//     },
//     activePageButton: {
//       background: "#2563eb",
//       color: "white",
//       border: "1px solid #2563eb",
//     },
//   };

//   return (
//     <>
//       {" "}
//       <Header />
//       <div style={styles.container}>
//         <div style={styles.header}>Credit/Debit</div>

//         <div style={styles.tableContainer}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>User ID</th>
//                 <th style={styles.th}>Name</th>
//                 <th style={styles.th}>Add Balance</th>
//                 <th style={styles.th}>Revert Balance</th>
//                 <th style={styles.th}>Login</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentRetailers.map((retailer, index) => (
//                 <tr key={index}>
//                   <td style={styles.td}>{retailer.userId}</td>
//                   <td style={styles.td}>{retailer.name}</td>
//                   <td style={styles.td}>
//                     <button
//                       style={{ ...styles.button, ...styles.addBalanceBtn }}
//                       onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
//                       onMouseLeave={(e) => (e.target.style.opacity = "1")}
//                     >
//                       Add Balance
//                     </button>
//                   </td>
//                   <td style={styles.td}>
//                     <button
//                       style={{ ...styles.button, ...styles.revertBalanceBtn }}
//                       onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
//                       onMouseLeave={(e) => (e.target.style.opacity = "1")}
//                     >
//                       Revert Balance
//                     </button>
//                   </td>
//                   <td style={styles.td}>
//                     <button
//                       style={{ ...styles.button, ...styles.loginBtn }}
//                       onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
//                       onMouseLeave={(e) => (e.target.style.opacity = "1")}
//                     >
//                       Login
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div style={styles.pagination}>
//           <button
//             style={styles.pageButton}
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             onMouseEnter={(e) =>
//               !e.target.disabled && (e.target.style.background = "#f0f0f0")
//             }
//             onMouseLeave={(e) =>
//               !e.target.disabled && (e.target.style.background = "white")
//             }
//           >
//             Previous
//           </button>

//           {[...Array(totalPages)].map((_, index) => (
//             <button
//               key={index + 1}
//               style={
//                 currentPage === index + 1
//                   ? { ...styles.pageButton, ...styles.activePageButton }
//                   : styles.pageButton
//               }
//               onClick={() => handlePageChange(index + 1)}
//               onMouseEnter={(e) =>
//                 currentPage !== index + 1 &&
//                 (e.target.style.background = "#f0f0f0")
//               }
//               onMouseLeave={(e) =>
//                 currentPage !== index + 1 &&
//                 (e.target.style.background = "white")
//               }
//             >
//               {index + 1}
//             </button>
//           ))}

//           <button
//             style={styles.pageButton}
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             onMouseEnter={(e) =>
//               !e.target.disabled && (e.target.style.background = "#f0f0f0")
//             }
//             onMouseLeave={(e) =>
//               !e.target.disabled && (e.target.style.background = "white")
//             }
//           >
//             Next
//           </button>
//         </div>
//       </div>{" "}
//     </>
//   );
// };

// export default BalanceTransferRetailer;

// BalanceTransferRetailer.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const BalanceTransferRetailer = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const allRetailers = [
    { userId: "300021", name: "MUNNA KUMAR" },
    { userId: "300022", name: "neha" },
    { userId: "300023", name: "Gupta IT Solution" },
    { userId: "300024", name: "nazar" },
    { userId: "300025", name: "Imran" },
    { userId: "300026", name: "sana" },
    { userId: "300027", name: "Nadeem mallick" },
    { userId: "300028", name: "Abhishek Dewand" },
    { userId: "300029", name: "Moin" },
    { userId: "300031", name: "Ayush Gupta" },
    { userId: "300046", name: "Mohit Kumar" },
    { userId: "300072", name: "Manjay Kumar" },
    { userId: "300073", name: "Prince S" },
    { userId: "300074", name: "arshad ansari" },
    { userId: "300075", name: "sabir ansari" },
    { userId: "300076", name: "Pawan Kumar Gupta" },
    { userId: "300077", name: "Vinay" },
    { userId: "300078", name: "prince" },
    { userId: "300079", name: "om parkash" },
    { userId: "300091", name: "Shamshaad Khan" },
    { userId: "300092", name: "Niraj Kumar" },
    { userId: "300093", name: "Vinay" },
    { userId: "300094", name: "ATUL PRAKASH" },
    { userId: "300095", name: "MICKEY USMAN" },
    { userId: "300096", name: "Sunny Kumar" },
    { userId: "300097", name: "Sombhu Raj" },
    { userId: "300098", name: "Piyush Kumar" },
    { userId: "300099", name: "vijay" },
    { userId: "300100", name: "Abhishek Ranjan" },
    { userId: "300101", name: "shashi" },
    { userId: "300102", name: "Vikash Sharma" },
    { userId: "300103", name: "ashik ali" },
  ];

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

  const handleLogin = () => {
    navigate("/balance-transfer-retailer");
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
                      onClick={handleLogin}
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
