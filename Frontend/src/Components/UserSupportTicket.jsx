import React, { useState } from "react";
import Nav from "../../hero/nav";

export default function UserSupportTicket() {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const [tickets, setTickets] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.subject || !formData.message) {
      alert("Please fill in all fields");
      return;
    }

    const newTicket = {
      id: tickets.length + 1,
      subject: formData.subject,
      message: formData.message,
      date: new Date().toISOString().split("T")[0],
      response: "Not yet responded",
      status: "Open",
    };

    setTickets((prevTickets) => [newTicket, ...prevTickets]);
    setFormData({ subject: "", message: "" });

    alert("Support ticket submitted successfully!");
  };

  // Reset form
  const handleCancel = () => {
    setFormData({ subject: "", message: "" });
  };

  // Badge color logic
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "open":
        return "#3b82f6";
      case "resolved":
        return "#10b981";
      case "pending":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  return (
    <>
      {" "}
      <Nav />
      <div style={styles.container}>
        <div style={styles.wrapper}>
          {/* Header */}
          <div style={styles.header}>
            <h1 style={styles.headerTitle}>Raise Support Ticket</h1>
          </div>

          {/* Form Section */}
          <div style={styles.formCard}>
            <div style={styles.formContent}>
              {/* Subject Field */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Subject :</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  style={styles.select}
                >
                  <option value="">----Select----</option>
                  <option value="Payment Issue">Payment Issue</option>
                  <option value="Account Access">Account Access</option>
                  <option value="Technical Problem">Technical Problem</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Billing Question">Billing Question</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message Field */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Message :</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your issue in detail..."
                  rows="6"
                  style={styles.textarea}
                />
              </div>

              {/* Buttons */}
              <div style={styles.buttonGroup}>
                <button
                  onClick={handleSubmit}
                  style={{ ...styles.button, ...styles.submitButton }}
                >
                  Submit
                </button>
                <button
                  onClick={handleCancel}
                  style={{ ...styles.button, ...styles.cancelButton }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Tickets Table */}
          <div style={styles.tableCard}>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead style={styles.tableHead}>
                  <tr>
                    <th style={styles.th}>Ticket ID</th>
                    <th style={styles.th}>Subject</th>
                    <th style={styles.th}>Message</th>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Response</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody style={styles.tbody}>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} style={styles.tr}>
                      <td style={styles.td}>{ticket.id}</td>
                      <td style={styles.td}>{ticket.subject}</td>
                      <td style={styles.td}>{ticket.message}</td>
                      <td style={styles.td}>{ticket.date}</td>
                      <td style={styles.td}>{ticket.response || "-"}</td>
                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.statusBadge,
                            backgroundColor:
                              getStatusColor(ticket.status) + "20",
                            color: getStatusColor(ticket.status),
                            border: `1px solid ${getStatusColor(
                              ticket.status
                            )}40`,
                          }}
                        >
                          {ticket.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {tickets.length === 0 && (
              <div style={styles.emptyState}>
                <p style={styles.emptyText}>No support tickets found</p>
              </div>
            )}
          </div>
        </div>
      </div>{" "}
    </>
  );
}
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "30px 20px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  wrapper: {
    maxWidth: "1400px",
    margin: "0 auto",
  },
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "25px 30px",
    borderRadius: "15px 15px 0 0",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "0",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: "700",
    margin: "0",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: "0 0 15px 15px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    marginBottom: "30px",
    overflow: "hidden",
  },
  formContent: {
    padding: "35px 30px",
  },
  formGroup: {
    marginBottom: "25px",
  },
  label: {
    display: "block",
    fontSize: "15px",
    fontWeight: "600",
    color: "#334155",
    marginBottom: "10px",
  },
  select: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "15px",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    color: "#334155",
    outline: "none",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  textarea: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "15px",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    color: "#334155",
    outline: "none",
    transition: "all 0.3s ease",
    resize: "vertical",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  buttonGroup: {
    display: "flex",
    gap: "15px",
    marginTop: "30px",
  },
  button: {
    padding: "12px 30px",
    fontSize: "15px",
    fontWeight: "600",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "#ffffff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  submitButton: {
    backgroundColor: "#3b82f6",
  },
  cancelButton: {
    backgroundColor: "#6b7280",
  },
  tableCard: {
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHead: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  th: {
    padding: "18px 20px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "700",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  tbody: {
    backgroundColor: "#ffffff",
  },
  tr: {
    borderBottom: "1px solid #e2e8f0",
    transition: "background-color 0.2s ease",
  },
  td: {
    padding: "18px 20px",
    fontSize: "14px",
    color: "#475569",
  },
  statusBadge: {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    textAlign: "center",
  },
  emptyState: {
    padding: "60px 20px",
    textAlign: "center",
  },
  emptyText: {
    color: "#94a3b8",
    fontSize: "16px",
    margin: "0",
  },
};
