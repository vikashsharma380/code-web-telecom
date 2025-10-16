const navItems = [
  { label: "DASHBOARD", href: "#dashboard" },
  {
    label: "CUSTOMERS",
    href: "#customers",
    dropdown: ["REGISTER", "MANAGE", "BALANCE TRANSFER"],
  },
  {
    label: "API PANEL",
    href: "#api",
    dropdown: ["REGISTER API", "MANAGE API"],
  },
  {
    label: "SETTING",
    href: "#setting",
    dropdown: [
      "CHANGE LOGO",
      "UPDATE CONTACT",
      "SWITCH API",
      "API SETTING",
      "SET COMMISSION",
      "CREATE COMMISSION PLAN",
      "ADD BANK NAME",
      "ADD BANK DETAILS",
      "BUSINESS TYPE",
      "EDIT STATE",
      "UPI SETTING",
      "CHANGE PASSWORD",
    ],
  },
  {
    label: "REPORT",
    href: "#report",
    dropdown: [
      "PENDING RECHARGE",
      "RECHARGE HISTORY",
      "CHECK TRANSACTION",
      "ACCOUNT REPORT",
      "MASTER DISTRIBUTOR REPORT",
      "DISTRIBUTOR REPORT",
      "RETAILER REPORT",
    ],
  },
  {
    label: "SUPPORT",
    href: "#support",
    dropdown: ["SUPPORT TICKET", "SET ALERT"],
  },
];

export default navItems;
