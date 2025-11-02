import React from "react";
import Nav from "../../hero/nav";

const UserMyCommission = () => {
  const commissionData = [
    { srNo: 1, operator: "Vodafone", commission: "3.40" },
    { srNo: 2, operator: "RELIANCE - JIO", commission: "0.45" },
    { srNo: 3, operator: "Airtel", commission: "1.85" },
    { srNo: 4, operator: "BSNL - STV", commission: "4.00" },
    { srNo: 5, operator: "BSNL - TOPUP", commission: "4.00" },
    { srNo: 6, operator: "Idea", commission: "3.40" },
    { srNo: 7, operator: "DISH TV", commission: "3.50" },
    { srNo: 8, operator: "Airtel Digital DTH TV", commission: "3.20" },
    { srNo: 9, operator: "SUNDIRECT DTH TV", commission: "2.80" },
    { srNo: 10, operator: "VIDEOCON DTH TV", commission: "3.20" },
    { srNo: 11, operator: "TATASKY DTH TV", commission: "3.00" },
    { srNo: 12, operator: "Google Play", commission: "1.00" },
    { srNo: 13, operator: "Federal Bank - Fastag", commission: "0.00" },
    { srNo: 14, operator: "Hdfc Bank - Fastag", commission: "0.00" },
    { srNo: 15, operator: "Icici Bank Fastag", commission: "0.00" },
    { srNo: 16, operator: "Idbi Bank Fastag", commission: "0.00" },
    { srNo: 17, operator: "Idfc First Bank- Fastag", commission: "0.00" },
    { srNo: 18, operator: "Axis Bank Fastag", commission: "0.00" },
    { srNo: 19, operator: "Paytm Payments Bank Fastag", commission: "0.00" },
    { srNo: 20, operator: "Airtel Postpaid", commission: "0.00" },
    { srNo: 21, operator: "Idea Postpaid", commission: "0.00" },
    { srNo: 22, operator: "BSNL Postpaid", commission: "0.00" },
    { srNo: 23, operator: "Vodafone Postpaid", commission: "0.00" },
    { srNo: 24, operator: "JIO POSTPAID", commission: "0.00" },
  ];

  return (
    <>
      {" "}
      <Nav />
      <div className="commission-container">
        <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .commission-container {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          min-height: 100vh;
          padding: 0;
        }

        .commission-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 16px 20px;
          font-size: 16px;
          font-weight: normal;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        }

        .commission-table-wrapper {
          background: white;
          overflow-x: auto;
        }

        .commission-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
        }

        .commission-table thead {
          background-color: #f8f9fa;
        }

        .commission-table th {
          padding: 12px 20px;
          text-align: left;
          font-weight: 600;
          font-size: 14px;
          color: #333;
          border-bottom: 1px solid #e5e7eb;
        }

        .commission-table td {
          padding: 12px 20px;
          font-size: 14px;
          color: #666;
          border-bottom: 1px solid #f0f0f0;
        }

        .commission-table tbody tr:hover {
          background-color: #f9fafb;
        }

        .commission-table tbody tr:last-child td {
          border-bottom: none;
        }

        @media (max-width: 768px) {
          .commission-header {
            font-size: 14px;
            padding: 14px 16px;
          }

          .commission-table th,
          .commission-table td {
            padding: 10px 12px;
            font-size: 13px;
          }
        }
      `}</style>

        <div className="commission-header">My Commission</div>

        <div className="commission-table-wrapper">
          <table className="commission-table">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Operator</th>
                <th>Commission</th>
              </tr>
            </thead>
            <tbody>
              {commissionData.map((item) => (
                <tr key={item.srNo}>
                  <td>{item.srNo}</td>
                  <td>{item.operator}</td>
                  <td>{item.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>{" "}
    </>
  );
};

export default UserMyCommission;
