import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../LoginCSS/login.css";
export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  console.log("Attempting login with:", { userId, password });

  if (!userId || !password) {
    setError("Please enter User ID/Mobile and Password");
    return;
  }

  setLoading(true);
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      loginInput: userId, 
      password: password
    });

    const { token, user } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    alert("Login successful");
    navigate("/admin-dashboard"); // redirect to admin dashboard
  } catch (err) {
    console.error("Login error:", err);
    const msg =
      err.response?.data?.message ||
      err.message ||
      "Login failed - please try again";
    setError(msg);
  } finally {
    setLoading(false);
  }
};


  return (
    <>
     <div className="login-container">
        <div className="login-content">
          <div className="login-left">
            <div>
              <div className="logo">Code Web Telecom</div>
              <div className="tagline">Digital Service Partner</div>
            </div>

            <ul className="feature-list">
              <li className="feature-item">
                <span className="feature-icon">✓</span> Instant Mobile Recharge
              </li>
              <li className="feature-item">
                <span className="feature-icon">✓</span> FASTag & Bill Payments
              </li>
              <li className="feature-item">
                <span className="feature-icon">✓</span> Secure Transactions
              </li>
            </ul>
          </div>

          <div className="login-right">
            <div>
              <div className="login-title">Welcome Back</div>
              <div className="login-subtitle">
                Login using your User ID/Mobile no. & Password
              </div>

              {error && <div className="error">{error}</div>}

              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="form-label" htmlFor="userId">
                    User ID/Mobile No.
                  </label>
                  <input
                    id="userId"
                    className="form-input"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter your user id/ mobile no."
                    autoComplete="username"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                </div>

                <div className="options">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Remember me
                  </label>
                  <div
                    style={{
                      color: "#667eea",
                      fontWeight: 700,
                      cursor: "default",
                    }}
                  >
                    Forgot password?
                  </div>
                </div>

                <button
                  className="login-button"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
