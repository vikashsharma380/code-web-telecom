import React from "react";
import styles from "./Styles";
const HeroSection = () => {
  return (
    <div>
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
    </div>
  );
};

export default HeroSection;
