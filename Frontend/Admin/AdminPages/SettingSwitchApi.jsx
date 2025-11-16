import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header";

export default function SettingSwitchApi() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [sortField, setSortField] = useState("operatorCode");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/operator-settings`);
      if (res.data.success) setData(res.data.data);
    } catch (err) {
      console.error("Error loading API settings:", err);
    }
  };

  const handleSave = async (operatorCode, selectedApi) => {
    try {
      const payload = { operatorCode, selectedApi };
      const res = await axios.post(`${API_URL}/admin/change-api`, payload);
      if (res.data.success) {
        alert("API updated successfully!");
        fetchData();
      }
    } catch (err) {
      console.error("Error updating API:", err);
      alert("Failed to update API");
    }
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const filtered = data
    .filter((row) =>
      row.operatorCode.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (sortOrder === "asc") return valA > valB ? 1 : -1;
      else return valA < valB ? 1 : -1;
    });

  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.tableHeader}>
            <h2 style={styles.title}>Switch API (Operator Wise)</h2>
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
                <th style={styles.th} onClick={() => handleSort("operatorCode")}>
                  Operator{" "}
                  {sortField === "operatorCode" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th style={styles.th}>Current API</th>
                <th style={styles.th}>Change API</th>
                <th style={styles.th}>Save</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, idx) => (
                <tr key={idx} style={styles.tr}>
                  <td style={styles.td}>{row.operatorCode}</td>

                  <td style={styles.td}>
                    <strong>{row.selectedApi}</strong>
                  </td>

                  <td style={styles.td}>
                    <select
                      id={`api-${row.operatorCode}`}
                      defaultValue={row.selectedApi}
                      style={styles.select}
                    >
                      <option value="A1Topup">A1Topup</option>
                      <option value="A1TOPUP-UTILITY">A1TOPUP-UTILITY</option>
                    </select>
                  </td>

                  <td style={styles.td}>
                    <button
                      style={styles.btnSave}
                      onClick={() => {
                        const newApi = document.getElementById(
                          `api-${row.operatorCode}`
                        ).value;
                        handleSave(row.operatorCode, newApi);
                      }}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p style={styles.noData}>No matching operators found</p>
          )}
        </div>
      </div>
    </>
  );
}

// ---------- STYLES ----------
const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "1000px",
    margin: "0 auto",
    background: "#f5f6fa",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "25px",
    boxShadow: "0 4px px rgba(0,0,0,0.1)",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  title: {
    color: "#333",
  },
  searchBox: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "12px",
    background: "#f7f9fc",
    borderBottom: "2px solid #eee",
    cursor: "pointer",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },
  tr: {
    transition: "0.2s",
  },
  select: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  btnSave: {
    background: "#4c84ff",
    color: "white",
    padding: "8px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  noData: {
    textAlign: "center",
    padding: "15px",
    color: "#aaa",
  },
};
