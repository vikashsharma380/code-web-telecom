import React, { useEffect, useState } from "react";
import Nav from "../../hero/nav";

const Ledger = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token"); // JWT token
      const res = await fetch("http://localhost:5000/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.transactions)) {
        setTransactions(data.transactions);
      } else {
        setTransactions([]);
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const styles = {
    container: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #1e1e2e 0%, #2d1b69 50%, #1e1e2e 100%)",
      position: "relative",
      overflow: "hidden",
      padding: "40px 20px",
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
    content: {
      position: "relative",
      maxWidth: "1400px",
      margin: "0 auto",
    },
    header: {
      marginBottom: "32px",
    },
    title: {
      fontSize: "36px",
      fontWeight: "800",
      color: "white",
      margin: "0 0 8px 0",
      letterSpacing: "-1px",
    },
    subtitle: {
      fontSize: "16px",
      color: "rgba(255, 255, 255, 0.6)",
      margin: 0,
    },
    card: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "24px",
      overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    },
    cardHeader: {
      padding: "24px 32px",
      background: "rgba(52, 152, 219, 0.15)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    },
    cardTitle: {
      fontSize: "20px",
      fontWeight: "700",
      color: "white",
      margin: 0,
    },
    tableWrapper: {
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    thead: {
      background: "rgba(255, 255, 255, 0.03)",
    },
    th: {
      padding: "16px 24px",
      textAlign: "left",
      fontSize: "13px",
      fontWeight: "700",
      color: "#a5b4fc",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      whiteSpace: "nowrap",
    },
    td: {
      padding: "20px 24px",
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.8)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    },
    tr: {
      transition: "all 0.3s ease",
    },
    billingIdCell: {
      fontWeight: "600",
      color: "white",
    },
    descriptionCell: {
      maxWidth: "400px",
      color: "rgba(255, 255, 255, 0.8)",
    },
    creditCell: {
      fontWeight: "700",
      color: "#6ee7b7",
      fontSize: "15px",
    },
    debitCell: {
      fontWeight: "700",
      color: "#fca5a5",
      fontSize: "15px",
    },
    balanceCell: {
      fontWeight: "700",
      color: "#a5b4fc",
      fontSize: "15px",
    },
    emptyState: {
      padding: "80px 24px",
      textAlign: "center",
    },
    emptyIcon: {
      fontSize: "64px",
      marginBottom: "16px",
    },
    emptyText: {
      fontSize: "18px",
      fontWeight: "600",
      color: "rgba(255, 255, 255, 0.7)",
      margin: "0 0 8px 0",
    },
    emptySubtext: {
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.4)",
      margin: 0,
    },
  };

  const formatAmount = (amount) => {
    if (amount === undefined || amount === null || isNaN(amount)) return "0.00";
    return Number(amount).toFixed(2);
  };

  return (
    <>
      <Nav />
      <div style={styles.container}>
        <div style={styles.bgPattern} />
        <div style={styles.content}>
          <div style={styles.header}>
            <h1 style={styles.title}>Ledger Report</h1>
            <p style={styles.subtitle}>
              View your credit and debit transaction summary
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Credit Debit Summary</h2>
            </div>

            {transactions.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📊</div>
                <p style={styles.emptyText}>No ledger entries yet</p>
                <p style={styles.emptySubtext}>
                  Your transaction ledger will appear here
                </p>
              </div>
            ) : (
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead style={styles.thead}>
                    <tr>
                      <th style={styles.th}>Billing ID</th>
                      <th style={styles.th}>Date</th>
                      <th style={styles.th}>Description</th>
                      <th style={styles.th}>Credit</th>
                      <th style={styles.th}>Debit</th>
                      <th style={styles.th}>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((txn, index) => (
                      <tr
                        key={index}
                        style={{
                          ...styles.tr,
                          background:
                            index % 2 === 0
                              ? "rgba(255, 255, 255, 0.02)"
                              : "transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(102, 126, 234, 0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            index % 2 === 0
                              ? "rgba(255, 255, 255, 0.02)"
                              : "transparent";
                        }}
                      >
                        <td style={{ ...styles.td, ...styles.billingIdCell }}>
                          {txn.rechargeId || "-"}
                        </td>
                        <td style={styles.td}>
                          {new Date(txn.dateTime).toLocaleString()}
                        </td>
                        <td style={{ ...styles.td, ...styles.descriptionCell }}>
                          {`${txn.operator || ""} - ${txn.number || ""}`}
                        </td>
                        <td style={{ ...styles.td, ...styles.creditCell }}>
                          {txn.status === "Success"
                            ? `₹${formatAmount(txn.amount)}`
                            : "0.00"}
                        </td>
                        <td style={{ ...styles.td, ...styles.debitCell }}>
                          {txn.status !== "Success"
                            ? `₹${formatAmount(txn.amount)}`
                            : "0.00"}
                        </td>
                        <td style={{ ...styles.td, ...styles.balanceCell }}>
                          ₹{formatAmount(txn.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Ledger;
