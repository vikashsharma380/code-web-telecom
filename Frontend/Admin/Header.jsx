// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "./Styles";
// import navItems from "./NavItems";

// const Header = () => {
//   const [hoveredItem, setHoveredItem] = useState(null);
//   const [popupOption, setPopupOption] = useState(null);
//   const [selectedCustomerType, setSelectedCustomerType] = useState("");
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("userRole");
//     navigate("/");
//   };

//   const handleClosePopup = () => {
//     setPopupOption(null);
//     setSelectedCustomerType("");
//   };

//   const handleConfirm = () => {
//     // Navigate based on popup option and selected customer type
//     if (popupOption === "REGISTER") {
//       if (selectedCustomerType === "Master Distributor") {
//         navigate("/master-distributor-registration");
//       } else if (selectedCustomerType === "Distributor") {
//         navigate("/distributor-registration");
//       } else if (selectedCustomerType === "Retailer") {
//         navigate("/retailer-registration");
//       }
//     } else if (popupOption === "MANAGE") {
//       if (selectedCustomerType === "Master Distributor") {
//         navigate("/manage-master-distributor");
//       } else if (selectedCustomerType === "Distributor") {
//         navigate("/manage-distributor");
//       } else if (selectedCustomerType === "Retailer") {
//         navigate("/manage-retailer");
//       }
//     }

//     // Close popup after navigation
//     handleClosePopup();
//   };

//   const handleDropdownClick = (item, subItem) => {
//     // If it's a CUSTOMERS dropdown item (REGISTER or MANAGE), show popup
//     if (
//       item.label === "CUSTOMERS" &&
//       (subItem.label === "REGISTER" || subItem.label === "MANAGE")
//     ) {
//       setPopupOption(subItem.label);
//     }
//   };

//   return (
//     <>
//       <header style={styles.header}>
//         <div style={styles.headerContent}>
//           {/* Logo Section */}
//           <div style={styles.logoSection}>
//             <div style={styles.logo}>W</div>
//             <div style={styles.brandInfo}>
//               <h1 style={styles.brandTitle}>Code Web Telecom</h1>
//               <p style={styles.brandSubtitle}>Digital Service Partner</p>
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav style={styles.navMenu}>
//             {navItems.map((item, index) => (
//               <div
//                 key={index}
//                 style={styles.navItem}
//                 onMouseEnter={() => setHoveredItem(item.label)}
//                 onMouseLeave={() => setHoveredItem(null)}
//               >
//                 {item.href.startsWith("#") ? (
//                   <a href={item.href} style={styles.navLink}>
//                     {item.label}
//                   </a>
//                 ) : (
//                   <Link to={item.href} style={styles.navLink}>
//                     {item.label}
//                   </Link>
//                 )}

//                 {/* Dropdown */}
//                 {item.dropdown && hoveredItem === item.label && (
//                   <div
//                     style={
//                       item.label === "CUSTOMERS"
//                         ? styles.dropdown
//                         : styles.navDropdown
//                     }
//                   >
//                     {item.dropdown.map((subItem, subIndex) => {
//                       if (
//                         item.label === "CUSTOMERS" &&
//                         (subItem.label === "REGISTER" ||
//                           subItem.label === "MANAGE")
//                       ) {
//                         return (
//                           <div
//                             key={subIndex}
//                             style={styles.dropdownItem}
//                             onClick={() => handleDropdownClick(item, subItem)}
//                           >
//                             {subItem.label}
//                           </div>
//                         );
//                       } else {
//                         return (
//                           <Link
//                             key={subIndex}
//                             to={subItem.route}
//                             style={styles.navDropdownItem}
//                           >
//                             {subItem.label}
//                           </Link>
//                         );
//                       }
//                     })}
//                   </div>
//                 )}
//               </div>
//             ))}

//             {/* Logout */}
//             <span
//               onClick={handleLogout}
//               style={{ ...styles.navLink, cursor: "pointer" }}
//             >
//               LOG OUT
//             </span>
//           </nav>
//         </div>
//       </header>

