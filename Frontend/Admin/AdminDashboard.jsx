import React, { useState } from "react";
import cssStyles from "./cssStyles";
import styles from "./Styles";
import Header from "./Header";
import navItems from "./NavItems";
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
            {navItems.map((item, index) => (
              <div key={index} style={styles.navItem} className="nav-item">
                <a href={item.href} style={styles.navLink}>
                  {item.label}
                </a>
                {item.dropdown && (
                  <div style={styles.dropdown} className="dropdown">
                    {item.dropdown.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={`#${subItem.toLowerCase().replace(/\s+/g, "-")}`}
                        style={styles.dropdownItem}
                        className="dropdown-item"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href="#logout" style={styles.navLink}>
              LOG OUT
            </a>
            <button style={styles.menuBtn}>☰ MENU</button>
          </nav>
        </div>
      </header>

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

export default AdminDashboard;
