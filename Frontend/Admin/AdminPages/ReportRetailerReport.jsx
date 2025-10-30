import React, { useState } from "react";

export default function ReportRetailerReport() {
  const [retailer, setRetailer] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSearch = () => {
    console.log("Retailer:", retailer);
    console.log("From Date:", fromDate);
    console.log("To Date:", toDate);
    alert(
      `Search Triggered!\nRetailer: ${retailer}\nFrom: ${fromDate}\nTo: ${toDate}`
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>Retailer Recharge Report</div>

      <div style={styles.formContainer}>
        <label style={styles.label}>Select Retailer:</label>
        <select
          style={styles.select}
          value={retailer}
          onChange={(e) => setRetailer(e.target.value)}
        >
          <option value="">--Select--</option>
          <option value="Retailer 1">Retailer 1</option>
          <option value="Retailer 2">Retailer 2</option>
          <option value="Retailer 3">Retailer 3</option>
        </select>

        <label style={styles.label}>From Date:</label>
        <input
          type="date"
          style={styles.input}
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <label style={styles.label}>To Date:</label>
        <input
          type="date"
          style={styles.input}
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <button style={styles.button} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #7f5af0, #4361ee)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "60px",
    color: "#fff",
  },
  header: {
    width: "80%",
    background: "#354fce",
    padding: "10px 15px",
    fontWeight: "600",
    fontSize: "16px",
    color: "white",
    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  },
  formContainer: {
    background: "white",
    width: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "20px",
    borderBottomLeftRadius: "6px",
    borderBottomRightRadius: "6px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    flexWrap: "wrap",
  },
  label: {
    marginRight: "10px",
    color: "#333",
    fontSize: "14px",
    fontWeight: "500",
  },
  select: {
    marginRight: "20px",
    padding: "6px 10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
  },
  input: {
    marginRight: "20px",
    padding: "6px 10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    background: "#354fce",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "6px 14px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.3s",
  },
};
