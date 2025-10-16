import React from "react";
import styles from "./Styles";
import navItems from "./NavItems";
const Header = () => {
  return (
    <>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoSection}>
            <div style={styles.logo}>W</div>
            <div style={styles.brandInfo}>
              <h1 style={styles.brandTitle}>Code Web Telecom</h1>
              <p style={styles.brandSubtitle}>Digital Service Partner</p>
            </div>
          </div>

          <nav style={styles.navMenu}>
            {navItems.map((item, index) => (
              <div key={index} style={styles.navItem} className="nav-item">
                <a href={item.href} style={styles.navLink}>
                  {item.label}
                </a>
                {item.dropdown && (
                  <div style={styles.dropdown} className="dropdown">
                    {item.dropdown.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={`#${subItem.toLowerCase().replace(/\s+/g, "-")}`}
                        style={styles.dropdownItem}
                        className="dropdown-item"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href="#logout" style={styles.navLink}>
              LOG OUT
            </a>
            <button style={styles.menuBtn}>☰ MENU</button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
