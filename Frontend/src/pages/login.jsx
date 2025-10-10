// src/pages/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    if (!userId || !password) {
      setError("Please enter User ID and Password");
      return;
    }

    setLoading(true);
    try {
      // Update the base URL if your backend path differs
      const res = await axios.post(
        "https://code-web-telecom.onrender.com/api/auth/login",
        {
          userId,
          password,
        },
        { timeout: 10000 }
      );

      // Expected backend response: { token, name, ... }
      const { token, name } = res.data;

      // Save token and basic user info
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ userId, name: name || null })
      );

      // If user selected "Remember me" we leave localStorage as is.
      // If not, you might choose to use sessionStorage instead — for now we keep token in localStorage.

      alert("Login successful");
      navigate("/"); // redirect to dashboard or main page
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
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
        .login-container { min-height: 100vh; display: flex; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; }
        .login-content { display: flex; width: 100%; max-width: 1000px; margin: auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.25); }
        .login-left { flex: 1; background: linear-gradient(135deg,#667eea 0%,#764ba2 100%); padding: 60px 40px; color: white; display: flex; flex-direction: column; justify-content: center; }
        .logo { font-size: 28px; font-weight: 700; margin-bottom: 10px; color: white; }
        .tagline { font-size: 14px; opacity: 0.92; margin-bottom: 30px; }
        .feature-list { list-style: none; margin-top: 8px; }
        .feature-item { display: flex; align-items: center; margin-bottom: 16px; font-size: 15px; }
        .feature-icon { width: 28px; height: 28px; background: rgba(255,255,255,0.12); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 14px; }
        .login-right { flex: 1; padding: 60px 50px; display: flex; flex-direction: column; justify-content: center; }
        .login-title { font-size: 30px; font-weight: 700; color: #2d3748; margin-bottom: 8px; }
        .login-subtitle { color: #718096; margin-bottom: 18px; }
        .form-group { margin-bottom: 18px; }
        .form-label { display: block; font-size: 14px; font-weight: 600; color: #2d3748; margin-bottom: 8px; }
        .form-input { width: 100%; padding: 12px 14px; font-size: 15px; border: 2px solid #e2e8f0; border-radius: 8px; outline: none; transition: box-shadow .15s ease, border-color .15s ease; }
        .form-input:focus { border-color: #667eea; box-shadow: 0 6px 18px rgba(102,126,234,0.12); }
        .options { display:flex; justify-content:space-between; align-items:center; margin-bottom: 18px; }
        .checkbox { display:flex; align-items:center; gap:8px; cursor:pointer; color:#4a5568; }
        .login-button { width:100%; padding:12px; background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); color:white; border:none; border-radius:10px; font-weight:700; cursor:pointer; font-size:16px; }
        .login-button:disabled { opacity:0.6; cursor:not-allowed; transform:none; }
        .error { color:#b91c1c; margin-bottom:12px; }
        @media (max-width: 768px) {
          .login-content { flex-direction:column; }
          .login-left, .login-right { padding: 32px; }
          .login-title { font-size: 24px; }
        }
      `}</style>

      <div className="login-container">
        <div className="login-content">
          <div className="login-left">
            <div>
              <div className="logo">Code Web Telecom</div>
              <div className="tagline">Digital Service Partner</div>
            </div>

            <ul className="feature-list">
              <li className="feature-item"><span className="feature-icon">✓</span> Instant Mobile Recharge</li>
              <li className="feature-item"><span className="feature-icon">✓</span> FASTag & Bill Payments</li>
              <li className="feature-item"><span className="feature-icon">✓</span> Secure Transactions</li>
            </ul>
          </div>

          <div className="login-right">
            <div>
              <div className="login-title">Welcome Back</div>
              <div className="login-subtitle">Login using your User ID & Password</div>

              {error && <div className="error">{error}</div>}

              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="form-label" htmlFor="userId">User ID</label>
                  <input
                    id="userId"
                    className="form-input"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter your user id (e.g. 500032)"
                    autoComplete="username"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="password">Password</label>
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
                  <div style={{ color: "#667eea", fontWeight: 700, cursor: "default" }}>Forgot password?</div>
                </div>

                <button className="login-button" type="submit" disabled={loading}>
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
