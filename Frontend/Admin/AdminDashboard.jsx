import React, { useState } from "react";
import styles from "./Styles";
const AdminDashboard = () => {
  const [recentPayments] = useState([]);

  const [recentComplaints] = useState([
    {
      id: 5,
      complaint: "not complete || 7519449209 || 199 || 25-8-2025",
      user: "Gupta IT Solution",
      date: "2025-08-25",
      status: "Solved",
    },
    {
      id: 2,
      complaint: "n",
      user: "Ayush Gupta",
      date: "2025-06-28",
      status: "Unsolved",
    },
    {
      id: 1,
      complaint: "not add money || 7519449209 || 10 || 16-6-2025",
      user: "Gupta IT Solution",
      date: "2025-06-16",
      status: "Solved",
    },
  ]);

  return (
    <div style={styles.container}>
      <style>{cssStyles}</style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoSection}>
            <div style={styles.logo}>W</div>
            <div style={styles.brandInfo}>
              <h1 style={styles.brandTitle}>Code Web Telecom</h1>
              <p style={styles.brandSubtitle}>Digital Service Partner</p>
            </div>
          </div>

          <nav style={styles.navMenu}>
            <a href="#dashboard" style={styles.navLink}>
              DASHBOARD
            </a>
            <a href="#customers" style={styles.navLink}>
              CUSTOMERS
            </a>
            <a href="#api" style={styles.navLink}>
              API PANEL
            </a>
            <a href="#setting" style={styles.navLink}>
              SETTING
            </a>
            <a href="#report" style={styles.navLink}>
              REPORT
            </a>
            <a href="#support" style={styles.navLink}>
              SUPPORT
            </a>
            <a href="#logout" style={styles.navLink}>
              LOG OUT
            </a>
            <button style={styles.menuBtn}>☰ MENU</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.greetingSection}>
            <h2 style={styles.greeting}>Hi, Admin</h2>
            <div style={styles.balanceInfo}>
              <div style={styles.balanceItem}>
                <span style={styles.balanceLabel}>API Bal:</span>
                <span style={styles.balanceAmount}>₹516.60</span>
              </div>
              <div style={styles.balanceItem}>
                <span style={styles.balanceLabel}>Utility Bal:</span>
                <span style={styles.balanceAmount}>₹506.00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <div style={styles.actionButtons}>
        <button style={styles.actionBtn} className="action-btn">
          REGISTER
        </button>
        <button style={styles.actionBtn} className="action-btn">
          BALANCE TRANSFER
        </button>
        <button style={styles.actionBtn} className="action-btn">
          UPDATE NEWS
        </button>
        <button style={styles.actionBtn} className="action-btn">
          SITE ENQUIRY
        </button>
        <button style={styles.actionBtn} className="action-btn">
          ADD API
        </button>
        <button style={styles.actionBtn} className="action-btn">
          UPI GATEWAY
        </button>
        <button style={styles.actionBtn} className="action-btn">
          RECHARGE HISTORY
        </button>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div
          style={{ ...styles.statCard, ...styles.successCard }}
          className="stat-card"
        >
          <div style={{ ...styles.statIcon, ...styles.successIcon }}>✓</div>
          <h3 style={styles.statTitle}>Total Success</h3>
          <p style={styles.statNumber}>199</p>
        </div>
        <div
          style={{ ...styles.statCard, ...styles.failureCard }}
          className="stat-card"
        >
          <div style={{ ...styles.statIcon, ...styles.failureIcon }}>✕</div>
          <h3 style={styles.statTitle}>Total Failure</h3>
          <p style={styles.statNumber}>0</p>
        </div>
        <div
          style={{ ...styles.statCard, ...styles.pendingCard }}
          className="stat-card"
        >
          <div style={{ ...styles.statIcon, ...styles.pendingIcon }}>⏱</div>
          <h3 style={styles.statTitle}>Total Pending</h3>
          <p style={styles.statNumber}>0</p>
        </div>
        <div
          style={{ ...styles.statCard, ...styles.purchaseCard }}
          className="stat-card"
        >
          <div style={{ ...styles.statIcon, ...styles.purchaseIcon }}>🛒</div>
          <h3 style={styles.statTitle}>Total purchase by client</h3>
          <p style={styles.statNumber}>0</p>
        </div>
      </div>

      {/* Recent Payment Request */}
      <div style={styles.dataSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>Recent Payment Request</h3>
        </div>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Mode</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Bank Ref</th>
                <th style={styles.th}>Remark</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "center", padding: "2rem" }}
                  >
                    <button style={styles.processBtn} className="process-btn">
                      Process Payment
                    </button>
                  </td>
                </tr>
              ) : (
                recentPayments.map((payment, index) => (
                  <tr key={index} style={styles.tr}>
                    <td style={styles.td}>{payment.name}</td>
                    <td style={styles.td}>{payment.mode}</td>
                    <td style={styles.td}>{payment.amount}</td>
                    <td style={styles.td}>{payment.bankRef}</td>
                    <td style={styles.td}>{payment.remark}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Complaints */}
      <div style={styles.dataSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>Recent Complain</h3>
        </div>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>Complain ID</th>
                <th style={styles.th}>Complain</th>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Remark</th>
              </tr>
            </thead>
            <tbody>
              {recentComplaints.map((complaint) => (
                <tr key={complaint.id} style={styles.tr} className="table-row">
                  <td style={styles.td}>{complaint.id}</td>
                  <td style={styles.td}>{complaint.complaint}</td>
                  <td style={styles.td}>{complaint.user}</td>
                  <td style={styles.td}>{complaint.date}</td>
                  <td style={styles.td}>
                    <span
                      style={
                        complaint.status === "Solved"
                          ? styles.statusSolved
                          : styles.statusUnsolved
                      }
                    >
                      {complaint.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button style={styles.solveBtn} className="solve-btn">
          Solve Complain
        </button>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Copyright 2025 ©{" "}
          <strong style={styles.footerStrong}>codewebtelecom.com</strong>. All
          Rights Reserved
        </p>
      </footer>
    </div>
  );
};

// const styles = {
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//   },
//   header: {
//     background: "rgba(255, 255, 255, 0.98)",
//     backdropFilter: "blur(10px)",
//     boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
//     position: "sticky",
//     top: 0,
//     zIndex: 100,
//   },
//   headerContent: {
//     maxWidth: "1400px",
//     margin: "0 auto",
//     padding: "1rem 2rem",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexWrap: "wrap",
//     gap: "1rem",
//   },
//   logoSection: {
//     display: "flex",
//     alignItems: "center",
//     gap: "1rem",
//   },
//   logo: {
//     width: "50px",
//     height: "50px",
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     color: "white",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "1.8rem",
//     fontWeight: "bold",
//     borderRadius: "12px",
//     boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
//   },
//   brandInfo: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   brandTitle: {
//     fontSize: "1.3rem",
//     color: "#667eea",
//     fontWeight: 600,
//     margin: 0,
//   },
//   brandSubtitle: {
//     fontSize: "0.85rem",
//     color: "#888",
//     margin: 0,
//   },
//   navMenu: {
//     display: "flex",
//     gap: "2rem",
//     alignItems: "center",
//     flexWrap: "wrap",
//   },
//   navLink: {
//     textDecoration: "none",
//     color: "#555",
//     fontWeight: 500,
//     fontSize: "0.9rem",
//     transition: "color 0.3s ease",
//   },
//   menuBtn: {
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     color: "white",
//     border: "none",
//     padding: "0.6rem 1.2rem",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: 600,
//     fontSize: "0.9rem",
//     boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
//   },
//   heroSection: {
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     padding: "3rem 2rem",
//   },
//   heroContent: {
//     maxWidth: "1400px",
//     margin: "0 auto",
//   },
//   greetingSection: {},
//   greeting: {
//     color: "white",
//     fontSize: "2.5rem",
//     fontWeight: 600,
//     marginBottom: "1.5rem",
//   },
//   balanceInfo: {
//     display: "flex",
//     gap: "3rem",
//     flexWrap: "wrap",
//   },
//   balanceItem: {
//     background: "rgba(255, 255, 255, 0.2)",
//     backdropFilter: "blur(10px)",
//     padding: "1rem 2rem",
//     borderRadius: "12px",
//     display: "flex",
//     alignItems: "center",
//     gap: "1rem",
//   },
//   balanceLabel: {
//     color: "rgba(255, 255, 255, 0.9)",
//     fontSize: "0.95rem",
//   },
//   balanceAmount: {
//     color: "white",
//     fontSize: "1.3rem",
//     fontWeight: 700,
//   },
//   actionButtons: {
//     maxWidth: "1400px",
//     margin: "-2rem auto 2rem",
//     padding: "0 2rem",
//     display: "flex",
//     gap: "1rem",
//     flexWrap: "wrap",
//   },
//   actionBtn: {
//     background: "white",
//     color: "#667eea",
//     border: "none",
//     padding: "0.8rem 1.5rem",
//     borderRadius: "10px",
//     cursor: "pointer",
//     fontWeight: 600,
//     fontSize: "0.85rem",
//     boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
//     transition: "all 0.3s ease",
//   },
//   statsGrid: {
//     maxWidth: "1400px",
//     margin: "0 auto 3rem",
//     padding: "0 2rem",
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//     gap: "2rem",
//   },
//   statCard: {
//     background: "white",
//     padding: "2rem",
//     borderRadius: "20px",
//     boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     textAlign: "center",
//     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   },
//   statIcon: {
//     width: "70px",
//     height: "70px",
//     borderRadius: "50%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "2rem",
//     marginBottom: "1rem",
//   },
//   successIcon: {
//     background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
//     color: "white",
//   },
//   failureIcon: {
//     background: "linear-gradient(135deg, #eb3349 0%, #f45c43 100%)",
//     color: "white",
//   },
//   pendingIcon: {
//     background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//     color: "white",
//   },
//   purchaseIcon: {
//     background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
//     color: "white",
//   },
//   statTitle: {
//     fontSize: "1rem",
//     color: "#666",
//     marginBottom: "0.5rem",
//     fontWeight: 500,
//   },
//   statNumber: {
//     fontSize: "2.5rem",
//     fontWeight: 700,
//     color: "#333",
//     margin: 0,
//   },
//   dataSection: {
//     maxWidth: "1400px",
//     margin: "0 auto 3rem",
//     padding: "0 2rem",
//   },
//   sectionHeader: {
//     background: "white",
//     padding: "1.5rem",
//     borderRadius: "15px 15px 0 0",
//     boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
//   },
//   sectionTitle: {
//     color: "#667eea",
//     fontSize: "1.3rem",
//     fontWeight: 600,
//     margin: 0,
//   },
//   tableContainer: {
//     background: "white",
//     borderRadius: "0 0 15px 15px",
//     overflow: "hidden",
//     boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
//     overflowX: "auto",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//   },
//   thead: {
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//   },
//   th: {
//     color: "white",
//     padding: "1.2rem",
//     textAlign: "left",
//     fontWeight: 600,
//     fontSize: "0.9rem",
//   },
//   tr: {
//     borderBottom: "1px solid #f0f0f0",
//   },
//   td: {
//     padding: "1.2rem",
//     color: "#555",
//     fontSize: "0.9rem",
//   },
//   processBtn: {
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     color: "white",
//     border: "none",
//     padding: "0.8rem 2rem",
//     borderRadius: "10px",
//     cursor: "pointer",
//     fontWeight: 600,
//     fontSize: "0.95rem",
//     boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
//     transition: "all 0.3s ease",
//   },
//   solveBtn: {
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     color: "white",
//     border: "none",
//     padding: "0.8rem 2rem",
//     borderRadius: "10px",
//     cursor: "pointer",
//     fontWeight: 600,
//     fontSize: "0.95rem",
//     marginTop: "1.5rem",
//     boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
//     transition: "all 0.3s ease",
//   },
//   statusSolved: {
//     padding: "0.4rem 1rem",
//     borderRadius: "20px",
//     fontSize: "0.85rem",
//     fontWeight: 600,
//     background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
//     color: "white",
//     display: "inline-block",
//   },
//   statusUnsolved: {
//     padding: "0.4rem 1rem",
//     borderRadius: "20px",
//     fontSize: "0.85rem",
//     fontWeight: 600,
//     background: "linear-gradient(135deg, #eb3349 0%, #f45c43 100%)",
//     color: "white",
//     display: "inline-block",
//   },
//   footer: {
//     background: "rgba(0, 0, 0, 0.8)",
//     color: "white",
//     textAlign: "center",
//     padding: "1.5rem",
//     marginTop: "auto",
//   },
//   footerText: {
//     fontSize: "0.9rem",
//     margin: 0,
//   },
//   footerStrong: {
//     color: "#667eea",
//   },
// };

const cssStyles = `
  .action-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.3);
    background: #667eea !important;
    color: white !important;
  }
  
  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
  
  .table-row:hover {
    background: #f8f9ff;
  }
  
  .process-btn:hover,
  .solve-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`;

export default AdminDashboard;
