import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Smartphone } from "lucide-react";
import styles from "../src/styles";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showSupportDropdown, setShowSupportDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false); // For avatar menu
  const [balance, setBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [showAddFundModal, setShowAddFundModal] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [userName, setUserName] = useState(""); 

  const rechargeUser = {
    username: "500032",
    pwd: "k0ly9gts",
  };

  const dropdownItems = [
    { name: "Mini Statement", path: "/mini-statement" },
    { name: "Recharge History", path: "/recharge-history" },
    { name: "Ledger", path: "/ledger" },
    { name: "Refund Report", path: "/refund-report" },
    { name: "My Earning", path: "/my-earning" },
    { name: "Search Transaction", path: "/search-transaction" },
    { name: "Search Plan", path: "/search-plan" },
  ];

  const accountMenuItems = [
    { name: "CHANGE PASSWORD", path: "/change-password" },
    { name: "EDIT PROFILE", path: "/edit-profile" },
    { name: "MY COMMISSION", path: "/my-commission" },
  ];

  const supportMenuItems = [
    { name: "SUPPORT TICKET", path: "/support-ticket" },
    { name: "ADD FUND", path: "/add-fund" },
    { name: "DOWNLOAD APP", path: "/download-app" },
  ];

  const userMenuItems = [
    { name: "Profile", path: "/profile" },
    { name: "Account", path: "/account" },
    { name: "Settings", path: "/settings" },
    { name: "Logout", path: "/logout" },
  ];
  const [amount, setAmount] = useState("");
const handleAddFund = async () => {
  if (!fundAmount || Number(fundAmount) <= 0) {
    return alert("Please enter a valid amount.");
  }

  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.userId) {
      return alert("User ID missing. Please login again.");
    }

    const body = {
      userId: user.userId,
      amount: Number(fundAmount),
     redirect_url: "https://codewebtelecom.com/mrobo_upi/payment_callback_upi",
    };

    const res = await fetch(`${API_URL}/api/add-fund`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      console.error("Add Fund Error:", data.error || data);
      return alert("❌ " + (data.error || "Something went wrong"));
    }

    // Load SDK
    const script = document.createElement("script");
    script.src = "https://cdn.ekqr.in/ekqr_sdk.js";
    script.onload = () => {
      const paymentSDK = new EKQR({
        sessionId: data.sessionId,
        callbacks: {
          onSuccess: async (response) => {
            console.log("Payment Success:", response);
            alert("✅ Payment Successful!");

            // After success, update wallet balance
            await fetchBalance();
            setShowAddFundModal(false);
          },
          onError: (response) => {
            console.error("Payment Error:", response);
            alert("❌ Payment failed!");
          },
          onCancelled: (response) => {
            console.log("Payment Cancelled:", response);
            alert("⚠️ Payment cancelled");
          },
        },
      });

      paymentSDK.pay(); // open popup
    };

    document.body.appendChild(script);
  } catch (err) {
    console.error("Server error:", err);
    alert("Server error: " + err.message);
  }
};

  const fetchBalance = async () => {
    setBalanceLoading(true);
    try {
      const rechargeUserStr = localStorage.getItem("rechargeUser");
      if (!rechargeUserStr) {
        console.warn("Recharge credentials missing.");
        setBalance(0);
        return;
      }

      const rechargeUser = JSON.parse(rechargeUserStr);
      if (!rechargeUser.username || !rechargeUser.pwd) {
        console.warn("Recharge credentials incomplete.");
        setBalance(0);
        return;
      }

      const query = new URLSearchParams(rechargeUser).toString();
      const res = await fetch(`${API_URL}/api/balance?${query}`);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setBalance(data.balance || 0);
    } catch (err) {
      console.error("Balance fetch failed:", err);
      setBalance(0);
    } finally {
      setBalanceLoading(false);
    }
  };

  useEffect(() => {
    const rechargeUser = JSON.parse(localStorage.getItem("rechargeUser"));
    if (rechargeUser?.username && rechargeUser?.pwd) {
      fetchBalance();
    }
  }, []);


    useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserName(parsedUser?.name || "User"); 
    }
  }, []);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rechargeUser");
    navigate("/"); // Login page par redirect
  };

  return (
    <>
      {showAddFundModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "300px",
            }}
          >
            <h3>Add Fund</h3>
            <input
              type="number"
              placeholder="Enter amount"
              value={fundAmount}
              onChange={(e) => setFundAmount(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                style={{
                  padding: "5px 10px",
                  background: "#4caf50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={handleAddFund}
              >
                Add
              </button>
              <button
                style={{
                  padding: "5px 10px",
                  background: "#ccc",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => setShowAddFundModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          {/* Logo Section */}
          <div style={styles.logoSection}>
            <div style={styles.logoIcon}>
              <Smartphone size={24} />
            </div>
            <div>
              <div style={styles.logoText}>CodeWeb Telecom</div>
              <div style={styles.logoSubtext}>Digital Recharge Partner</div>
            </div>
          </div>

          {/* Nav Links */}
          <div style={styles.navLinks}>
            <Link to="/dashboard" style={styles.navLink}>
              Dashboard
            </Link>

            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <span style={styles.navLink}>Report ▾</span>
              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    background: "#fff",
                    border: "1px solid #ddd",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                    width: "200px",
                    zIndex: 100,
                  }}
                >
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      style={{
                        display: "block",
                        padding: "10px 15px",
                        textDecoration: "none",
                        color: "#333",
                        fontSize: "14px",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.background = "#f4f4f4")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.background = "transparent")
                      }
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setShowAccountDropdown(true)}
              onMouseLeave={() => setShowAccountDropdown(false)}
            >
              <span style={styles.navLink}>Account ▾</span>
              {showAccountDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    background: "#fff",
                    border: "1px solid #ddd",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                    width: "200px",
                    zIndex: 100,
                  }}
                >
                  {accountMenuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      style={{
                        display: "block",
                        padding: "10px 15px",
                        textDecoration: "none",
                        color: "#333",
                        fontSize: "14px",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.background = "#f4f4f4")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.background = "transparent")
                      }
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setShowSupportDropdown(true)}
              onMouseLeave={() => setShowSupportDropdown(false)}
            >
              <span style={styles.navLink}>Support ▾</span>
              {showSupportDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    background: "#fff",
                    border: "1px solid #ddd",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                    width: "200px",
                    zIndex: 100,
                  }}
                >
                  {supportMenuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      style={{
                        display: "block",
                        padding: "10px 15px",
                        textDecoration: "none",
                        color: "#333",
                        fontSize: "14px",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.background = "#f4f4f4")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.background = "transparent")
                      }
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* Logout as Nav Link Style */}
            <Link
              to="/" // ye redirect karne ke liye, handleLogout me navigate() call hoga
              onClick={handleLogout}
              style={styles.navLink} // yahi style use karo jo baki links me hai
            >
              Logout
            </Link>
          </div>

          {/* User Section */}
          <div style={styles.userSection}>
            <div style={styles.balanceBadge}>
              <span style={styles.balanceLabel}>Balance</span>
              <span style={styles.balanceAmount}>
                {balanceLoading ? "..." : `₹${balance.toFixed(2)}`}
              </span>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <button
                style={{
                  padding: "5px 10px",
                  background: "#6709f3ff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                onClick={() => setShowAddFundModal(true)}
              >
                Add Fund
              </button>
            </div>
            {/* Avatar with clickable menu */}
            <div
              style={{ position: "relative" }}
              onClick={() => setShowUserMenu((prev) => !prev)}
            >
             <div style={styles.avatar}>
    {userName ? userName.charAt(0).toUpperCase() : "U"}
  </div>

              {showUserMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "110%",
                    right: 0,
                    background: "#fff",
                    border: "1px solid #ddd",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                    width: "180px",
                    zIndex: 100,
                  }}
                >
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      style={{
                        display: "block",
                        padding: "10px 15px",
                        textDecoration: "none",
                        color: "#333",
                        fontSize: "14px",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.background = "#f4f4f4")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.background = "transparent")
                      }
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
