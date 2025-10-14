import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Smartphone } from "lucide-react";
import styles from "../src/styles";

const Nav = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownItems = [
    { name: "Mini Statement", path: "/mini-statement" },
    { name: "Recharge History", path: "/recharge-history" },
    { name: "Ledger", path: "/ledger" },
    { name: "Refund Report", path: "/refund-report" },
    { name: "My Earning", path: "/my-earning" },
    { name: "Search Transaction", path: "/search-transaction" },
    { name: "Search Plan", path: "/search-plan" },
  ];

  return (
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

          {/* REPORT Dropdown */}
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
            <span style={styles.balanceAmount}>₹0.00</span>
          </div>
          <div style={styles.avatar}>V</div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
