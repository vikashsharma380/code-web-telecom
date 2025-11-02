import React, { useState } from "react";
import Header from "../Header";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


const MasterDistributorRegistration = () => {
  const payload = {
  masterDistributorName: formData.masterDistributorName,
  postalAddress: formData.postalAddress,
  pinCode: formData.pinCode,
  state: formData.state,
  cityDistrict: formData.cityDistrict,
  mobile: formData.mobileNo,   // IMPORTANT FIX ✅
  alternateNumber: formData.alternateNumber,
  businessType: formData.businessType,
  email: formData.email,
  panNo: formData.panNo,
  contactPerson: formData.contactPerson,
  selectScheme: formData.selectScheme,
  balance: formData.openingBalance // IMPORTANT FIX ✅
};



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async () => {
  try {
    const res = await axios.post(`${API_URL}/api/master-distributor/register`, payload);

    alert(`Master Distributor Created Successfully!
UserID: ${res.data.userId}
Password: ${res.data.password}`);
    
    // after success clear form
    handleCancel();
  } catch (err) {
    console.log(err);
    alert(err.response?.data?.message || "Something went wrong");
  }
};


  const handleCancel = () => {
    setFormData({
      masterDistributorName: "",
      postalAddress: "",
      pinCode: "",
      state: "",
      cityDistrict: "",
      mobileNo: "",
      alternateNumber: "",
      businessType: "",
      email: "",
      panNo: "",
      contactPerson: "",
      selectScheme: "",
      openingBalance: "",
    });
  };

  const styles = {
    container: {
      maxWidth: "1300px",
      margin: "30px auto",
      backgroundColor: "#ffffff",
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
    formBody: {
      padding: "32px",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px",
      marginBottom: "24px",
    },
    formGroupFull: {
      gridColumn: "1 / -1",
    },
    formGroup: {
      marginBottom: "0",
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
    inputFocus: {
      border: "2px solid #667eea",
    },
    textarea: {
      width: "100%",
      padding: "12px 16px",
      fontSize: "14px",
      border: "2px solid #e2e8f0",
      borderRadius: "8px",
      minHeight: "100px",
      boxSizing: "border-box",
      resize: "vertical",
      transition: "all 0.3s ease",
      outline: "none",
    },
    select: {
      width: "100%",
      padding: "12px 16px",
      fontSize: "14px",
      border: "2px solid #e2e8f0",
      borderRadius: "8px",
      boxSizing: "border-box",
      backgroundColor: "white",
      transition: "all 0.3s ease",
      outline: "none",
      cursor: "pointer",
    },
    buttonGroup: {
      display: "flex",
      gap: "16px",
      marginTop: "32px",
      justifyContent: "flex-end",
    },
    submitBtn: {
      padding: "14px 32px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "15px",
      cursor: "pointer",
      fontWeight: "600",
      letterSpacing: "0.5px",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    },
    cancelBtn: {
      padding: "14px 32px",
      background: "linear-gradient(135deg, #cbd5e0 0%, #a0aec0 100%)",
      color: "#2d3748",
      border: "none",
      borderRadius: "8px",
      fontSize: "15px",
      cursor: "pointer",
      fontWeight: "600",
      letterSpacing: "0.5px",
      transition: "transform 0.2s ease",
    },
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.header}>Master Distributor Registration Form</div>
        <div style={styles.formBody}>
          <div style={styles.formGrid}>
            <div style={styles.formGroupFull}>
              <label style={styles.label}>Master Distributor Name</label>
              <input
                type="text"
                name="masterDistributorName"
                value={formData.masterDistributorName}
                onChange={handleChange}
                style={styles.input}
                onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
                onBlur={(e) => (e.target.style.border = "2px solid #e2e8f0")}
              />
            </div>

            <div style={styles.formGroupFull}>
              <label style={styles.label}>Postal Address</label>
              <textarea
                name="postalAddress"
                value={formData.postalAddress}
                onChange={handleChange}
                style={styles.textarea}
                onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
                onBlur={(e) => (e.target.style.border = "2px solid #e2e8f0")}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Pin Code</label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                style={styles.input}
                onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
                onBlur={(e) => (e.target.style.border = "2px solid #e2e8f0")}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                style={styles.select}
                onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
                onBlur={(e) => (e.target.style.border = "2px solid #e2e8f0")}
              >
                <option value="">Select State</option>
                <option value="Bihar">Bihar</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>City/District</label>
              <select
                name="cityDistrict"
                value={formData.cityDistrict}
                onChange={handleChange}
                style={styles.select}
                onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
                onBlur={(e) => (e.target.style.border = "2px solid #e2e8f0")}
              >
                <option value="">Select City/District</option>
                <option value="Patna">Patna</option>
                <option value="Gaya">Gaya</option>
                <option value="Muzaffarpur">Muzaffarpur</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Mobile No</label>
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                style={styles.input}
                onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
                onBlur={(e) => (e.target.style.border = "2px solid #e2e8f0")}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Alternate Number</label>
              <input
                type="tel"
                name="alternateNumber"
                value={formData.alternateNumber}
                onChange={handleChange}
                style={styles.input}
                onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
                onBlur={(e) => (e.target.style.border = "2px solid #e2e8f0")}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Business Type</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                style={styles.select}
                onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
                onBlur={(e) => (e.target.style.border = "2px solid #e2e8f0")}
              >
                <option value="">Select Business Type</option>
                <option value="Proprietorship">Proprietorship</option>
                <option value="Partnership">Partnership</option>
                <option value="Private Limited">Private Limited</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
                onBlur={(e) => (e.target.style.border = "2px solid #e2e8f0")}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Pan No</label>
              <input
                type="text"
                name="panNo"
                value={formData.panNo}
                onChange={handleChange}
                style={styles.input}
                onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
                onBlur={(e) => (e.target.style.border = "2px solid #e2e8f0")}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Contact Person</label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                style={styles.input}
                onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
                onBlur={(e) => (e.target.style.border = "2px solid #e2e8f0")}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Select Scheme</label>
              <select
                name="selectScheme"
                value={formData.selectScheme}
                onChange={handleChange}
                style={styles.select}
                onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
                onBlur={(e) => (e.target.style.border = "2px solid #e2e8f0")}
              >
                <option value="">Select Scheme</option>
                <option value="Scheme A">Scheme A</option>
                <option value="Scheme B">Scheme B</option>
                <option value="Scheme C">Scheme C</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Opening Balance</label>
              <input
                type="number"
                name="openingBalance"
                value={formData.openingBalance}
                onChange={handleChange}
                style={styles.input}
                onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
                onBlur={(e) => (e.target.style.border = "2px solid #e2e8f0")}
              />
            </div>
          </div>

          <div style={styles.buttonGroup}>
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
              Submit Details
            </button>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default MasterDistributorRegistration;
