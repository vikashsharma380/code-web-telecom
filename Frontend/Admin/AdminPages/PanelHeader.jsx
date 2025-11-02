// import React, { useState, useEffect } from "react";
// import { Menu, X, ChevronDown } from "lucide-react";

// export default function PanelHeader() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [userRole, setUserRole] = useState("master_distributor");

//   useEffect(() => {
//     const savedRole = localStorage.getItem("selectedRole");
//     if (savedRole) setUserRole(savedRole);
//   }, []);

//   const navConfig = {
//     master_distributor: {
//       DASHBOARD: [],
//       DISTRIBUTOR: ["ADD DISTRIBUTOR", "MANAGE DISTRIBUTOR", "RETAILER REPORT"],
//       REPORT: [
//         "MINI STATEMENT",
//         "RECHARGE HISTORY",
//         "BILLING SUMMARY",
//         "REFUND REPORT",
//         "MY EARNING",
//         "WITHDRAW COMMISSION",
//         "SEARCH TRANSACTION",
//         "SEARCH PLAN",
//       ],
//       "MY ACCOUNT": ["CHANGE PASSWORD", "EDIT PROFILE", "MY COMMISSION"],
//       SUPPORT: [
//         "SUPPORT TICKET",
//         "BANK DETAILS",
//         "CONTACT DETAILS",
//         "ADD FUND",
//         "DOWNLOAD APP",
//       ],
//     },
//     distributor: {
//       DASHBOARD: [],
//       RETAILER: ["ADD RETAILER", "MANAGE RETAILER", "RETAILER REPORT"],
//       REPORT: [
//         "MINI STATEMENT",
//         "RECHARGE HISTORY",
//         "BILLING SUMMARY",
//         "REFUND REPORT",
//         "MY EARNING",
//         "WITHDRAW COMMISSION",
//         "SEARCH TRANSACTION",
//         "SEARCH PLAN",
//       ],
//       "MY ACCOUNT": ["CHANGE PASSWORD", "EDIT PROFILE", "MY COMMISSION"],
//       SUPPORT: [
//         "SUPPORT TICKET",
//         "BANK DETAILS",
//         "CONTACT DETAILS",
//         "ADD FUND",
//         "DOWNLOAD APP",
//       ],
//     },
//     retailer: {
//       DASHBOARD: [],
//       REPORT: [
//         "MINI STATEMENT",
//         "RECHARGE HISTORY",
//         "BILLING SUMMARY",
//         "REFUND REPORT",
//         "SEARCH TRANSACTION",
//       ],
//       "MY ACCOUNT": ["CHANGE PASSWORD", "EDIT PROFILE"],
//       SUPPORT: ["SUPPORT TICKET", "CONTACT DETAILS", "DOWNLOAD APP"],
//     },
//   };

//   const currentNav = navConfig[userRole] || navConfig.master_distributor;

//   const toggleDropdown = (menu) => {
//     setOpenDropdown(openDropdown === menu ? null : menu);
//   };

//   const handleMenuClick = (item) => {
//     console.log("Clicked:", item);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("selectedRole");
//     window.location.href = "/";
//   };

//   return (
//     <header
//       style={{
//         background: "#ffffff",
//         boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//         padding: "10px 30px",
//         position: "sticky",
//         top: 0,
//         zIndex: 1000,
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "1300px",
//           margin: "0 auto",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <div
//             style={{
//               background: "linear-gradient(135deg, #6b73ff 0%, #000dff 100%)",
//               color: "white",
//               fontWeight: "bold",
//               fontSize: "22px",
//               width: "40px",
//               height: "40px",
//               borderRadius: "8px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             W
//           </div>
//         </div>

//         <ul
//           style={{
//             display: "flex",
//             alignItems: "center",
//             listStyle: "none",
//             gap: "15px",
//             margin: 0,
//             padding: 0,
//           }}
//           className="desktop-nav"
//         >
//           {Object.keys(currentNav).map((menu) => (
//             <li key={menu} style={{ position: "relative" }}>
//               <button
//                 onClick={() =>
//                   currentNav[menu].length > 0
//                     ? toggleDropdown(menu)
//                     : handleMenuClick(menu)
//                 }
//                 style={{
//                   background: "none",
//                   border: "none",
//                   color: "#333",
//                   fontWeight: "600",
//                   cursor: "pointer",
//                   padding: "10px 15px",
//                   borderRadius: "6px",
//                   fontSize: "14px",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "5px",
//                   transition: "0.3s",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.target.style.color = "rgb(80, 56, 255)")
//                 }
//                 onMouseLeave={(e) => (e.target.style.color = "#333")}
//               >
//                 {menu}
//                 {currentNav[menu].length > 0 && <ChevronDown size={14} />}
//               </button>

