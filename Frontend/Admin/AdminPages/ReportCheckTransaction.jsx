import React, { useState } from "react";
import { Search } from "lucide-react";

const ReportCheckTransaction = () => {
  const [rechargeId, setRechargeId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!rechargeId.trim()) {
      alert("Please enter a Recharge ID");
      return;
    }

    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      // Mock search result
      const mockResult = {
        rechargeId: rechargeId,
        status: "Success",
        amount: "₹500.00",
        transactionDate: "2025-10-30 14:30:25",
        operator: "Airtel",
        mobileNumber: "9876543210",
        apiResponse: "Transaction Successful",
      };

      setSearchResult(mockResult);
      setIsSearching(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "30px auto",
      backgroundColor: "#fff",
      borderRadius: "16px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
      overflow: "hidden",
    },
    header: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      padding: "24px 32px",
      fontSize: "24px",
      fontWeight: "600",
      letterSpacing: "0.5px",
    },
    searchSection: {
      padding: "32px",
      backgroundColor: "#f7fafc",
    },
    formGroup: {
      display: "flex",
      alignItems: "flex-end",
      gap: "16px",
      marginBottom: "0",
    },
    inputWrapper: {
      flex: 1,
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      fontWeight: "600",
      color: "#4a5568",
      letterSpacing: "0.3px",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      fontSize: "14px",
      border: "2px solid #e2e8f0",
      borderRadius: "8px",
      boxSizing: "border-box",
      transition: "all 0.3s ease",
      outline: "none",
    },
    searchBtn: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 28px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      cursor: "pointer",
      fontWeight: "600",
      letterSpacing: "0.5px",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
      height: "46px",
    },
    resultSection: {
      padding: "32px",
      borderTop: "2px solid #e2e8f0",
    },
    resultCard: {
      backgroundColor: "#f7fafc",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      padding: "24px",
      marginTop: "16px",
    },
    resultTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#2d3748",
      marginBottom: "20px",
      paddingBottom: "12px",
      borderBottom: "2px solid #e2e8f0",
    },
    resultGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
    },
    resultItem: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    resultLabel: {
      fontSize: "13px",
      fontWeight: "600",
      color: "#718096",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    resultValue: {
      fontSize: "15px",
      fontWeight: "500",
      color: "#2d3748",
    },
    statusBadge: {
      display: "inline-block",
      padding: "6px 16px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "600",
      backgroundColor: "#48bb78",
      color: "white",
    },
    noResult: {
      textAlign: "center",
      padding: "40px",
      color: "#718096",
      fontSize: "15px",
    },
    loadingSpinner: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px",
      color: "#667eea",
      fontSize: "15px",
      fontWeight: "500",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>Search Transaction by Recharge ID</div>

      <div style={styles.searchSection}>
        <div style={styles.formGroup}>
          <div style={styles.inputWrapper}>
            <label style={styles.label}>Recharge ID:</label>
            <input
              type="text"
              value={rechargeId}
              onChange={(e) => setRechargeId(e.target.value)}
              onKeyPress={handleKeyPress}
              style={styles.input}
              placeholder="Enter Recharge ID"
              onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
              onBlur={(e) => (e.target.style.border = "2px solid #e2e8f0")}
            />
          </div>
          <button
            onClick={handleSearch}
            style={styles.searchBtn}
            disabled={isSearching}
            onMouseOver={(e) => {
              if (!isSearching) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 6px 20px rgba(102, 126, 234, 0.5)";
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
            }}
          >
            <Search size={18} />
            Search
          </button>
        </div>
      </div>

      <div style={styles.resultSection}>
        {isSearching ? (
          <div style={styles.loadingSpinner}>Searching...</div>
        ) : searchResult ? (
          <div style={styles.resultCard}>
            <div style={styles.resultTitle}>Transaction Details</div>
            <div style={styles.resultGrid}>
              <div style={styles.resultItem}>
                <span style={styles.resultLabel}>Recharge ID</span>
                <span style={styles.resultValue}>
                  {searchResult.rechargeId}
                </span>
              </div>
              <div style={styles.resultItem}>
                <span style={styles.resultLabel}>Status</span>
                <span style={styles.statusBadge}>{searchResult.status}</span>
              </div>
              <div style={styles.resultItem}>
                <span style={styles.resultLabel}>Amount</span>
                <span style={styles.resultValue}>{searchResult.amount}</span>
              </div>
              <div style={styles.resultItem}>
                <span style={styles.resultLabel}>Transaction Date</span>
                <span style={styles.resultValue}>
                  {searchResult.transactionDate}
                </span>
              </div>
              <div style={styles.resultItem}>
                <span style={styles.resultLabel}>Operator</span>
                <span style={styles.resultValue}>{searchResult.operator}</span>
              </div>
              <div style={styles.resultItem}>
                <span style={styles.resultLabel}>Mobile Number</span>
                <span style={styles.resultValue}>
                  {searchResult.mobileNumber}
                </span>
              </div>
              <div style={{ ...styles.resultItem, gridColumn: "1 / -1" }}>
                <span style={styles.resultLabel}>API Response</span>
                <span style={styles.resultValue}>
                  {searchResult.apiResponse}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.noResult}>
            Enter a Recharge ID and click Search to view transaction details
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportCheckTransaction;
