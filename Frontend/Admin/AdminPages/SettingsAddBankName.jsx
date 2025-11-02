import React, { useState } from "react";
import { Edit2 } from "lucide-react";
import Header from "../Header";

const SettingsAddBankName = () => {
  const [bankName, setBankName] = useState("");
  const [banks, setBanks] = useState([
    "AXIS BANK",
    "Bank Of Baroda",
    "Bank Of India",
    "HDFC BANK",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "State Bank Of India",
    "Yes Bank",
  ]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleSubmit = () => {
    if (bankName.trim()) {
      setBanks([...banks, bankName.trim()]);
      setBankName("");
      alert("Bank added successfully!");
    }
  };

  const handleCancel = () => {
    setBankName("");
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditValue(banks[index]);
  };

  const handleSaveEdit = (index) => {
    const updatedBanks = [...banks];
    updatedBanks[index] = editValue;
    setBanks(updatedBanks);
    setEditingIndex(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditValue("");
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
      borderBottom: "2px solid #e2e8f0",
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
    buttonGroup: {
      display: "flex",
      gap: "16px",
    },
    submitBtn: {
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
    },
    cancelBtn: {
      padding: "12px 28px",
      background: "linear-gradient(135deg, #cbd5e0 0%, #a0aec0 100%)",
      color: "#2d3748",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      cursor: "pointer",
      fontWeight: "600",
      letterSpacing: "0.5px",
      transition: "transform 0.2s ease",
    },
    listSection: {
      padding: "32px",
    },
    listHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: "16px",
      marginBottom: "16px",
      borderBottom: "2px solid #e2e8f0",
    },
    listTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#2d3748",
      letterSpacing: "0.3px",
    },
    editHeader: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#667eea",
      letterSpacing: "0.3px",
    },
    bankList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    bankItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 20px",
      marginBottom: "12px",
      backgroundColor: "#f7fafc",
      borderRadius: "8px",
      border: "2px solid #e2e8f0",
      transition: "all 0.3s ease",
    },
    bankItemHover: {
      backgroundColor: "#edf2f7",
      borderColor: "#cbd5e0",
    },
    bankName: {
      fontSize: "14px",
      color: "#2d3748",
      fontWeight: "500",
    },
    editBtn: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 16px",
      background: "transparent",
      border: "2px solid #667eea",
      borderRadius: "6px",
      color: "#667eea",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },
    editBtnHover: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
    },
    editForm: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
      flex: 1,
    },
    editInput: {
      flex: 1,
      padding: "10px 14px",
      fontSize: "14px",
      border: "2px solid #667eea",
      borderRadius: "6px",
      outline: "none",
    },
    saveBtn: {
      padding: "10px 20px",
      background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "13px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "transform 0.2s ease",
    },
    cancelEditBtn: {
      padding: "10px 20px",
      background: "#e53e3e",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "13px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "transform 0.2s ease",
    },
  };

  return (
    <>
      {" "}
      <Header />
      <div style={styles.container}>
        <div style={styles.header}>Insert Bank Name</div>

        {/* Form Section */}
        <div style={styles.formSection}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Bank Name :</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              style={styles.input}
              placeholder="Enter bank name"
              onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
              onBlur={(e) => (e.target.style.border = "2px solid #e2e8f0")}
            />
          </div>

          <div style={styles.buttonGroup}>
            <button
              onClick={handleSubmit}
              style={styles.submitBtn}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 6px 20px rgba(102, 126, 234, 0.5)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 4px 15px rgba(102, 126, 234, 0.4)";
              }}
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
              style={styles.cancelBtn}
              onMouseOver={(e) =>
                (e.target.style.transform = "translateY(-2px)")
              }
              onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Bank List Section */}
        <div style={styles.listSection}>
          <div style={styles.listHeader}>
            <span style={styles.listTitle}>Bank Name</span>
            <span style={styles.editHeader}>Edit</span>
          </div>

          <ul style={styles.bankList}>
            {banks.map((bank, index) => (
              <li
                key={index}
                style={styles.bankItem}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#edf2f7";
                  e.currentTarget.style.borderColor = "#cbd5e0";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#f7fafc";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                {editingIndex === index ? (
                  <div style={styles.editForm}>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      style={styles.editInput}
                    />
                    <button
                      onClick={() => handleSaveEdit(index)}
                      style={styles.saveBtn}
                      onMouseOver={(e) =>
                        (e.target.style.transform = "translateY(-2px)")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.transform = "translateY(0)")
                      }
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      style={styles.cancelEditBtn}
                      onMouseOver={(e) =>
                        (e.target.style.transform = "translateY(-2px)")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.transform = "translateY(0)")
                      }
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span style={styles.bankName}>{bank}</span>
                    <button
                      onClick={() => handleEdit(index)}
                      style={styles.editBtn}
                      onMouseOver={(e) => {
                        e.target.style.background =
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                        e.target.style.color = "white";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.color = "#667eea";
                      }}
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>{" "}
    </>
  );
};

export default SettingsAddBankName;