//               {openDropdown === menu && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "45px",
//                     left: 0,
//                     background: "#fff",
//                     boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                     borderRadius: "8px",
//                     overflow: "hidden",
//                     minWidth: "200px",
//                   }}
//                   onMouseLeave={() => setOpenDropdown(null)}
//                 >
//                   {currentNav[menu].map((item, idx) => (
//                     <div
//                       key={idx}
//                       style={{
//                         padding: "12px 15px",
//                         cursor: "pointer",
//                         fontSize: "13px",
//                         borderBottom: "1px solid #f3f4f6",
//                         transition: "0.2s",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.target.style.background =
//                           "linear-gradient(135deg, #6b73ff 0%, #000dff 100%)";
//                         e.target.style.color = "white";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.background = "white";
//                         e.target.style.color = "#333";
//                       }}
//                       onClick={() => handleMenuClick(item)}
//                     >
//                       {item}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>

//         <button
//           onClick={handleLogout}
//           style={{
//             background: "linear-gradient(135deg, #ff4b2b 0%, #ff416c 100%)",
//             color: "white",
//             border: "none",
//             borderRadius: "6px",
//             fontWeight: "600",
//             fontSize: "13px",
//             padding: "10px 16px",
//             cursor: "pointer",
//             transition: "0.3s",
//           }}
//           onMouseEnter={(e) =>
//             (e.target.style.background =
//               "linear-gradient(135deg, #e43e2b 0%, #ff165d 100%)")
//           }
//           onMouseLeave={(e) =>
//             (e.target.style.background =
//               "linear-gradient(135deg, #ff4b2b 0%, #ff416c 100%)")
//           }
//         >
//           LOG OUT
//         </button>

