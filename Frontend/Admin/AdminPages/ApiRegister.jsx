import React, { useState } from "react";

const ApiRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    postalAddress: "",
    pinCode: "",
    state: "",
    mobileNo: "",
    email: "",
    panGstAadhaar: "",
    contactPerson: "",
    scheme: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      postalAddress: "",
      pinCode: "",
      state: "",
      mobileNo: "",
      email: "",
      panGstAadhaar: "",
      contactPerson: "",
      scheme: "",
    });
  };

  const states = [
    "Select State",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const schemes = [
    "Select Scheme",
    "Retailer",
    "Distributor",
    "Master Distributor",
    "Super Distributor",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "40px 20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          animation: "fadeInUp 0.6s ease-out",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px 20px 0 0",
            padding: "30px",
            borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.25)",
              padding: "8px 20px",
              borderRadius: "20px",
              marginBottom: "12px",
            }}
          >
            <span
              style={{ color: "white", fontSize: "14px", fontWeight: "600" }}
            >
              👤 Logged in as Admin
            </span>
          </div>
          <h1
            style={{
              color: "white",
              fontSize: "32px",
              fontWeight: "bold",
              margin: 0,
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            API Registration Form
          </h1>
        </div>

        {/* Form Section */}
        <div
          style={{
            background: "white",
            borderRadius: "0 0 20px 20px",
            padding: "40px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {/* Name */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Name :
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e5e7eb",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Postal Address */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Postal Address :
              </label>
              <textarea
                name="postalAddress"
                value={formData.postalAddress}
                onChange={handleChange}
                rows="4"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e5e7eb",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  fontFamily: "inherit",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Pin Code */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Pin Code :
              </label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                maxLength="6"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e5e7eb",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* State */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                State :
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e5e7eb",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  backgroundColor: "white",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile No */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Mobile No :
              </label>
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                maxLength="10"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e5e7eb",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Email :
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e5e7eb",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Pan/GST/Aadhaar Number */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Pan /GST/Aadhaar Number:
              </label>
              <input
                type="text"
                name="panGstAadhaar"
                value={formData.panGstAadhaar}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e5e7eb",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Contact Person */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Contact Person :
              </label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e5e7eb",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Select Scheme */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Select Scheme :
              </label>
              <select
                name="scheme"
                value={formData.scheme}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e5e7eb",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  backgroundColor: "white",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              >
                {schemes.map((scheme) => (
                  <option key={scheme} value={scheme}>
                    {scheme}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginTop: "8px",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={handleSubmit}
                style={{
                  flex: "1",
                  minWidth: "150px",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "white",
                  border: "none",
                  padding: "16px 32px",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(102, 126, 234, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(102, 126, 234, 0.4)";
                }}
              >
                Submit Details
              </button>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  flex: "1",
                  minWidth: "150px",
                  background: "#6c757d",
                  color: "white",
                  border: "none",
                  padding: "16px 32px",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#5a6268";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#6c757d";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: "32px",
            color: "white",
            fontSize: "14px",
          }}
        >
          <p style={{ margin: 0, opacity: 0.9 }}>
            Copyright 2025 ©{" "}
            <span style={{ fontWeight: "bold" }}>codewebtelecom.com</span>. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiRegister;
