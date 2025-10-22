import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Smartphone } from "lucide-react";
import styles from "../src/styles";

const Nav = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false); // For avatar menu
  const [balance, setBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [showAddFundModal, setShowAddFundModal] = useState(false);
  const [fundAmount, setFundAmount] = useState("");

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

  const userMenuItems = [
    { name: "Profile", path: "/profile" },
    { name: "Account", path: "/account" },
    { name: "Settings", path: "/settings" },
    { name: "Logout", path: "/logout" },
  ];
 const [amount, setAmount] = useState("");
const handleAddFund = async () => {
  if (!fundAmount || Number(fundAmount) <= 0) return;
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("User ID missing. Login again.");

    const res = await fetch("http://localhost:5000/api/add-fund", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ amount: Number(fundAmount), userId }),
    });

    const data = await res.json();
    if (!data.success) return alert("❌ " + data.error);

    // Open payment gateway
    window.open(data.paymentUrl, "_blank");
    setFundAmount("");
    alert("Payment initiated! After success, balance will update automatically.");
  } catch (err) {
    console.error(err);
    alert("Server error: " + err.message);
  }
};





  const fetchBalance = async () => {
    setBalanceLoading(true);
    try {
      const query = new URLSearchParams(rechargeUser).toString();
      const res = await fetch(`http://localhost:5000/api/balance?${query}`);
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
    fetchBalance();
  }, []);

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
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
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

          <a href="#" style={styles.navLink}>
            Account
          </a>
          <a href="#" style={styles.navLink}>
            Support
          </a>
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
      background: "#4caf50",
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
            <div style={styles.avatar}>V</div>

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
