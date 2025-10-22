import React, { useState } from "react";

export default function SettingSetCommission() {
  const [operator, setOperator] = useState("");
  const [commission, setCommission] = useState("");
  const [software, setSoftware] = useState("");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("operator");
  const [sortOrder, setSortOrder] = useState("asc");

  const operators = [
    "Airtel",
    "Airtel Digital TV",
    "Axis Bank Fastag",
    "BSNL Postpaid",
    "Google Pay",
    "ICICI Bank Fastag",
    "Jio Postpaid",
    "Paytm",
    "Vodafone Postpaid",
  ];

  const softwares = ["DISTRIBUTORS", "RETAILERS"];

  const [data, setData] = useState([
    { operator: "Airtel", commission: 0.1, software: "DISTRIBUTORS" },
    { operator: "Jio Postpaid", commission: 0.0, software: "DISTRIBUTORS" },
    { operator: "Airtel", commission: 1.25, software: "RETAILERS" },
    { operator: "BSNL Postpaid", commission: 4.0, software: "RETAILERS" },
    { operator: "Idea", commission: 2.4, software: "RETAILERS" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!operator || !commission || !software) {
      alert("Please fill all fields!");
      return;
    }
    const newEntry = { operator, commission: parseFloat(commission), software };
    setData([...data, newEntry]);
    setOperator("");
    setCommission("");
    setSoftware("");
    alert("Commission added successfully!");
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const filteredData = data
    .filter((row) => row.operator.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (sortOrder === "asc") {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Set Software Commission</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Operator Name</label>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              style={styles.select}
            >
              <option value="">Select Operator</option>
              {operators.map((op, i) => (
                <option key={i}>{op}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Commission (%)</label>
            <input
              type="number"
              placeholder="Enter percentage"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Software Name</label>
            <select
              value={software}
              onChange={(e) => setSoftware(e.target.value)}
              style={styles.select}
            >
              <option value="">Select Software</option>
              {softwares.map((sw, i) => (
                <option key={i}>{sw}</option>
              ))}
            </select>
          </div>

          <div style={styles.btnGroup}>
            <button type="submit" style={styles.btnSave}>
              Save
            </button>
            <button type="reset" style={styles.btnCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div style={styles.card}>
        <div style={styles.tableHeader}>
          <h3 style={styles.tableTitle}>List of Operator Commissions</h3>
          <input
            type="text"
            placeholder="🔍 Search operator..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchBox}
          />
        </div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th} onClick={() => handleSort("operator")}>
                Operator Name{" "}
                {sortField === "operator" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th style={styles.th} onClick={() => handleSort("commission")}>
                Commission (%){" "}
                {sortField === "commission" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th style={styles.th} onClick={() => handleSort("software")}>
                Software{" "}
                {sortField === "software" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr key={index} style={styles.tr}>
                  <td style={styles.td}>{row.operator}</td>
                  <td style={styles.td}>{row.commission.toFixed(2)}</td>
                  <td style={styles.td}>{row.software}</td>
                  <td style={styles.td}>
                    <button style={styles.btnEdit}>Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={styles.noData}>
                  No matching records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------- CSS-in-JS Styling ----------
const styles = {
  container: {
    background: "#f5f6fa",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "40px 20px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "25px 30px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
    marginBottom: "30px",
  },
  title: {
    color: "#333",
    marginBottom: "20px",
    borderBottom: "2px solid #4c84ff",
    display: "inline-block",
    paddingBottom: "5px",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  formGroup: { display: "flex", flexDirection: "column" },
  label: { fontWeight: 600, marginBottom: "6px", color: "#555" },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    transition: "0.2s",
  },
  select: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    transition: "0.2s",
  },
  btnGroup: {
    gridColumn: "1 / -1",
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    marginTop: "10px",
  },
  btnSave: {
    background: "#4c84ff",
    color: "#fff",
    border: "none",
    padding: "10px 22px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
  },
  btnCancel: {
    background: "#e4e6eb",
    border: "none",
    color: "#333",
    padding: "10px 22px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  tableTitle: { color: "#333" },
  searchBox: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    padding: "12px 15px",
    background: "#f7f9fc",
    borderBottom: "2px solid #eee",
    textAlign: "left",
    fontWeight: 600,
    color: "#444",
    cursor: "pointer",
  },
  tr: {
    transition: "background 0.2s",
  },
  td: {
    padding: "12px 15px",
    borderBottom: "1px solid #eee",
    color: "#333",
  },
  btnEdit: {
    background: "#00c16e",
    color: "white",
    border: "none",
    padding: "6px 14px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "13px",
  },
  noData: {
    textAlign: "center",
    padding: "20px",
    color: "#999",
  },
};
