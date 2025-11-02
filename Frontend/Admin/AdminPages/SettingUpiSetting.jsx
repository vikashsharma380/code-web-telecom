import React, { useState } from "react";
import Header from "../Header";

const SettingUpiSetting = () => {
  const [upiId, setUpiId] = useState("");

  const handleUpdate = () => {
    if (upiId.trim()) {
      console.log("UPI ID Updated:", upiId);
      alert("UPI ID updated successfully!");
      // Add your API call here
    } else {
      alert("Please enter a valid UPI ID");
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
    formSection: {
      padding: "32px",
    },
    formGroup: {
      marginBottom: "24px",
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
    updateBtn: {
      padding: "12px 28px",
      background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      cursor: "pointer",
      fontWeight: "600",
      letterSpacing: "0.5px",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      boxShadow: "0 4px 15px rgba(72, 187, 120, 0.4)",
    },
  };

  return (
    <>
      {" "}
      <Header />
      <div style={styles.container}>
        <div style={styles.header}>Update UPI</div>

        <div style={styles.formSection}>
          <div style={styles.formGroup}>
            <label style={styles.label}>UPI ID:</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              style={styles.input}
              placeholder="codeweb@paib"
              onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
              onBlur={(e) => (e.target.style.border = "2px solid #e2e8f0")}
            />
          </div>

          <button
            onClick={handleUpdate}
            style={styles.updateBtn}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(72, 187, 120, 0.5)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(72, 187, 120, 0.4)";
            }}
          >
            Update
          </button>
        </div>
      </div>{" "}
    </>
  );
};

export default SettingUpiSetting;
