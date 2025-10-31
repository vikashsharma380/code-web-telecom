import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function PanelHeader({ userRole = "master_distributor" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const navConfig = {
    master_distributor: {
      DASHBOARD: [],
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
      DISTRIBUTOR: ["ADD DISTRIBUTOR", "MANAGE DISTRIBUTOR", "RETAILER REPORT"],
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
      RETAILER: ["ADD RETAILER", "MANAGE RETAILER", "RETAILER REPORT"],
      "MY ACCOUNT": ["CHANGE PASSWORD", "EDIT PROFILE", "MY COMMISSION"],
      SUPPORT: [
        "SUPPORT TICKET",
        "BANK DETAILS",
        "CONTACT DETAILS",
        "ADD FUND",
        "DOWNLOAD APP",
      ],
    },
  };

  const currentNav = navConfig[userRole] || navConfig.master_distributor;

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleMenuClick = (item) => {
    console.log("Clicked:", item);
  };

  return (
    <>
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
            }}
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

          {/* Desktop Navigation */}
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
                  onClick={() =>
                    currentNav[menu].length > 0
                      ? toggleDropdown(menu)
                      : handleMenuClick(menu)
                  }
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
                          borderBottom: "1px solid #f3f4f6",
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
    </>
  );
}
