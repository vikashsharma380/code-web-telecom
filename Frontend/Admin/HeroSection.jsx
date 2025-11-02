import React, { useEffect, useState } from "react";
import styles from "./Styles";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const HeroSection = () => {
  const [balances, setBalances] = useState({
    utilityBalance: 0,
    apiBalance: 0,
  });

  const fetchBalances = async () => {
    try {
      const res = await fetch(`${API_URL}/api/get-balance`);
      const data = await res.json();
      console.log("Fetched data:", data);
      console.log("API Balance:", data.apiBalance);
      console.log("Utility Balance:", data.utilityBalance);

      setBalances({
        utilityBalance: data.utilityBalance,
        apiBalance: data.apiBalance,
      });
    } catch (err) {
      console.error("Error fetching balances:", err);
    }
  };

  useEffect(() => {
    fetchBalances();
  }, []);

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
                <span style={styles.balanceAmount}>₹{balances.apiBalance}</span>
              </div>
              <div style={styles.balanceItem}>
                <span style={styles.balanceLabel}>Utility Bal:</span>
                <span style={styles.balanceAmount}>
                  ₹{balances.utilityBalance}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
