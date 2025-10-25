import React, { useState } from "react";
import cssStyles from "./cssStyles";
import styles from "./Styles";
import Header from "./Header";
import navItems from "./NavItems";
import HeroSection from "./HeroSection";
import ActionButton from "./ActionButton";
import StatsCard from "./StatsCard";
import RecentPayments from "./RecentPayments";
import CustomersDropdown from "./CustomersDropdown";

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

      <Header />
      <CustomersDropdown />
      <HeroSection />
      <ActionButton />
      <StatsCard />
      <RecentPayments />
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
