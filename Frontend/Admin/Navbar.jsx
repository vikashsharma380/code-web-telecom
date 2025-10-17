import React from "react";
import { Link } from "react-router-dom";
import navItems from "./NavItems";

export default function Navbar() {
  return (
    <nav>
      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            {item.dropdown ? (
              <div>
                <span>{item.label}</span>
                <ul>
                  {item.dropdown.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link to={getRoutePath(subItem)}>{subItem}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link to={item.href.replace("#", "/")}>{item.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Helper function to match dropdown items to correct routes
function getRoutePath(label) {
  switch (label.toUpperCase()) {
    // ✅ CUSTOMERS (nested under admin-dashboard)
    case "REGISTER":
      return "/register";
    case "MANAGE":
  return "/manage";

    case "BALANCE TRANSFER":
      return "/balance-transfer";

    // ✅ API PANEL
    case "REGISTER API":
      return "/admin-dashboard/register-api";
    case "MANAGE API":
      return "/admin-dashboard/manage-api";

    // ✅ SETTING
    case "CHANGE LOGO":
      return "/admin-dashboard/change-logo";
    case "UPDATE CONTACT":
      return "/admin-dashboard/update-contact";
    case "SWITCH API":
      return "/admin-dashboard/switch-api";
    case "API SETTING":
      return "/admin-dashboard/api-setting";
    case "SET COMMISSION":
      return "/admin-dashboard/set-commission";
    case "CREATE COMMISSION PLAN":
      return "/admin-dashboard/create-commission-plan";
    case "ADD BANK NAME":
      return "/admin-dashboard/add-bank-name";
    case "ADD BANK DETAILS":
      return "/admin-dashboard/add-bank-details";
    case "BUSINESS TYPE":
      return "/admin-dashboard/business-type";
    case "EDIT STATE":
      return "/admin-dashboard/edit-state";
    case "UPI SETTING":
      return "/admin-dashboard/upi-setting";
    case "CHANGE PASSWORD":
      return "/admin-dashboard/change-password";

    // ✅ REPORT
    case "PENDING RECHARGE":
      return "/admin-dashboard/pending-recharge";
    case "RECHARGE HISTORY":
      return "/admin-dashboard/recharge-history";
    case "CHECK TRANSACTION":
      return "/admin-dashboard/check-transaction";
    case "ACCOUNT REPORT":
      return "/admin-dashboard/account-report";
    case "MASTER DISTRIBUTOR REPORT":
      return "/admin-dashboard/master-distributor-report";
    case "DISTRIBUTOR REPORT":
      return "/admin-dashboard/distributor-report";
    case "RETAILER REPORT":
      return "/admin-dashboard/retailer-report";

    // ✅ SUPPORT
    case "SUPPORT TICKET":
      return "/admin-dashboard/support-ticket";
    case "SET ALERT":
      return "/admin-dashboard/set-alert";

    // ✅ Default fallback
    default:
      return "/";
  }
}


