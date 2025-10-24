import React, { useState } from "react";
import { Eye, EyeOff, Lock, Shield, Check } from "lucide-react";

export default function UserChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const passwordStrength = (password) => {
    if (password.length === 0) return { strength: 0, text: "", color: "" };
    if (password.length < 6)
      return { strength: 25, text: "Weak", color: "#ef4444" };
    if (password.length < 8)
      return { strength: 50, text: "Fair", color: "#f97316" };
    if (password.length < 12 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 75, text: "Good", color: "#eab308" };
    }
    if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
      return { strength: 100, text: "Strong", color: "#22c55e" };
    }
    return { strength: 60, text: "Moderate", color: "#3b82f6" };
  };

  const strength = passwordStrength(formData.newPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.oldPassword) {
      newErrors.oldPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.oldPassword === formData.newPassword && formData.oldPassword) {
      newErrors.newPassword =
        "New password must be different from current password";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setSuccess(false), 5000);
    } else {
      setErrors(newErrors);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <div className="form-header">
          <div className="icon-circle">
            <Shield className="shield" />
          </div>
          <h1>Change Password</h1>
          <p>Secure your account with a strong password</p>
        </div>

        <div className="form-body">
          {success && (
            <div className="success-box">
              <Check className="success-icon" />
              <div>
                <p className="success-title">Password Changed Successfully!</p>
                <p className="success-text">
                  Your password has been updated securely.
                </p>
              </div>
            </div>
          )}

          <div className="input-group">
            <label>Current Password</label>
            <div className="input-container">
              <Lock className="input-icon" />
              <input
                type={showPasswords.old ? "text" : "password"}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter current password"
                className={errors.oldPassword ? "error" : ""}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("old")}
                className="eye-btn"
              >
                {showPasswords.old ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.oldPassword && (
              <p className="error-text">{errors.oldPassword}</p>
            )}
          </div>

          <div className="input-group">
            <label>New Password</label>
            <div className="input-container">
              <Lock className="input-icon" />
              <input
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter new password"
                className={errors.newPassword ? "error" : ""}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="eye-btn"
              >
                {showPasswords.new ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {formData.newPassword && (
              <div className="strength">
                <div className="strength-top">
                  <span>Password Strength:</span>
                  <span style={{ color: strength.color }}>{strength.text}</span>
                </div>
                <div className="strength-bar">
                  <div
                    className="strength-fill"
                    style={{
                      width: `${strength.strength}%`,
                      backgroundColor: strength.color,
                    }}
                  ></div>
                </div>
              </div>
            )}
            {errors.newPassword && (
              <p className="error-text">{errors.newPassword}</p>
            )}
          </div>

          <div className="input-group">
            <label>Confirm New Password</label>
            <div className="input-container">
              <Lock className="input-icon" />
              <input
                type={showPasswords.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Confirm new password"
                className={errors.confirmPassword ? "error" : ""}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="eye-btn"
              >
                {showPasswords.confirm ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="requirements">
            <p>Password Requirements:</p>
            <ul>
              <li>At least 8 characters long</li>
              <li>Include uppercase and lowercase letters</li>
              <li>Include numbers and special characters</li>
            </ul>
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            Update Password
          </button>

          <div className="support-text">
            <p>
              Need help?{" "}
              <span className="support-link">Contact Support</span>
            </p>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style>{`
        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #eff6ff, #ffffff, #faf5ff);
        }
        .form-wrapper {
          width: 100%;
          max-width: 420px;
        }
        .form-header {
          background: #fff;
          border-bottom: 4px solid #2563eb;
          padding: 32px;
          text-align: center;
          border-radius: 16px 16px 0 0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        .icon-circle {
          width: 64px;
          height: 64px;
          margin: 0 auto 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .shield { width: 32px; height: 32px; color: #fff; }
        .form-header h1 { font-size: 24px; font-weight: 700; color: #1f2937; margin-bottom: 8px; }
        .form-header p { font-size: 14px; color: #6b7280; }

        .form-body {
          background: #fff;
          padding: 32px;
          border-radius: 0 0 16px 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .success-box {
          background: #f0fdf4;
          border-left: 4px solid #22c55e;
          border-radius: 8px;
          display: flex;
          padding: 12px;
          margin-bottom: 20px;
          align-items: start;
        }
        .success-icon {
          width: 20px;
          height: 20px;
          color: #22c55e;
          margin-right: 12px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .success-title { color: #166534; font-weight: 600; }
        .success-text { color: #15803d; font-size: 13px; }

        .input-group { margin-bottom: 20px; }
        label { display: block; font-weight: 600; font-size: 14px; color: #374151; margin-bottom: 8px; }

        .input-container {
          position: relative;
        }
        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          color: #9ca3af;
        }
        input {
          width: 100%;
          padding: 12px 40px 12px 40px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 14px;
          outline: none;
          transition: border 0.3s;
        }
        input:focus { border-color: #3b82f6; }
        input.error { border-color: #fca5a5; }

        .eye-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
        }
        .eye-btn:hover { color: #4b5563; }

        .error-text {
          color: #ef4444;
          font-size: 13px;
          margin-top: 4px;
          margin-left: 4px;
        }

        .strength { margin-top: 8px; }
        .strength-top {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 4px;
        }
        .strength-bar {
          width: 100%;
          height: 8px;
          background: #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
        }
        .strength-fill {
          height: 100%;
          transition: width 0.3s;
        }

        .requirements {
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 12px;
          padding: 12px;
          font-size: 12px;
          color: #1e40af;
          margin-bottom: 20px;
        }
        .requirements p {
          font-weight: 600;
          margin-bottom: 6px;
        }
        .requirements ul { list-style: disc; margin-left: 20px; }

        .submit-btn {
          width: 100%;
          background: linear-gradient(90deg, #2563eb, #7c3aed);
          color: #fff;
          font-weight: 600;
          font-size: 15px;
          border: none;
          border-radius: 12px;
          padding: 14px;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(37,99,235,0.4);
          transition: all 0.3s;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(37,99,235,0.5);
        }

        .support-text {
          text-align: center;
          margin-top: 16px;
          font-size: 13px;
          color: #6b7280;
        }
        .support-link {
          color: #2563eb;
          font-weight: 600;
          cursor: pointer;
        }
        .support-link:hover { color: #1e3a8a; }
      `}</style>
    </div>
  );
}