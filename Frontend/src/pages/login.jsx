// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });
//       localStorage.setItem("token", res.data.token);
//       alert("Login Successful");
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div>
//       <h1>login</h1>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password, rememberMe });
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; }
        .login-container { min-height: 100vh; display: flex; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; }
        .login-content { display: flex; width: 100%; max-width: 1000px; margin: auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); }
        .login-left { flex: 1; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 60px 40px; color: white; display: flex; flex-direction: column; justify-content: center; }
        .logo { font-size: 28px; font-weight: 700; margin-bottom: 10px; color: white; }
        .tagline { font-size: 14px; opacity: 0.9; margin-bottom: 40px; }
        .feature-list { list-style: none; }
        .feature-item { display: flex; align-items: center; margin-bottom: 20px; font-size: 15px; }
        .feature-icon { width: 24px; height: 24px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 12px; }
        .login-right { flex: 1; padding: 60px 50px; display: flex; flex-direction: column; justify-content: center; }
        .login-header { margin-bottom: 40px; }
        .login-title { font-size: 32px; font-weight: 700; color: #2d3748; margin-bottom: 10px; }
        .login-subtitle { color: #718096; font-size: 15px; }
        .login-form { display: flex; flex-direction: column; }
        .form-group { margin-bottom: 24px; }
        .form-label { display: block; font-size: 14px; font-weight: 600; color: #2d3748; margin-bottom: 8px; }
        .form-input { width: 100%; padding: 12px 16px; font-size: 15px; border: 2px solid #e2e8f0; border-radius: 8px; outline: none; transition: all 0.3s ease; }
        .form-input:focus { border-color: #667eea; box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1); }
        .form-options { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .checkbox-wrapper { display: flex; align-items: center; }
        .form-checkbox { width: 18px; height: 18px; margin-right: 8px; cursor: pointer; }
        .checkbox-label { font-size: 14px; color: #4a5568; cursor: pointer; }
        .forgot-password { font-size: 14px; color: #667eea; text-decoration: none; font-weight: 600; cursor: pointer; }
        .forgot-password:hover { text-decoration: underline; }
        .login-button { width: 100%; padding: 14px; font-size: 16px; font-weight: 600; color: white; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 8px; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .login-button:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3); }
        .login-button:active { transform: translateY(0); }
        .divider { display: flex; align-items: center; margin: 30px 0; color: #a0aec0; font-size: 14px; }
        .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: #e2e8f0; }
        .divider::before { margin-right: 16px; }
        .divider::after { margin-left: 16px; }
        .signup-text { text-align: center; font-size: 14px; color: #4a5568; }
        .signup-link { color: #667eea; font-weight: 600; text-decoration: none; margin-left: 5px; cursor: pointer; }
        .signup-link:hover { text-decoration: underline; }
        @media (max-width: 768px) {
          .login-content { flex-direction: column; }
          .login-left { padding: 40px 30px; }
          .login-right { padding: 40px 30px; }
          .login-title { font-size: 26px; }
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
              <li className="feature-item">
                <span className="feature-icon">✓</span> Instant Mobile Recharge
              </li>
              <li className="feature-item">
                <span className="feature-icon">✓</span> DTH & Data Card Services
              </li>
              <li className="feature-item">
                <span className="feature-icon">✓</span> Electricity Bill
                Payments
              </li>
              <li className="feature-item">
                <span className="feature-icon">✓</span> FASTag Recharge
              </li>
              <li className="feature-item">
                <span className="feature-icon">✓</span> Secure & Fast
                Transactions
              </li>
            </ul>
          </div>

          <div className="login-right">
            <div className="login-header">
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">Please login to your account</p>
              {error && (
                <p style={{ color: "red", marginTop: "8px" }}>{error}</p>
              )}
            </div>

            <div className="login-form">
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-options">
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    id="remember"
                    className="form-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember" className="checkbox-label">
                    Remember me
                  </label>
                </div>
                <span
                  className="forgot-password"
                  onClick={() => alert("Forgot password clicked")}
                >
                  Forgot Password?
                </span>
              </div>

              <button className="login-button" onClick={handleLogin}>
                Login
              </button>

              <div className="divider">or</div>

              <div className="signup-text">
                Don't have an account?
                <span
                  className="signup-link"
                
                  onClick={() => navigate("/signup")}
                >
                  Sign up now
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
