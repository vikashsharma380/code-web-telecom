import React, { useState } from "react";
import Header from "../Header";

const SettingAddBankDetails = () => {
  const [formData, setFormData] = useState({
    bankName: "",
    ifscCode: "",
    accountNo: "",
    branchName: "",
  });

  const [bankDetails, setBankDetails] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !formData.bankName ||
      !formData.ifscCode ||
      !formData.accountNo ||
      !formData.branchName
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editingIndex !== null) {
      const updated = [...bankDetails];
      updated[editingIndex] = formData;
      setBankDetails(updated);
      setEditingIndex(null);
    } else {
      setBankDetails([...bankDetails, formData]);
    }
    setFormData({
      bankName: "",
      ifscCode: "",
      accountNo: "",
      branchName: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(bankDetails[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setBankDetails(bankDetails.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setFormData({
      bankName: "",
      ifscCode: "",
      accountNo: "",
      branchName: "",
    });
    setEditingIndex(null);
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
      maxWidth: "1200px",
      margin: "0 auto",
    },
    card: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "24px",
      overflow: "hidden",
      marginBottom: "32px",
    },
    cardHeader: {
      padding: "24px 32px",
      background: "linear-gradient(135deg, #4a6cf7 0%, #7c3aed 100%)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    },
    cardTitle: {
      fontSize: "24px",
      fontWeight: "700",
      color: "white",
      margin: 0,
      letterSpacing: "-0.5px",
    },
    cardBody: {
      padding: "32px",
    },
    formGroup: {
      marginBottom: "24px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "600",
      color: "rgba(255, 255, 255, 0.9)",
      marginBottom: "8px",
      letterSpacing: "0.3px",
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      fontSize: "15px",
      color: "white",
      boxSizing: "border-box",
      transition: "all 0.3s ease",
      outline: "none",
    },
    select: {
      width: "100%",
      padding: "14px 16px",
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      fontSize: "15px",
      color: "rgba(255, 255, 255, 0.7)",
      boxSizing: "border-box",
      cursor: "pointer",
      transition: "all 0.3s ease",
      outline: "none",
    },
    buttonGroup: {
      display: "flex",
      gap: "12px",
      marginTop: "32px",
    },
    btnPrimary: {
      padding: "14px 32px",
      background: "linear-gradient(135deg, #4a6cf7 0%, #7c3aed 100%)",
      border: "none",
      borderRadius: "12px",
      color: "white",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 16px rgba(74, 108, 247, 0.4)",
    },
    btnSecondary: {
      padding: "14px 32px",
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "12px",
      color: "white",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: "0 12px",
    },
    tableHeader: {
      background: "rgba(255, 255, 255, 0.05)",
      color: "rgba(255, 255, 255, 0.9)",
      fontSize: "14px",
      fontWeight: "600",
      padding: "16px",
      textAlign: "left",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    },
    tableRow: {
      background: "rgba(255, 255, 255, 0.03)",
      transition: "all 0.3s ease",
    },
    tableCell: {
      padding: "16px",
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: "14px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    },
    actionBtn: {
      padding: "8px 16px",
      background: "transparent",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "8px",
      color: "white",
      fontSize: "13px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginRight: "8px",
    },
    deleteBtn: {
      borderColor: "rgba(239, 68, 68, 0.3)",
      color: "#fca5a5",
    },
    editBtn: {
      borderColor: "rgba(74, 108, 247, 0.3)",
      color: "#a5b4fc",
    },
  };

  return (
    <>
      {" "}
      <Header />
      <div style={styles.container}>
        <div style={styles.bgPattern}></div>

        <div style={styles.content}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Bank Details</h2>
            </div>

            <div style={styles.cardBody}>
              <div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Bank Name :</label>
                  <select
                    name="bankName"
                    style={styles.select}
                    value={formData.bankName}
                    onChange={handleChange}
                  >
                    <option value="">Select Bank</option>
                    <option value="State Bank of India">
                      State Bank of India
                    </option>
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Punjab National Bank">
                      Punjab National Bank
                    </option>
                    <option value="Bank of Baroda">Bank of Baroda</option>
                    <option value="Kotak Mahindra Bank">
                      Kotak Mahindra Bank
                    </option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>IFSC Code :</label>
                  <input
                    type="text"
                    name="ifscCode"
                    style={styles.input}
                    value={formData.ifscCode}
                    onChange={handleChange}
                    placeholder="Enter IFSC Code"
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Account No :</label>
                  <input
                    type="text"
                    name="accountNo"
                    style={styles.input}
                    value={formData.accountNo}
                    onChange={handleChange}
                    placeholder="Enter Account Number"
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Branch Name :</label>
                  <input
                    type="text"
                    name="branchName"
                    style={styles.input}
                    value={formData.branchName}
                    onChange={handleChange}
                    placeholder="Enter Branch Name"
                  />
                </div>

                <div style={styles.buttonGroup}>
                  <button style={styles.btnPrimary} onClick={handleSubmit}>
                    {editingIndex !== null ? "Update" : "Submit"}
                  </button>
                  <button style={styles.btnSecondary} onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          {bankDetails.length > 0 && (
            <div style={styles.card}>
              <div style={styles.cardBody}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>Delete</th>
                      <th style={styles.tableHeader}>Edit</th>
                      <th style={styles.tableHeader}>Bank Name</th>
                      <th style={styles.tableHeader}>IFSC Code</th>
                      <th style={styles.tableHeader}>Account No</th>
                      <th style={styles.tableHeader}>Branch Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bankDetails.map((detail, index) => (
                      <tr key={index} style={styles.tableRow}>
                        <td style={styles.tableCell}>
                          <button
                            style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </button>
                        </td>
                        <td style={styles.tableCell}>
                          <button
                            style={{ ...styles.actionBtn, ...styles.editBtn }}
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </button>
                        </td>
                        <td style={styles.tableCell}>{detail.bankName}</td>
                        <td style={styles.tableCell}>{detail.ifscCode}</td>
                        <td style={styles.tableCell}>{detail.accountNo}</td>
                        <td style={styles.tableCell}>{detail.branchName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>{" "}
    </>
  );
};

export default SettingAddBankDetails;
