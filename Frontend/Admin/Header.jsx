import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Styles";
import navItems from "./NavItems";

const Header = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [popupOption, setPopupOption] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/"); // redirect to login
  };

  const handleClosePopup = () => {
    setPopupOption(null);
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
              <div
                key={index}
                style={styles.navItem}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
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
              {/* Dropdown */}
{item.dropdown && hoveredItem === item.label && (
  <div style={item.label === "CUSTOMERS" ? styles.dropdown : styles.navDropdown}>
    {item.dropdown.map((subItem, subIndex) => {
      if (item.label === "CUSTOMERS") {
        return (
          <div
            key={subIndex}
            style={styles.dropdownItem}
            onClick={() => setPopupOption(subItem.label)}
          >
            {subItem.label}
          </div>
        );
      } else {
        return (
          <Link
            key={subIndex}
            to={subItem.route}
            style={styles.navDropdownItem}
          >
            {subItem.label}
          </Link>
        );
      }
    })}
  </div>
)}

              </div>
            ))}

            {/* Logout */}
            <span
              onClick={handleLogout}
              style={{ ...styles.navLink, cursor: "pointer" }}
            >
              LOG OUT
            </span>
          </nav>
        </div>
      </header>

      {/* Popup for CUSTOMERS */}
      {popupOption && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h3 style={styles.popupTitle}>
              Please Select Customer Type ({popupOption})
            </h3>
            <select style={styles.select}>
              <option>Select...</option>
              <option>Master Distributor</option>
              <option>Distributor</option>
              <option>Retailer</option>
            </select>

            <div style={styles.popupButtons}>
              <button style={styles.closeBtn} onClick={handleClosePopup}>
                Close
              </button>
              <button style={styles.confirmBtn}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
