  import React from "react";
import { Zap, Clock } from "lucide-react";
import styles from "../src/styles";
export default function Hero() {
  return (
  <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroLeft}>
            <div style={styles.welcomeBadge}>
              <Zap size={16} />
              <span>Welcome back, Vikash!</span>
            </div>
            <h1 style={styles.heroTitle}>FASTag Recharge</h1>
            <p style={styles.heroSubtitle}>
              Recharge your FASTag quickly and securely
            </p>

            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <Zap size={20} />
                <div>
                  <div style={styles.statValue}>50,000+</div>
                  <div style={styles.statLabel}>Users Trust Us</div>
                </div>
              </div>
              <div style={styles.statCard}>
                <Clock size={20} />
                <div>
                  <div style={styles.statValue}>2 Sec</div>
                  <div style={styles.statLabel}>Avg. Processing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
  );
}
