import React, { useState } from "react";
import Nav from "../../hero/nav";

const SearchPlan = () => {
  const [selectedOperator, setSelectedOperator] = useState("Airtel");
  const [selectedCircle, setSelectedCircle] = useState("All India");
  const [plans, setPlans] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const operators = ["Airtel", "Jio", "Vi", "BSNL"];
  const circles = [
    "All India",
    "Delhi",
    "Mumbai",
    "Kolkata",
    "Chennai",
    "Bihar",
    "UP East",
    "UP West",
  ];

  const allPlans = {
    Airtel: [
      {
        amount: 299,
        description: "Unlimited calls + 1.5GB/day for 28 days",
        validity: "28 days",
        type: "Data",
      },
      {
        amount: 499,
        description: "Unlimited calls + 2GB/day for 28 days",
        validity: "28 days",
        type: "Data",
      },
      {
        amount: 719,
        description: "Unlimited calls + 1.5GB/day for 56 days",
        validity: "56 days",
        type: "Data",
      },
      {
        amount: 839,
        description: "Unlimited calls + 2GB/day for 56 days",
        validity: "56 days",
        type: "Data",
      },
      {
        amount: 149,
        description: "Unlimited calls with 2GB data",
        validity: "28 days",
        type: "Voice",
      },
      {
        amount: 179,
        description: "Unlimited calls for 28 days",
        validity: "28 days",
        type: "Voice",
      },
    ],
    Jio: [
      {
        amount: 239,
        description: "Unlimited calls + 1.5GB/day for 28 days",
        validity: "28 days",
        type: "Data",
      },
      {
        amount: 299,
        description: "Unlimited calls + 2GB/day for 28 days",
        validity: "28 days",
        type: "Data",
      },
      {
        amount: 666,
        description: "Unlimited calls + 1.5GB/day for 56 days",
        validity: "56 days",
        type: "Data",
      },
      {
        amount: 719,
        description: "Unlimited calls + 2GB/day for 56 days",
        validity: "56 days",
        type: "Data",
      },
      {
        amount: 155,
        description: "Unlimited calls with 2GB data",
        validity: "28 days",
        type: "Voice",
      },
      {
        amount: 199,
        description: "Unlimited calls for 28 days",
        validity: "28 days",
        type: "Voice",
      },
    ],
    Vi: [
      {
        amount: 299,
        description: "Unlimited calls + 1.5GB/day for 28 days",
        validity: "28 days",
        type: "Data",
      },
      {
        amount: 479,
        description: "Unlimited calls + 2GB/day for 28 days",
        validity: "28 days",
        type: "Data",
      },
      {
        amount: 699,
        description: "Unlimited calls + 1.5GB/day for 56 days",
        validity: "56 days",
        type: "Data",
      },
      {
        amount: 839,
        description: "Unlimited calls + 2GB/day for 56 days",
        validity: "56 days",
        type: "Data",
      },
      {
        amount: 149,
        description: "Unlimited calls with 2GB data",
        validity: "28 days",
        type: "Voice",
      },
      {
        amount: 179,
        description: "Unlimited calls for 28 days",
        validity: "28 days",
        type: "Voice",
      },
    ],
    BSNL: [
      {
        amount: 187,
        description: "Unlimited calls + 2GB/day for 28 days",
        validity: "28 days",
        type: "Data",
      },
      {
        amount: 247,
        description: "Unlimited calls + 3GB/day for 28 days",
        validity: "28 days",
        type: "Data",
      },
      {
        amount: 399,
        description: "Unlimited calls + 2GB/day for 56 days",
        validity: "56 days",
        type: "Data",
      },
      {
        amount: 666,
        description: "Unlimited calls + 2GB/day for 90 days",
        validity: "90 days",
        type: "Data",
      },
      {
        amount: 107,
        description: "Unlimited calls for 26 days",
        validity: "26 days",
        type: "Voice",
      },
      {
        amount: 153,
        description: "Unlimited calls with 3GB data",
        validity: "24 days",
        type: "Voice",
      },
    ],
  };

  const handleSubmit = () => {
    const operatorPlans = allPlans[selectedOperator] || [];
    setPlans(operatorPlans);
    setShowResults(true);
  };

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
    searchCard: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "24px",
      padding: "32px",
      marginBottom: "32px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    },
    searchHeader: {
      background: "rgba(52, 152, 219, 0.15)",
      padding: "16px 24px",
      borderRadius: "16px",
      marginBottom: "24px",
    },
    searchTitle: {
      fontSize: "18px",
      fontWeight: "700",
      color: "white",
      margin: 0,
    },
    searchForm: {
      display: "flex",
      alignItems: "end",
      gap: "24px",
      flexWrap: "wrap",
    },
    formGroup: {
      flex: "1",
      minWidth: "200px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "600",
      color: "rgba(255, 255, 255, 0.9)",
      marginBottom: "8px",
      letterSpacing: "0.3px",
    },
    select: {
      width: "100%",
      padding: "14px 16px",
      background: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      borderRadius: "12px",
      fontSize: "15px",
      color: "white",
      boxSizing: "border-box",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    submitBtn: {
      padding: "14px 32px",
      background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
      border: "none",
      borderRadius: "12px",
      color: "white",
      fontSize: "16px",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: "0 8px 24px rgba(52, 152, 219, 0.4)",
      transition: "all 0.3s ease",
      whiteSpace: "nowrap",
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
      background: "rgba(102, 126, 234, 0.1)",
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
    amountCell: {
      fontWeight: "700",
      color: "#6ee7b7",
      fontSize: "18px",
    },
    descriptionCell: {
      maxWidth: "400px",
      color: "rgba(255, 255, 255, 0.9)",
      lineHeight: "1.6",
    },
    validityCell: {
      fontWeight: "600",
      color: "#a5b4fc",
    },
    typeBadge: {
      display: "inline-flex",
      alignItems: "center",
      padding: "6px 12px",
      borderRadius: "8px",
      fontSize: "12px",
      fontWeight: "600",
    },
    dataBadge: {
      background: "rgba(102, 126, 234, 0.2)",
      border: "1px solid rgba(102, 126, 234, 0.3)",
      color: "#a5b4fc",
    },
    voiceBadge: {
      background: "rgba(16, 185, 129, 0.2)",
      border: "1px solid rgba(16, 185, 129, 0.3)",
      color: "#6ee7b7",
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

  return (
    <>
      {" "}
      <Nav />
      <div style={styles.container}>
        <div style={styles.bgPattern} />
        <div style={styles.content}>
          <div style={styles.header}>
            <h1 style={styles.title}>Search Plan</h1>
            <p style={styles.subtitle}>
              Browse available recharge plans by operator and circle
            </p>
          </div>

          <div style={styles.searchCard}>
            <div style={styles.searchHeader}>
              <h2 style={styles.searchTitle}>Search Plan</h2>
            </div>
            <div style={styles.searchForm}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Select Operator:</label>
                <select
                  style={styles.select}
                  value={selectedOperator}
                  onChange={(e) => setSelectedOperator(e.target.value)}
                >
                  {operators.map((op) => (
                    <option key={op} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Select Circle:</label>
                <select
                  style={styles.select}
                  value={selectedCircle}
                  onChange={(e) => setSelectedCircle(e.target.value)}
                >
                  {circles.map((circle) => (
                    <option key={circle} value={circle}>
                      {circle}
                    </option>
                  ))}
                </select>
              </div>
              <button
                style={styles.submitBtn}
                onClick={handleSubmit}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(52, 152, 219, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(52, 152, 219, 0.4)";
                }}
              >
                Submit
              </button>
            </div>
          </div>

          {showResults && (
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>
                  Available Plans - {selectedOperator} ({selectedCircle}){" "}
                  {plans.length > 0 && `- ${plans.length} Plans`}
                </h2>
              </div>

              {plans.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>📱</div>
                  <p style={styles.emptyText}>No plans available</p>
                  <p style={styles.emptySubtext}>
                    No plans found for the selected operator and circle
                  </p>
                </div>
              ) : (
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead style={styles.thead}>
                      <tr>
                        <th style={styles.th}>Amount</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Validity</th>
                        <th style={styles.th}>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plans.map((plan, index) => (
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
                          <td style={{ ...styles.td, ...styles.amountCell }}>
                            ₹{plan.amount}
                          </td>
                          <td
                            style={{ ...styles.td, ...styles.descriptionCell }}
                          >
                            {plan.description}
                          </td>
                          <td style={{ ...styles.td, ...styles.validityCell }}>
                            {plan.validity}
                          </td>
                          <td style={styles.td}>
                            <span
                              style={{
                                ...styles.typeBadge,
                                ...(plan.type === "Data"
                                  ? styles.dataBadge
                                  : styles.voiceBadge),
                              }}
                            >
                              {plan.type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>{" "}
    </>
  );
};

export default SearchPlan;
