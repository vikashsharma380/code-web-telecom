import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Styles";
import  navItems  from "./NavItems";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  console.log(navItems);
  const navigate = useNavigate(); // navigate hook

  const handleLogout = () => {
    // 1. Clear token or user info from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole"); // agar koi role store kiya hai

    // 2. Redirect to login page
    navigate("/"); // login route ya default page
  };


  return (
    <>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          {/* Logo Section */}
          <div style={styles.logoSection}>
            <div style={styles.logo}>W</div>
            <div style={styles.brandInfo}>
              <h1 style={styles.brandTitle}>Code Web Telecom</h1>
              <p style={styles.brandSubtitle}>Digital Service Partner</p>
            </div>
          </div>

          {/* Navigation */}
          <nav style={styles.navMenu}>
            {navItems.map((item, index) => (
              <div key={index} style={styles.navItem} className="nav-item">
                {item.href.startsWith("#") ? (
                  <a href={item.href} style={styles.navLink}>
                    {item.label}
                  </a>
                ) : (
                  <Link to={item.href} style={styles.navLink}>
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {item.dropdown && (
                  <div style={styles.dropdown} className="dropdown">
                    {item.dropdown.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.route}
                        style={styles.dropdownItem}
                        className="dropdown-item"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Log Out */}
            <span
              onClick={handleLogout}
              style={{ ...styles.navLink, cursor: "pointer" }}
            >
              LOG OUT
            </span>

            {/* Mobile Menu Button */}
            <button
              style={styles.menuBtn}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰ MENU
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
