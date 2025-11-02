import React, { useState } from "react";
import Header from "../../Admin/Header";
import Nav from "../../hero/nav";

export default function UserEditProfile() {
  const [formData, setFormData] = useState({
    legalName: "vikash",
    postalAddress: "Lig 361 sarjana colony tilapur gwalior",
    pinCode: "474011",
    cityDistrict: "N/A",
    state: "N/A",
    mobileNo: "9319207807",
    alternateNumber: "0",
    email: "vikashpandit30@gmail.com",
    gstnPan: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateDetails = () => {
    console.log("Profile updated:", formData);
    alert("Profile details updated successfully!");
  };

  const handleCancel = () => {
    console.log("Update cancelled");
  };

  return (
    <>
      {" "}
      <Nav />
      <div style={styles.container}>
        <div style={styles.wrapper}>
          {/* Header */}
          <div style={styles.header}>
            <h2 style={styles.headerTitle}>Profile Edit</h2>
          </div>

          {/* Form Section */}
          <div style={styles.formCard}>
            <div style={styles.formContent}>
              {/* Legal Name */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Legal Name :</label>
                <input
                  type="text"
                  name="legalName"
                  value={formData.legalName}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              {/* Postal Address */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Postal Address :</label>
                <textarea
                  name="postalAddress"
                  value={formData.postalAddress}
                  onChange={handleInputChange}
                  rows="3"
                  style={styles.textarea}
                />
              </div>

              {/* Pin Code */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Pin Code :</label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              {/* City/District */}
              <div style={styles.formGroup}>
                <label style={styles.label}>City/District :</label>
                <input
                  type="text"
                  name="cityDistrict"
                  value={formData.cityDistrict}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              {/* State */}
              <div style={styles.formGroup}>
                <label style={styles.label}>State :</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              {/* Mobile No */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Mobile No :</label>
                <input
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              {/* Alternate Number */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Alternate Number :</label>
                <input
                  type="tel"
                  name="alternateNumber"
                  value={formData.alternateNumber}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              {/* Email */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Email :</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              {/* GSTN or PAN Number */}
              <div style={styles.formGroup}>
                <label style={styles.label}>GSTN or PAN Number :</label>
                <input
                  type="text"
                  name="gstnPan"
                  value={formData.gstnPan}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              {/* Action Buttons */}
              <div style={styles.buttonGroup}>
                <button
                  onClick={handleUpdateDetails}
                  style={{ ...styles.button, ...styles.updateButton }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#2874a6")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#3498db")
                  }
                >
                  Update Details
                </button>
                <button
                  onClick={handleCancel}
                  style={{ ...styles.button, ...styles.cancelButton }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#d5d8dc")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#ecf0f1")
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f6fa",
    padding: "20px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  wrapper: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  header: {
    backgroundColor: "#3498db",
    padding: "15px 20px",
    borderRadius: "4px 4px 0 0",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: "500",
    margin: "0",
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: "0 0 4px 4px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  formContent: {
    padding: "25px 20px",
  },
  formGroup: {
    marginBottom: "18px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "#2c3e50",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #dcdde1",
    borderRadius: "4px",
    backgroundColor: "#f8f9fa",
    color: "#2c3e50",
    outline: "none",
    transition: "border-color 0.2s ease, background-color 0.2s ease",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #dcdde1",
    borderRadius: "4px",
    backgroundColor: "#f8f9fa",
    color: "#2c3e50",
    outline: "none",
    transition: "border-color 0.2s ease, background-color 0.2s ease",
    resize: "vertical",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "25px",
  },
  button: {
    padding: "10px 24px",
    fontSize: "14px",
    fontWeight: "500",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  updateButton: {
    backgroundColor: "#3498db",
    color: "#ffffff",
  },
  cancelButton: {
    backgroundColor: "#ecf0f1",
    color: "#2c3e50",
  },
};
