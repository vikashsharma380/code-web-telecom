import React from "react";
import Header from "../Header";
import HeroSection from "../HeroSection";

export default function ApiManage() {
  const data = {
    userId: "500032",
    name: "Vikash Sharma",
    mobile: "9263128909",
    balance: "0.00",
    status: "Active",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
  };

  const thTdStyle = {
    border: "1px solid #ddd",
    padding: "10px 15px",
    textAlign: "center",
  };

  const headerStyle = {
    backgroundColor: "#337ab7",
    color: "#fff",
    padding: "12px 20px",
    fontSize: "18px",
  };

  const buttonStyle = {
    active: {
      backgroundColor: "#5cb85c",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "6px 15px",
      cursor: "pointer",
    },
    view: {
      backgroundColor: "#337ab7",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "6px 15px",
      cursor: "pointer",
    },
    edit: {
      backgroundColor: "#f0ad4e",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "6px 15px",
      cursor: "pointer",
    },
    add: {
      backgroundColor: "#d9534f",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "6px 15px",
      cursor: "pointer",
    },
    revert: {
      backgroundColor: "#337ab7",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "6px 15px",
      cursor: "pointer",
    },
    login: {
      backgroundColor: "#5cb85c",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "6px 15px",
      cursor: "pointer",
    },
  };

  return (
    <>
      {" "}
      <Header />
      <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
        {/* Header */}
        <div style={headerStyle}>Manage API</div>

        {/* Table */}
        <table style={tableStyle}>
          <thead>
            <tr style={{ backgroundColor: "#f7f7f7" }}>
              <th style={thTdStyle}>User ID</th>
              <th style={thTdStyle}>Name</th>
              <th style={thTdStyle}>Mobile</th>
              <th style={thTdStyle}>Balance</th>
              <th style={thTdStyle}>Status</th>
              <th style={thTdStyle}>View Profile</th>
              <th style={thTdStyle}>Profile Edit</th>
              <th style={thTdStyle}>Add Balance</th>
              <th style={thTdStyle}>Revert Balance</th>
              <th style={thTdStyle}>Login</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={thTdStyle}>{data.userId}</td>
              <td style={thTdStyle}>{data.name}</td>
              <td style={thTdStyle}>{data.mobile}</td>
              <td style={thTdStyle}>{data.balance}</td>
              <td style={thTdStyle}>
                <button style={buttonStyle.active}>{data.status}</button>
              </td>
              <td style={thTdStyle}>
                <button style={buttonStyle.view}>View Profile</button>
              </td>
              <td style={thTdStyle}>
                <button style={buttonStyle.edit}>Edit Profile</button>
              </td>
              <td style={thTdStyle}>
                <button style={buttonStyle.add}>Add Balance</button>
              </td>
              <td style={thTdStyle}>
                <button style={buttonStyle.revert}>Revert Balance</button>
              </td>
              <td style={thTdStyle}>
                <button style={buttonStyle.login}>Login</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>{" "}
    </>
  );
}
