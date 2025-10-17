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
    case "REGISTER":
      return "/admin/register";
    case "MANAGE":
      return "/manage";
    case "BALANCE TRANSFER":
      return "/admin/balance-transfer";

    // // API PANEL
    // case "REGISTER API":
    //   return "/register-api";
    // case "MANAGE API":
    //   return "/manage-api";

    // // SETTING
    // case "CHANGE LOGO":
    //   return "/change-logo";
    // case "UPDATE CONTACT":
    //   return "/update-contact";
    // case "SWITCH API":
    //   return "/switch-api";
    // case "API SETTING":
    //   return "/api-setting";
    // case "SET COMMISSION":
    //   return "/set-commission";
    // case "CREATE COMMISSION PLAN":
    //   return "/create-commission-plan";
    // case "ADD BANK NAME":
    //   return "/add-bank-name";
    // case "ADD BANK DETAILS":
    //   return "/add-bank-details";
    // case "BUSINESS TYPE":
    //   return "/business-type";
    // case "EDIT STATE":
    //   return "/edit-state";
    // case "UPI SETTING":
    //   return "/upi-setting";
    // case "CHANGE PASSWORD":
    //   return "/change-password";

    // // REPORT
    // case "PENDING RECHARGE":
    //   return "/pending-recharge";
    // case "RECHARGE HISTORY":
    //   return "/recharge-history";
    // case "CHECK TRANSACTION":
    //   return "/check-transaction";
    // case "ACCOUNT REPORT":
    //   return "/account-report";
    // case "MASTER DISTRIBUTOR REPORT":
    //   return "/master-distributor-report";
    // case "DISTRIBUTOR REPORT":
    //   return "/distributor-report";
    // case "RETAILER REPORT":
    //   return "/retailer-report";

    // // SUPPORT
    // case "SUPPORT TICKET":
    //   return "/support-ticket";
    // case "SET ALERT":
    //   return "/set-alert";

    // Default (in case something’s missing)
    default:
      return "/";
  }
}