//         <button
//           style={{
//             background: "none",
//             border: "none",
//             cursor: "pointer",
//             display: "none",
//           }}
//           className="menu-icon"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>
//     </header>
//   );
// }
import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PanelHeader() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userRole, setUserRole] = useState("master_distributor");

  useEffect(() => {
    const savedRole = localStorage.getItem("selectedRole");
    if (savedRole) setUserRole(savedRole);
  }, []);

  // ✅ Navigation mapping with routes
  const navigationMap = {
    // Master Distributor
    "ADD DISTRIBUTOR": "/distributor-registration",
    "MANAGE DISTRIBUTOR": "/manage-distributor",

    // Retailer
    "ADD RETAILER": "/retailer-registration",
    "MANAGE RETAILER": "/manage-retailer",
    "RETAILER REPORT": "/report/retailer-report",

    // Reports
    "MINI STATEMENT": "/mini-statement",
    "RECHARGE HISTORY": "/recharge-history",
    "BILLING SUMMARY": "/ledger", // Using Ledger as Billing Summary
    "REFUND REPORT": "/refund-report",
    "MY EARNING": "/my-earning",
    "WITHDRAW COMMISSION": "/my-commission", // Using My Commission
    "SEARCH TRANSACTION": "/search-transaction",
    "SEARCH PLAN": "/search-plan",

    // My Account
    "CHANGE PASSWORD": "/change-password",
    "EDIT PROFILE": "/edit-profile",
    "MY COMMISSION": "/my-commission",

    // Support
    "SUPPORT TICKET": "/support-ticket",
    "BANK DETAILS": "/setting/add-bank-details", // Using admin bank details
    "CONTACT DETAILS": "/setting/update-contact", // Using admin contact update
    "ADD FUND": "/add-fund",
    "DOWNLOAD APP": null, // Will handle separately

    // Dashboard
    DASHBOARD: "/dashboard",
  };

  const navConfig = {
    master_distributor: {
      DASHBOARD: [],
      DISTRIBUTOR: ["ADD DISTRIBUTOR", "MANAGE DISTRIBUTOR", "RETAILER REPORT"],
      REPORT: [
        "MINI STATEMENT",
        "RECHARGE HISTORY",
        "BILLING SUMMARY",
        "REFUND REPORT",
        "MY EARNING",
        "WITHDRAW COMMISSION",
        "SEARCH TRANSACTION",
        "SEARCH PLAN",
      ],
      "MY ACCOUNT": ["CHANGE PASSWORD", "EDIT PROFILE", "MY COMMISSION"],
      SUPPORT: [
        "SUPPORT TICKET",
        "BANK DETAILS",
        "CONTACT DETAILS",
        "ADD FUND",
        "DOWNLOAD APP",
      ],
    },
    distributor: {
      DASHBOARD: [],
      RETAILER: ["ADD RETAILER", "MANAGE RETAILER", "RETAILER REPORT"],
      REPORT: [
        "MINI STATEMENT",
        "RECHARGE HISTORY",
        "BILLING SUMMARY",
        "REFUND REPORT",
        "MY EARNING",
        "WITHDRAW COMMISSION",
        "SEARCH TRANSACTION",
        "SEARCH PLAN",
      ],
      "MY ACCOUNT": ["CHANGE PASSWORD", "EDIT PROFILE", "MY COMMISSION"],
      SUPPORT: [
        "SUPPORT TICKET",
        "BANK DETAILS",
        "CONTACT DETAILS",
        "ADD FUND",
        "DOWNLOAD APP",
      ],
    },
    retailer: {
      DASHBOARD: [],
      REPORT: [
        "MINI STATEMENT",
        "RECHARGE HISTORY",
        "BILLING SUMMARY",
        "REFUND REPORT",
        "SEARCH TRANSACTION",
      ],
      "MY ACCOUNT": ["CHANGE PASSWORD", "EDIT PROFILE"],
      SUPPORT: ["SUPPORT TICKET", "CONTACT DETAILS", "DOWNLOAD APP"],
    },
  };

  const currentNav = navConfig[userRole] || navConfig.master_distributor;

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleMenuClick = (item) => {
    const route = navigationMap[item];

    if (route) {
      navigate(route);
      setOpenDropdown(null); // Close dropdown after navigation
    } else if (item === "DOWNLOAD APP") {
      // Handle download app - open a new window or show modal
      alert("Download App functionality coming soon!");
    } else if (item === "DASHBOARD") {
      navigate("/dashboard");
    } else {
      console.log("No route defined for:", item);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("selectedRole");
    navigate("/");
  };

  return (
    <header
      style={{
        background: "#ffffff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        padding: "10px 30px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/dashboard")}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #6b73ff 0%, #000dff 100%)",
              color: "white",
              fontWeight: "bold",
              fontSize: "22px",
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            W
          </div>
        </div>

        {/* Navigation */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            listStyle: "none",
            gap: "15px",
            margin: 0,
            padding: 0,
          }}
          className="desktop-nav"
        >
          {Object.keys(currentNav).map((menu) => (
            <li key={menu} style={{ position: "relative" }}>
              <button
                onClick={() => {
                  if (currentNav[menu].length > 0) {
                    toggleDropdown(menu);
                  } else {
                    handleMenuClick(menu);
                  }
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#333",
                  fontWeight: "600",
                  cursor: "pointer",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "rgb(80, 56, 255)")
                }
                onMouseLeave={(e) => (e.target.style.color = "#333")}
              >
                {menu}
                {currentNav[menu].length > 0 && <ChevronDown size={14} />}
              </button>

              {/* Dropdown Menu */}
              {openDropdown === menu && (
                <div
                  style={{
                    position: "absolute",
                    top: "45px",
                    left: 0,
                    background: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    minWidth: "200px",
                    zIndex: 1001,
                  }}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {currentNav[menu].map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "12px 15px",
                        cursor: "pointer",
                        fontSize: "13px",
                        borderBottom:
                          idx < currentNav[menu].length - 1
                            ? "1px solid #f3f4f6"
                            : "none",
                        transition: "0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background =
                          "linear-gradient(135deg, #6b73ff 0%, #000dff 100%)";
                        e.target.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "white";
                        e.target.style.color = "#333";
                      }}
                      onClick={() => handleMenuClick(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            background: "linear-gradient(135deg, #ff4b2b 0%, #ff416c 100%)",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            fontSize: "13px",
            padding: "10px 16px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseEnter={(e) =>
            (e.target.style.background =
              "linear-gradient(135deg, #e43e2b 0%, #ff165d 100%)")
          }
          onMouseLeave={(e) =>
            (e.target.style.background =
              "linear-gradient(135deg, #ff4b2b 0%, #ff416c 100%)")
          }
        >
          LOG OUT
        </button>

        {/* Mobile Menu Toggle */}
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "none",
          }}
          className="menu-icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
