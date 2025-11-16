const navItems = [
  { label: "DASHBOARD", href: "/admin-dashboard" },
  {
    label: "CUSTOMERS",
    href: "#",
    dropdown: [
      { label: "REGISTER", route: "/customers/register" },
      { label: "MANAGE", route: "/customers/manage" },
      { label: "BALANCE TRANSFER", route: "/customers/balance-transfer" },
    ],
  },
  {
    label: "API PANEL",
    href: "#",
    dropdown: [
      { label: "REGISTER API", route: "/api/register" },
      { label: "MANAGE API", route: "/api/manage" },
    ],
  },
  {
    label: "SETTING",
    href: "#",
    dropdown: [
      { label: "CHANGE LOGO", route: "/setting/change-logo" },
      { label: "UPDATE CONTACT", route: "/setting/update-contact" },
      { label: "SWITCH API", route: "/setting/switch-api" },
      { label: "API SETTING", route: "/setting/api-setting" },
      { label: "SET COMMISSION", route: "/setting/set-commission" },
      {
        label: "CREATE COMMISSION PLAN",
        route: "/setting/create-commission-plan",
      },
      { label: "ADD BANK NAME", route: "/setting/add-bank-name" },
      { label: "ADD BANK DETAILS", route: "/setting/add-bank-details" },
      { label: "BUSINESS TYPE", route: "/setting/business-type" },
      { label: "EDIT STATE", route: "/setting/edit-state" },
      { label: "UPI SETTING", route: "/setting/upi-setting" },
      { label: "CHANGE PASSWORD", route: "/setting/change-password" },
    ],
  },
  {
    label: "REPORT",
    href: "#",
    dropdown: [
      { label: "PENDING RECHARGE", route: "/report/pending-recharge" },
      { label: "RECHARGE HISTORY", route: "/report/recharge-history" },
      { label: "CHECK TRANSACTION", route: "/report/check-transaction" },
      { label: "ACCOUNT REPORT", route: "/report/account-report" },
      {
        label: "MASTER DISTRIBUTOR REPORT",
        route: "/report/master-distributor-report",
      },
      { label: "DISTRIBUTOR REPORT", route: "/report/distributor-report" },
      { label: "RETAILER REPORT", route: "/report/retailer-report" },
    ],
  },
  {
    label: "SUPPORT",
    href: "#",
    dropdown: [
      { label: "SUPPORT TICKET", route: "/support-ticket" },
      { label: "SET ALERT", route: "/support/set-alert" },
    ],
  },
];

export default navItems;
