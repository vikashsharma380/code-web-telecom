import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header";

export default function SettingSetCommission() {
  const [operator, setOperator] = useState("");
  const [commission, setCommission] = useState("");
  const [software, setSoftware] = useState("");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("operator");
  const [sortOrder, setSortOrder] = useState("asc");
  const [data, setData] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch operator list dynamically (from backend)
  const [operators, setOperators] = useState([]);
  const [softwares, setSoftwares] = useState([]);

  useEffect(() => {
    fetchOperators();
    fetchSoftwares();
    fetchData();
  }, []);

  const fetchOperators = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/operators`);
      setOperators(res.data || []);
    } catch (err) {
      console.error("Error fetching operators:", err);
    }
  };

  const fetchSoftwares = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/softwares`);
      setSoftwares(res.data || []);
    } catch (err) {
      console.error("Error fetching softwares:", err);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/commission/all`);
      if (res.data.success) setData(res.data.data);
    } catch (err) {
      console.error("Error fetching commissions:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!operator || !commission || !software) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const payload = {
        operator,
        commission: parseFloat(commission),
        software,
      };
      const res = await axios.post(`${API_URL}/api/commission/set`, payload);
      alert(res.data.message);
      fetchData();
      setOperator("");
      setCommission("");
      setSoftware("");
    } catch (err) {
      console.error("Error saving commission:", err);
      alert("Failed to save commission");
    }
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
      if (sortOrder === "asc") return valA > valB ? 1 : -1;
      else return valA < valB ? 1 : -1;
    });

  return (
    <>
      {" "}
      <Header />
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
                  <option key={i} value={op}>
                    {op}
                  </option>
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
                  <option key={i} value={sw}>
                    {sw}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.btnGroup}>
              <button type="submit" style={styles.btnSave}>
                Save
              </button>
              <button
                type="reset"
                style={styles.btnCancel}
                onClick={() => {
                  setOperator("");
                  setCommission("");
                  setSoftware("");
                }}
              >
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
                  {sortField === "operator" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th style={styles.th} onClick={() => handleSort("commission")}>
                  Commission (%){" "}
                  {sortField === "commission" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th style={styles.th} onClick={() => handleSort("software")}>
                  Software{" "}
                  {sortField === "software" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
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
                      <button
                        style={styles.btnEdit}
                        onClick={() => {
                          setOperator(row.operator);
                          setCommission(row.commission);
                          setSoftware(row.software);
                        }}
                      >
                        Edit
                      </button>
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
      </div>{" "}
    </>
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
  tr: { transition: "background 0.2s" },
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
