import React, { useState, useEffect } from "react";
import { Search, Calendar } from "lucide-react";

export default function SupportTicket() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all tickets from backend
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/tickets/all");
      const data = await res.json();
      if (data.success) {
        setComplaints(data.tickets);
      }
    } catch (err) {
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // ✅ Filter by date range
  const handleSearch = () => {
    const filtered = complaints.filter((c) => {
      const date = new Date(c.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;
      return (
        (!from || date >= from) &&
        (!to || date <= to)
      );
    });
    setComplaints(filtered);
  };

  // ✅ Update complaint status (Solved/Unsolved)
  const handleActionChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tickets/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setComplaints((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Complaint Management</h1>
        <div style={styles.subtitle}>Track and manage customer complaints</div>
      </div>

      <div style={styles.card}>
        {/* 🔍 Filter Section */}
        <div style={styles.filterSection}>
          <div style={styles.dateInputGroup}>
            <label style={styles.label}>
              <Calendar size={16} style={styles.icon} />
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={styles.dateInput}
            />
          </div>

          <div style={styles.dateInputGroup}>
            <label style={styles.label}>
              <Calendar size={16} style={styles.icon} />
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={styles.dateInput}
            />
          </div>

          <button style={styles.searchButton} onClick={handleSearch}>
            <Search size={18} />
            Search
          </button>
        </div>

        {/* 🧾 Table Section */}
        <div style={styles.tableContainer}>
          {loading ? (
            <p style={{ padding: 20 }}>Loading complaints...</p>
          ) : complaints.length === 0 ? (
            <p style={{ padding: 20 }}>No complaints found</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>User</th>
                  <th style={styles.th}>Subject</th>
                  <th style={styles.th}>Message</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Response</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => (
                  <tr key={c._id} style={styles.tableRow}>
                    <td style={styles.td}>{c._id.slice(-6)}</td>
                    <td style={styles.td}>
                      {new Date(c.date).toLocaleDateString()}
                    </td>
                    <td style={styles.td}>{c.userId?.name || "User"}</td>
                    <td style={styles.td}>{c.subject}</td>
                    <td style={styles.td}>{c.message}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          ...(c.status === "Solved"
                            ? styles.statusSolved
                            : styles.statusUnsolved),
                        }}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td style={styles.td}>{c.response || "-"}</td>
                    <td style={styles.td}>
                      <select
                        style={styles.select}
                        onChange={(e) =>
                          handleActionChange(c._id, e.target.value)
                        }
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="Solved">Solved</option>
                        <option value="Unsolved">Unsolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}




const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 20px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
    color: "white",
  },
  title: {
    fontSize: "42px",
    fontWeight: "700",
    margin: "0 0 10px 0",
    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  subtitle: {
    fontSize: "18px",
    opacity: "0.95",
    fontWeight: "400",
  },
  card: {
    maxWidth: "1400px",
    margin: "0 auto",
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    overflow: "hidden",
  },
  filterSection: {
    padding: "30px",
    background: "linear-gradient(to right, #f8f9fa, #ffffff)",
    borderBottom: "1px solid #e9ecef",
    display: "flex",
    gap: "20px",
    alignItems: "flex-end",
    flexWrap: "wrap",
  },
  dateInputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: "1",
    minWidth: "200px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#495057",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  icon: {
    color: "#667eea",
  },
  dateInput: {
    padding: "12px 16px",
    border: "2px solid #e9ecef",
    borderRadius: "8px",
    fontSize: "15px",
    transition: "all 0.3s ease",
    outline: "none",
    fontFamily: "inherit",
  },
  searchButton: {
    padding: "12px 32px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
    borderBottom: "2px solid #dee2e6",
  },
  th: {
    padding: "16px",
    textAlign: "left",
    fontSize: "13px",
    fontWeight: "700",
    color: "#495057",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  tableRow: {
    borderBottom: "1px solid #f1f3f5",
    transition: "background-color 0.2s ease",
  },
  td: {
    padding: "16px",
    fontSize: "14px",
    color: "#495057",
  },
  businessName: {
    fontWeight: "600",
    color: "#212529",
  },
  message: {
    maxWidth: "300px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: "#6c757d",
  },
  response: {
    maxWidth: "200px",
    color: "#6c757d",
  },
  badge: {
    display: "inline-block",
    padding: "6px 12px",
    background: "#e7f3ff",
    color: "#0066cc",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },
  statusBadge: {
    display: "inline-block",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  statusSolved: {
    background: "#d4edda",
    color: "#155724",
  },
  statusUnsolved: {
    background: "#f8d7da",
    color: "#721c24",
  },
  select: {
    padding: "8px 12px",
    border: "2px solid #e9ecef",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    outline: "none",
    transition: "all 0.3s ease",
    fontFamily: "inherit",
    fontWeight: "500",
    background: "white",
  },
};
