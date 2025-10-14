import React from "react";
import { useEffect } from "react";
import {
  Smartphone,
  Zap,
  Clock,
  TrendingUp,
  BarChart3,
  Wallet,
} from "lucide-react";
import Nav from "../../hero/nav";
  const rechargeUser = {
    username: "500032",
    pwd: "k0ly9gts",
  };


export default function Dashboard() {
  const stats = [
    { label: "Total Success", value: 0 },
    { label: "Total Failure", value: 0 },
    { label: "Total Pending", value: 0 },
    { label: "Wallet Topup", value: 0 },
    { label: "Opening Balance", value: 0 },
    { label: "Recharge Debit", value: 0 },
    { label: "Refund Credit", value: 0 },
    { label: "Revert", value: 0 },
  ];

  const [balance, setBalance] = React.useState(0);
  const [balanceLoading, setBalanceLoading] = React.useState(true);

   const fetchBalance = async () => {
      setBalanceLoading(true);
      try {
        const query = new URLSearchParams(rechargeUser).toString();
        const res = await fetch(`http://localhost:5000/api/balance?${query}`);
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
  
    useEffect(() => {
      fetchBalance();
    }, []);
  
  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.bgPattern}></div>

      {/* Navigation Bar */}
   <Nav />

      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroLeft}>
            <div style={styles.welcomeBadge}>
              <Zap size={16} />
              <span>Welcome back, vikash!</span>
            </div>
            <h1 style={styles.heroTitle}>Dashboard Overview</h1>
            <p style={styles.heroSubtitle}>
              Track your recharge statistics and account balance
            </p>

            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <BarChart3 size={20} />
                <div>
                  <div style={styles.statValue}>Balance</div>
                  <span style={styles.balanceAmount}>
              {balanceLoading ? "Loading..." : `₹${balance.toFixed(2)}`}
            </span>
                </div>
              </div>
              <div style={styles.statCard}>
                <Wallet size={20} />
                <div>
                  <div style={styles.statValue}>Add Fund</div>
                  <div style={styles.statLabel}>Quick Topup</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.contentGrid}>
          {/* Statistics Cards */}
          <div style={styles.fullWidth}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <TrendingUp size={24} />
                <div>
                  <h2 style={styles.cardTitle}>Account Statistics</h2>
                  <p style={styles.cardSubtitle}>Your transaction overview</p>
                </div>
              </div>

              <div style={styles.cardBody}>
                <div style={styles.statsCardsGrid}>
                  {stats.map((stat, index) => (
                    <div key={index} style={styles.dashStatCard}>
                      <div style={styles.dashStatLabel}>{stat.label}</div>
                      <div style={styles.dashStatValue}>{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Operator Report */}
          <div style={styles.fullWidth}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <Clock size={24} />
                <div>
                  <h2 style={styles.cardTitle}>Todays Operator Report</h2>
                  <p style={styles.cardSubtitle}>Daily transaction summary</p>
                </div>
              </div>

              <div style={styles.cardBody}>
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.tableHeader}>Company</th>
                        <th style={styles.tableHeader}>Total Success</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="2" style={styles.emptyCell}>
                          <div style={styles.emptyState}>
                            <div style={styles.emptyIcon}>📊</div>
                            <p style={styles.emptyText}>
                              No operator data available
                            </p>
                            <p style={styles.emptySubtext}>
                              Transaction reports will appear here
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © 2025 <span style={styles.footerBrand}>CodeWeb Telecom</span> - All
          Rights Reserved
        </p>
      </footer>
    </div>
  );
}

// === STYLES (Exact copy from MobileRecharge.jsx) ===
const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #1e1e2e 0%, #2d1b69 50%, #1e1e2e 100%)",
    position: "relative",
    overflow: "hidden",
  },
  bgPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.2) 0%, transparent 50%)",
    pointerEvents: "none",
  },
  navbar: {
    background: "rgba(30, 30, 46, 0.8)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "16px 0",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  navContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "32px",
    flexWrap: "wrap",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logoIcon: {
    width: "48px",
    height: "48px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
  },
  logoText: {
    fontSize: "18px",
    fontWeight: "700",
    color: "white",
    letterSpacing: "-0.5px",
  },
  logoSubtext: {
    fontSize: "12px",
    color: "rgba(255, 255, 255, 0.5)",
    marginTop: "2px",
  },
  navLinks: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
  },
  navLink: {
    color: "rgba(255, 255, 255, 0.7)",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    transition: "color 0.3s ease",
    whiteSpace: "nowrap",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  balanceBadge: {
    background: "rgba(102, 126, 234, 0.2)",
    border: "1px solid rgba(102, 126, 234, 0.3)",
    padding: "8px 16px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  balanceLabel: {
    fontSize: "10px",
    color: "rgba(255, 255, 255, 0.5)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  balanceAmount: {
    fontSize: "16px",
    fontWeight: "700",
    color: "white",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
  },
  hero: {
    padding: "60px 32px",
    position: "relative",
  },
  heroContent: {
    maxWidth: "1400px",
    margin: "0 auto",
  },
  heroLeft: {
    maxWidth: "600px",
  },
  welcomeBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(102, 126, 234, 0.2)",
    border: "1px solid rgba(102, 126, 234, 0.3)",
    padding: "8px 16px",
    borderRadius: "100px",
    color: "#a5b4fc",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "24px",
  },
  heroTitle: {
    fontSize: "56px",
    fontWeight: "800",
    color: "white",
    margin: "0 0 16px 0",
    lineHeight: "1.1",
    letterSpacing: "-2px",
  },
  heroSubtitle: {
    fontSize: "18px",
    color: "rgba(255, 255, 255, 0.6)",
    margin: "0 0 32px 0",
    lineHeight: "1.6",
  },
  statsGrid: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  statCard: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "16px 20px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#a5b4fc",
    flex: "1",
    minWidth: "180px",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "700",
    color: "white",
  },
  statLabel: {
    fontSize: "12px",
    color: "rgba(255, 255, 255, 0.5)",
    marginTop: "2px",
  },
  mainContent: {
    padding: "0 32px 60px",
    position: "relative",
  },
  contentGrid: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "32px",
  },
  fullWidth: {
    gridColumn: "1 / -1",
  },
  card: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "24px",
    overflow: "hidden",
  },
  cardHeader: {
    padding: "24px 32px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    color: "#a5b4fc",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "white",
    margin: 0,
  },
  cardSubtitle: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.5)",
    margin: "4px 0 0 0",
  },
  cardBody: {
    padding: "32px",
  },
  statsCardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
  },
  dashStatCard: {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "20px",
    borderRadius: "12px",
    transition: "all 0.3s ease",
  },
  dashStatLabel: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: "8px",
    fontWeight: "500",
  },
  dashStatValue: {
    fontSize: "32px",
    fontWeight: "700",
    color: "white",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    padding: "16px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.7)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(255, 255, 255, 0.03)",
  },
  emptyCell: {
    padding: "0",
    border: "none",
  },
  emptyState: {
    textAlign: "center",
    padding: "48px 24px",
  },
  emptyIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  emptyText: {
    fontSize: "16px",
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.7)",
    margin: "0 0 8px 0",
  },
  emptySubtext: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.4)",
    margin: 0,
  },
  footer: {
    padding: "32px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    textAlign: "center",
  },
  footerText: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.5)",
    margin: 0,
  },
  footerBrand: {
    color: "#a5b4fc",
    fontWeight: "600",
  },
};
