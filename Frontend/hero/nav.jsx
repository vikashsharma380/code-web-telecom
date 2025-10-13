import React, { useState, useEffect } from "react";
import { Smartphone } from "lucide-react";
import styles from "../src/styles";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Nav() {
  const [balance, setBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      setBalanceLoading(true);
      try {
        // Replace this with your API credentials
        const rechargeUser = {
          username: "500032",
          pwd: "k0ly9gts",
        };
        const query = new URLSearchParams(rechargeUser).toString();
        const res = await fetch(`${API_URL}/api/balance?${query}`);
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const data = await res.json();
        setBalance(data.balance || 0);
      } catch (err) {
        console.error("Balance fetch failed:", err);
        setBalance(0);
      } finally {
        setBalanceLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContent}>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>
            <Smartphone size={24} />
          </div>
          <div>
            <div style={styles.logoText}>CodeWeb Telecom</div>
            <div style={styles.logoSubtext}>Digital Recharge Partner</div>
          </div>
        </div>
        <div style={styles.navLinks}>
          <a href="#" style={styles.navLink}>Dashboard</a>
          <a href="#" style={styles.navLink}>Reports</a>
          <a href="#" style={styles.navLink}>Account</a>
          <a href="#" style={styles.navLink}>Support</a>
        </div>
        <div style={styles.userSection}>
          <div style={styles.balanceBadge}>
            <span style={styles.balanceLabel}>Balance</span>
            <div style={styles.balanceAmount}>
              {balanceLoading ? "Loading..." : `₹${balance.toFixed(2)}`}
            </div>
          </div>
          <div style={styles.avatar}>V</div>
        </div>
      </div>
    </nav>
  );
}
