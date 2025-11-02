import React, { useState } from "react";
import Header from "../Header";

const SettingChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.oldPassword) {
      newErrors.oldPassword = "Old password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Password change submitted:", formData);
    alert("Password changed successfully!");

    // Clear form after successful submission
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  const handleCancel = () => {
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});
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
    inputError: {
      border: "2px solid #e53e3e",
    },
    errorText: {
      color: "#e53e3e",
      fontSize: "12px",
      marginTop: "4px",
      fontWeight: "500",
    },
    buttonGroup: {
      display: "flex",
      gap: "16px",
      marginTop: "32px",
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
  };

  return (
    <>
      {" "}
      <Header />
      <div style={styles.container}>
        <div style={styles.header}>Change Password</div>

        <div style={styles.formSection}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Old Password :</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.oldPassword ? styles.inputError : {}),
              }}
              onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
              onBlur={(e) => {
                if (!errors.oldPassword) {
                  e.target.style.border = "2px solid #e2e8f0";
                }
              }}
            />
            {errors.oldPassword && (
              <div style={styles.errorText}>{errors.oldPassword}</div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>New Password :</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.newPassword ? styles.inputError : {}),
              }}
              onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
              onBlur={(e) => {
                if (!errors.newPassword) {
                  e.target.style.border = "2px solid #e2e8f0";
                }
              }}
            />
            {errors.newPassword && (
              <div style={styles.errorText}>{errors.newPassword}</div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password :</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.confirmPassword ? styles.inputError : {}),
              }}
              onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
              onBlur={(e) => {
                if (!errors.confirmPassword) {
                  e.target.style.border = "2px solid #e2e8f0";
                }
              }}
            />
            {errors.confirmPassword && (
              <div style={styles.errorText}>{errors.confirmPassword}</div>
            )}
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
      </div>{" "}
    </>
  );
};

export default SettingChangePassword;
