import React from "react";
import styles from "./Styles";
const RecentPayments = () => {
  return (
    <div>
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
              {RecentPayments.length === 0 ? (
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
                RecentPayments.map((payment, index) => (
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
    </div>
  );
};

export default RecentPayments;
