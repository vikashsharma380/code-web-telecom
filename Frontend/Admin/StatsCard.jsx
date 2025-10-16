import React from "react";
import styles from "./Styles";
const StatsCard = () => {
  return (
    <div>
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
    </div>
  );
};

export default StatsCard;