//       {/* Popup for CUSTOMERS */}
//       {popupOption && (
//         <div style={styles.overlay}>
//           <div style={styles.popup}>
//             <h3 style={styles.popupTitle}>
//               Please Select Customer Type ({popupOption})
//             </h3>
//             <select
//               style={styles.select}
//               value={selectedCustomerType}
//               onChange={(e) => setSelectedCustomerType(e.target.value)}
//             >
//               <option value="">Select...</option>
//               <option value="Master Distributor">Master Distributor</option>
//               <option value="Distributor">Distributor</option>
//               <option value="Retailer">Retailer</option>
//             </select>

//             <div style={styles.popupButtons}>
//               <button style={styles.closeBtn} onClick={handleClosePopup}>
//                 Close
//               </button>
//               <button
//                 style={styles.confirmBtn}
//                 onClick={handleConfirm}
//                 disabled={!selectedCustomerType}
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Styles";
import navItems from "./NavItems";

const Header = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [popupOption, setPopupOption] = useState(null);
  const [selectedCustomerType, setSelectedCustomerType] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const handleClosePopup = () => {
    setPopupOption(null);
    setSelectedCustomerType("");
  };

  const handleConfirm = () => {
    // Navigate based on popup option and selected customer type
    if (popupOption === "REGISTER") {
      if (selectedCustomerType === "Master Distributor") {
        navigate("/master-distributor-registration");
      } else if (selectedCustomerType === "Distributor") {
        navigate("/distributor-registration");
      } else if (selectedCustomerType === "Retailer") {
        navigate("/retailer-registration");
      }
    } else if (popupOption === "MANAGE") {
      if (selectedCustomerType === "Master Distributor") {
        navigate("/manage-master-distributor");
      } else if (selectedCustomerType === "Distributor") {
        navigate("/manage-distributor");
      } else if (selectedCustomerType === "Retailer") {
        navigate("/manage-retailer");
      }
    }
    // ✅ Added new condition for BALANCE TRANSFER
    else if (popupOption === "BALANCE TRANSFER") {
      if (selectedCustomerType === "Master Distributor") {
        navigate("/balance-transfer-master-distributor");
      } else if (selectedCustomerType === "Distributor") {
        navigate("/balance-transfer-distributor");
      } else if (selectedCustomerType === "Retailer") {
        navigate("/balance-transfer-retailer");
      }
    }

    // Close popup after navigation
    handleClosePopup();
  };

  const handleDropdownClick = (item, subItem) => {
    // ✅ Updated condition to include BALANCE TRANSFER
    if (
      item.label === "CUSTOMERS" &&
      (subItem.label === "REGISTER" ||
        subItem.label === "MANAGE" ||
        subItem.label === "BALANCE TRANSFER")
    ) {
      setPopupOption(subItem.label);
    }
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
                {item.dropdown && hoveredItem === item.label && (
                  <div
                    style={
                      item.label === "CUSTOMERS"
                        ? styles.dropdown
                        : styles.navDropdown
                    }
                  >
                    {item.dropdown.map((subItem, subIndex) => {
                      if (
                        item.label === "CUSTOMERS" &&
                        (subItem.label === "REGISTER" ||
                          subItem.label === "MANAGE" ||
                          subItem.label === "BALANCE TRANSFER")
                      ) {
                        return (
                          <div
                            key={subIndex}
                            style={styles.dropdownItem}
                            onClick={() => handleDropdownClick(item, subItem)}
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
            <select
              style={styles.select}
              value={selectedCustomerType}
              onChange={(e) => setSelectedCustomerType(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="Master Distributor">Master Distributor</option>
              <option value="Distributor">Distributor</option>
              <option value="Retailer">Retailer</option>
            </select>

            <div style={styles.popupButtons}>
              <button style={styles.closeBtn} onClick={handleClosePopup}>
                Close
              </button>
              <button
                style={styles.confirmBtn}
                onClick={handleConfirm}
                disabled={!selectedCustomerType}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
