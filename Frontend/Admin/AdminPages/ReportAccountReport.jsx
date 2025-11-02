import React, { useState } from "react";
import Header from "../Header";

const ReportAccountReport = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Extended sample data with multiple pages
  const [transactions] = useState([
    {
      id: 1593,
      date: "2023-11-02 02:15:01 AM",
      paymentId: "1593",
      paymentTo: "ashik ali",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description:
        "Direct Payment By ADMINISTRATOR (Admin) To ashik ali (Agent)",
      remark: "Bank Ref number 1008650229389 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 250.0,
      balance: 99906788.13,
    },
    {
      id: 1592,
      date: "2023-11-02 01:39:36 AM",
      paymentId: "1592",
      paymentTo: "ashik ali",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description:
        "Direct Payment By ADMINISTRATOR (Admin) To ashik ali (Agent)",
      remark: "Bank Ref number 03835237974281 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 100.0,
      balance: 99906888.13,
    },
    {
      id: 1591,
      date: "2023-11-01 11:50:00 PM",
      paymentId: "1591",
      paymentTo: "vijay",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description: "Direct Payment By ADMINISTRATOR (Admin) To vijay (Agent)",
      remark: "Bank Ref number 833001008234661 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 100.0,
      balance: 99906988.13,
    },
    {
      id: 1590,
      date: "2023-11-01 08:29:40 PM",
      paymentId: "1590",
      paymentTo: "om prakash",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description:
        "Direct Payment By ADMINISTRATOR (Admin) To om prakash (Agent)",
      remark: "Bank Ref number 042384201927 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 980.0,
      balance: 99907088.13,
    },
    {
      id: 1589,
      date: "2023-11-01 04:02:26 PM",
      paymentId: "1589",
      paymentTo: "Rambhu Raj",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description:
        "Direct Payment By ADMINISTRATOR (Admin) To Rambhu Raj (Agent)",
      remark: "Bank Ref number 8571922342561 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 400.0,
      balance: 99908068.13,
    },
    {
      id: 1588,
      date: "2023-11-01 11:26:16 AM",
      paymentId: "1588",
      paymentTo: "ashik ali",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description:
        "Direct Payment By ADMINISTRATOR (Admin) To ashik ali (Agent)",
      remark: "Bank Ref number 82850241438650 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 240.0,
      balance: 99908268.13,
    },
    {
      id: 1587,
      date: "2023-10-30 10:54:33 PM",
      paymentId: "1587",
      paymentTo: "Gupta IT Solution",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "",
      description:
        "Direct Payment By ADMINISTRATOR (Admin) To Gupta IT Solution (Agent)",
      remark: "Upi",
      creditAmount: 0.0,
      debitAmount: 2000.0,
      balance: 99908508.13,
    },
    {
      id: 1585,
      date: "2023-10-30 05:51:33 PM",
      paymentId: "1585",
      paymentTo: "CWT DISTRIBUTOR",
      userType: "Distributor",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description:
        "Variable Commission of Rs. 3.53 for the period of 2023-10-11 To 2023-10-30",
      remark: "",
      creditAmount: 0.0,
      debitAmount: 3.53,
      balance: 99910508.13,
    },
    {
      id: 1584,
      date: "2023-10-30 04:58:11 PM",
      paymentId: "1584",
      paymentTo: "Gupta IT Solution",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "",
      description:
        "Direct Payment By ADMINISTRATOR (Admin) To Gupta IT Solution (Agent)",
      remark: "online",
      creditAmount: 0.0,
      debitAmount: 652.0,
      balance: 99910511.66,
    },
    {
      id: 1583,
      date: "2023-10-29 01:25:18 PM",
      paymentId: "1583",
      paymentTo: "ashik ali",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description:
        "Direct Payment By ADMINISTRATOR (Admin) To ashik ali (Agent)",
      remark: "Bank Ref number 112341 Manual Add Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 400.0,
      balance: 99911163.66,
    },
    {
      id: 1582,
      date: "2023-10-29 08:08:05 AM",
      paymentId: "1582",
      paymentTo: "Rambhu Raj",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description:
        "Direct Payment By ADMINISTRATOR (Admin) To Rambhu Raj (Agent)",
      remark: "Bank Ref number 35009473606 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 1000.0,
      balance: 99911563.66,
    },
    {
      id: 1581,
      date: "2023-10-29 08:08:05 AM",
      paymentId: "1581",
      paymentTo: "ashik ali",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description:
        "Direct Payment By ADMINISTRATOR (Admin) To ashik ali (Agent)",
      remark: "Bank Ref number 4245741822033 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 942.0,
      balance: 99912563.66,
    },
    {
      id: 1580,
      date: "2023-10-26 14:14:13 AM",
      paymentId: "1580",
      paymentTo: "vijay",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description: "Direct Payment By ADMINISTRATOR (Admin) To vijay (Agent)",
      remark: "Bank Ref number 929273538324 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 136.0,
      balance: 99913505.66,
    },
    {
      id: 1579,
      date: "2023-10-26 10:20:03 AM",
      paymentId: "1579",
      paymentTo: "vijay",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description: "Direct Payment By ADMINISTRATOR (Admin) To vijay (Agent)",
      remark: "Bank Ref number 52009229976528 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 100.0,
      balance: 99913641.66,
    },
    {
      id: 1578,
      date: "2023-10-26 08:20:27 AM",
      paymentId: "1578",
      paymentTo: "ashik ali",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description:
        "Direct Payment By ADMINISTRATOR (Admin) To ashik ali (Agent)",
      remark: "Bank Ref number 333900446463 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 340.0,
      balance: 99913741.66,
    },
    {
      id: 1577,
      date: "2023-10-25 05:36:35 PM",
      paymentId: "1577",
      paymentTo: "Rambhu Raj",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description:
        "Direct Payment By ADMINISTRATOR (Admin) To Rambhu Raj (Agent)",
      remark: "Bank Ref number 52065610760250 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 1000.0,
      balance: 99914081.66,
    },
    {
      id: 1576,
      date: "2023-10-25 10:46:09 AM",
      paymentId: "1576",
      paymentTo: "om parkash",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description:
        "Direct Payment By ADMINISTRATOR (Admin) To om parkash (Agent)",
      remark: "Bank Ref number 9228555050853 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 299.0,
      balance: 99915081.66,
    },
    {
      id: 1575,
      date: "2023-10-23 09:36:21 AM",
      paymentId: "1575",
      paymentTo: "Rambhu Raj",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description:
        "Direct Payment By ADMINISTRATOR (Admin) To Rambhu Raj (Agent)",
      remark: "Bank Ref number 52865442174743 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 1000.0,
      balance: 99915380.66,
    },
    {
      id: 1574,
      date: "2023-10-22 10:51:53 PM",
      paymentId: "1574",
      paymentTo: "Rambhu Raj",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description:
        "Direct Payment By ADMINISTRATOR (Admin) To Rambhu Raj (Agent)",
      remark: "Bank Ref number 82991542929513 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 1000.0,
      balance: 99916380.66,
    },
    {
      id: 1573,
      date: "2023-10-22 07:06:21 PM",
      paymentId: "1573",
      paymentTo: "vijay",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description: "Direct Payment By ADMINISTRATOR (Admin) To vijay (Agent)",
      remark: "Bank Ref number 32490858477806 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 100.0,
      balance: 99917380.66,
    },
    {
      id: 1572,
      date: "2023-10-22 06:39:30 PM",
      paymentId: "1572",
      paymentTo: "vijay",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description: "Direct Payment By ADMINISTRATOR (Admin) To vijay (Agent)",
      remark: "Bank Ref number 92950776418831 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 345.0,
      balance: 99917480.66,
    },
    {
      id: 1571,
      date: "2023-10-22 06:10:25 PM",
      paymentId: "1571",
      paymentTo: "Rambhu Raj",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description:
        "Direct Payment By ADMINISTRATOR (Admin) To Rambhu Raj (Agent)",
      remark: "Bank Ref number 52250688633654 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 1000.0,
      balance: 99918825.66,
    },
    {
      id: 1570,
      date: "2023-10-22 12:03:13 AM",
      paymentId: "1570",
      paymentTo: "Vikash Sharma",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description:
        "Direct Payment By ADMINISTRATOR (Admin) To Vikash Sharma (Agent)",
      remark: "Bank Ref number 82650885633654 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 5.0,
      balance: 99919825.66,
    },
    {
      id: 1569,
      date: "2023-10-22 00:03:13 AM",
      paymentId: "1569",
      paymentTo: "ashik ali",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description:
        "Direct Payment By ADMINISTRATOR (Admin) To ashik ali (Agent)",
      remark: "Bank Ref number 85197535381904 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 270.0,
      balance: 99919830.66,
    },
    {
      id: 1568,
      date: "2023-10-21 06:05:43 PM",
      paymentId: "1568",
      paymentTo: "Rambhu Raj",
      userType: "Agent",
      transactionType: "PAYMENT",
      paymentType: "cash",
      description:
        "Direct Payment By ADMINISTRATOR (Admin) To Rambhu Raj (Agent)",
      remark: "Bank Ref number 85608696650421 Paid VIA MOBILE UPI Gateway",
      creditAmount: 0.0,
      debitAmount: 1000.0,
      balance: 99920100.66,
    },
  ]);

  const handleSearch = () => {
    console.log("Searching from:", fromDate, "to:", toDate);
  };

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const Pagination = () => {
    const pages = [];

    // Always show all pages
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <>
        <div style={styles.pagination}>
          <button
            style={{
              ...styles.paginationBtn,
              ...(currentPage === 1 ? styles.paginationBtnDisabled : {}),
            }}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            «
          </button>

          {pages.map((page) => (
            <button
              key={page}
              style={{
                ...styles.paginationBtn,
                ...(currentPage === page ? styles.paginationBtnActive : {}),
              }}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            style={{
              ...styles.paginationBtn,
              ...(currentPage === totalPages
                ? styles.paginationBtnDisabled
                : {}),
            }}
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>{" "}
      </>
    );
  };

  const styles = {
    container: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #1e1e2e 0%, #2d1b69 50%, #1e1e2e 100%)",
      position: "relative",
      overflow: "hidden",
      padding: "40px 20px",
    },
    bgPattern: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.2) 0%, transparent 50%)",
      pointerEvents: "none",
    },
    content: {
      position: "relative",
      maxWidth: "100%",
      margin: "0 auto",
      padding: "0 20px",
    },
    card: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "24px",
      overflow: "hidden",
      marginBottom: "32px",
    },
    cardHeader: {
      padding: "24px 32px",
      background: "linear-gradient(135deg, #4a6cf7 0%, #7c3aed 100%)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    },
    cardTitle: {
      fontSize: "24px",
      fontWeight: "700",
      color: "white",
      margin: 0,
      letterSpacing: "-0.5px",
    },
    filterSection: {
      padding: "24px 32px",
      display: "flex",
      gap: "16px",
      alignItems: "flex-end",
      flexWrap: "wrap",
    },
    filterGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "600",
      color: "rgba(255, 255, 255, 0.9)",
      letterSpacing: "0.3px",
    },
    dateInput: {
      padding: "12px 16px",
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      fontSize: "14px",
      color: "white",
      outline: "none",
      minWidth: "180px",
    },
    searchBtn: {
      padding: "12px 32px",
      background: "linear-gradient(135deg, #4a6cf7 0%, #7c3aed 100%)",
      border: "none",
      borderRadius: "12px",
      color: "white",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 16px rgba(74, 108, 247, 0.4)",
    },
    tableWrapper: {
      padding: "0 32px 32px",
    },
    tableContainer: {
      overflowX: "auto",
      width: "100%",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      tableLayout: "auto",
    },
    tableHeader: {
      background: "rgba(255, 255, 255, 0.05)",
      color: "rgba(255, 255, 255, 0.9)",
      fontSize: "13px",
      fontWeight: "600",
      padding: "16px 12px",
      textAlign: "left",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      whiteSpace: "normal",
      wordWrap: "break-word",
    },
    tableRow: {
      background: "rgba(255, 255, 255, 0.02)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      transition: "all 0.3s ease",
    },
    tableCell: {
      padding: "14px 12px",
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: "13px",
      whiteSpace: "normal",
      wordWrap: "break-word",
      maxWidth: "200px",
    },
    pagination: {
      display: "flex",
      gap: "8px",
      padding: "24px 32px",
      justifyContent: "flex-start",
      alignItems: "center",
      flexWrap: "wrap",
    },
    paginationBtn: {
      padding: "8px 14px",
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "8px",
      color: "white",
      fontSize: "13px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      minWidth: "36px",
      outline: "none",
    },
    paginationBtnActive: {
      background: "linear-gradient(135deg, #4a6cf7 0%, #7c3aed 100%)",
      boxShadow: "0 2px 8px rgba(74, 108, 247, 0.4)",
    },
    paginationBtnDisabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    amountCredit: {
      color: "#6ee7b7",
      fontWeight: "600",
    },
    amountDebit: {
      color: "#fca5a5",
      fontWeight: "600",
    },
  };

  return (
    <>
      {" "}
      <Header />
      <div style={styles.container}>
        <div style={styles.bgPattern}></div>

        <div style={styles.content}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Account Report</h2>
            </div>

            <div style={styles.filterSection}>
              <div style={styles.filterGroup}>
                <label style={styles.label}>From Date :</label>
                <input
                  type="date"
                  style={styles.dateInput}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  placeholder="dd-mm-yyyy"
                />
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.label}>To Date :</label>
                <input
                  type="date"
                  style={styles.dateInput}
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  placeholder="dd-mm-yyyy"
                />
              </div>

              <button style={styles.searchBtn} onClick={handleSearch}>
                Search
              </button>
            </div>

            <div style={styles.tableWrapper}>
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>Payment Date</th>
                      <th style={styles.tableHeader}>Payment Id</th>
                      <th style={styles.tableHeader}>Payment To</th>
                      <th style={styles.tableHeader}>User type</th>
                      <th style={styles.tableHeader}>Transaction type</th>
                      <th style={styles.tableHeader}>Payment type</th>
                      <th style={styles.tableHeader}>Description</th>
                      <th style={styles.tableHeader}>Remark</th>
                      <th style={styles.tableHeader}>Credit Amount</th>
                      <th style={styles.tableHeader}>Debit Amount</th>
                      <th style={styles.tableHeader}>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTransactions.map((transaction) => (
                      <tr key={transaction.id} style={styles.tableRow}>
                        <td style={styles.tableCell}>{transaction.date}</td>
                        <td style={styles.tableCell}>
                          {transaction.paymentId}
                        </td>
                        <td style={styles.tableCell}>
                          {transaction.paymentTo}
                        </td>
                        <td style={styles.tableCell}>{transaction.userType}</td>
                        <td style={styles.tableCell}>
                          {transaction.transactionType}
                        </td>
                        <td style={styles.tableCell}>
                          {transaction.paymentType}
                        </td>
                        <td style={styles.tableCell}>
                          {transaction.description}
                        </td>
                        <td style={styles.tableCell}>{transaction.remark}</td>
                        <td
                          style={{
                            ...styles.tableCell,
                            ...styles.amountCredit,
                          }}
                        >
                          {transaction.creditAmount.toFixed(2)}
                        </td>
                        <td
                          style={{ ...styles.tableCell, ...styles.amountDebit }}
                        >
                          {transaction.debitAmount.toFixed(2)}
                        </td>
                        <td style={styles.tableCell}>
                          {transaction.balance.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Pagination />
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default ReportAccountReport;
