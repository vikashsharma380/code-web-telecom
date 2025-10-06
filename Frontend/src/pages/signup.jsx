// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/auth/register", { name, email, phone, password });
//       alert("Signup Successful. Please login.");
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed");
//     }
//   };
//   return(
//     <div>
//       <h1>signup</h1>
//     </div>
//   )
// }

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        phone,
        password,
      });
      alert("Signup Successful. Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; }
        .signup-container { min-height: 100vh; display: flex; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; }
        .signup-content { display: flex; width: 100%; max-width: 1000px; margin: auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); }
        .signup-left { flex: 1; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 60px 40px; color: white; display: flex; flex-direction: column; justify-content: center; }
        .logo { font-size: 28px; font-weight: 700; margin-bottom: 10px; color: white; }
        .tagline { font-size: 14px; opacity: 0.9; margin-bottom: 40px; }
        .feature-list { list-style: none; }
        .feature-item { display: flex; align-items: center; margin-bottom: 20px; font-size: 15px; }
        .feature-icon { width: 24px; height: 24px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 12px; }
        .signup-right { flex: 1; padding: 60px 50px; display: flex; flex-direction: column; justify-content: center; }
        .signup-header { margin-bottom: 30px; }
        .signup-title { font-size: 32px; font-weight: 700; color: #2d3748; margin-bottom: 10px; }
        .signup-subtitle { color: #718096; font-size: 15px; }
        .signup-form { display: flex; flex-direction: column; }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-size: 14px; font-weight: 600; color: #2d3748; margin-bottom: 8px; }
        .form-input { width: 100%; padding: 12px 16px; font-size: 15px; border: 2px solid #e2e8f0; border-radius: 8px; outline: none; transition: all 0.3s ease; }
        .form-input:focus { border-color: #667eea; box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1); }
        .signup-button { width: 100%; padding: 14px; font-size: 16px; font-weight: 600; color: white; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 8px; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; margin-top: 10px; }
        .signup-button:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3); }
        .signup-button:active { transform: translateY(0); }
        .divider { display: flex; align-items: center; margin: 25px 0; color: #a0aec0; font-size: 14px; }
        .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: #e2e8f0; }
        .divider::before { margin-right: 16px; }
        .divider::after { margin-left: 16px; }
        .login-text { text-align: center; font-size: 14px; color: #4a5568; }
        .login-link { color: #667eea; font-weight: 600; text-decoration: none; margin-left: 5px; cursor: pointer; }
        .login-link:hover { text-decoration: underline; }
        .error-message { color: #e53e3e; font-size: 14px; margin-top: 8px; }
        @media (max-width: 768px) {
          .signup-content { flex-direction: column; }
          .signup-left { padding: 40px 30px; }
          .signup-right { padding: 40px 30px; }
          .signup-title { font-size: 26px; }
        }
      `}</style>

      <div className="signup-container">
        <div className="signup-content">
          <div className="signup-left">
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

          <div className="signup-right">
            <div className="signup-header">
              <h1 className="signup-title">Create Account</h1>
              <p className="signup-subtitle">Sign up to get started</p>
              {error && <p className="error-message">{error}</p>}
            </div>

            <form className="signup-form" onSubmit={handleSignup}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="form-input"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-input"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="signup-button">
                Create Account
              </button>

              <div className="divider">or</div>

              <div className="login-text">
                Already have an account?
                <span className="login-link" onClick={() => navigate("/login")}>
                  Login here
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
