import React, { useState } from "react";
import {
  CreditCard,
  Calendar,
  DollarSign,
  Building2,
  FileText,
  Clock,
  XCircle,
} from "lucide-react";
import Nav from "../../hero/nav";

export default function AddFund() {
  const [formData, setFormData] = useState({
    requestAmount: "",
    bankRefNo: "",
    paymentDate: "",
    paymentMode: "",
    remarks: "",
  });

  const [paymentHistory] = useState([
    {
      id: 1,
      status: "Rejected",
      amount: 500,
      mode: "State Bank Of India",
      bankRefNo: "1",
      response: "",
      date: "2025-10-14 12:18:27 PM",
    },
    {
      id: 2,
      status: "Rejected",
      amount: 500,
      mode: "State Bank Of India",
      bankRefNo: "500032",
      response: "",
      date: "2025-10-14 02:42:13 PM",
    },
    {
      id: 3,
      status: "Rejected",
      amount: 500,
      mode: "State Bank Of India",
      bankRefNo: "5000032",
      response: "",
      date: "2025-10-14 02:42:17 PM",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Payment request submitted successfully!");
  };

  return (
    <>
      {" "}
      <Nav />
      <div className="add-fund-container">
        <style>{`
        .add-fund-container {
          min-height: 100vh;
          background: #f5f7fa;
          padding: 30px 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        h1, h2, h3 {
          margin: 0 0 10px 0;
        }
        .header {
          margin-bottom: 30px;
        }
        .header p {
          color: #64748b;
        }
        .grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 25px;
          margin-bottom: 30px;
        }
        .card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          overflow: hidden;
          transition: transform 0.3s;
        }
        .card:hover {
          transform: translateY(-3px);
        }
        .card-header {
          padding: 20px;
          background: linear-gradient(135deg, #4f46e5, #3b82f6);
          color: white;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 18px;
          font-weight: 600;
        }
        .card-body {
          padding: 25px;
        }
        form .form-group {
          margin-bottom: 20px;
        }
        form label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #1e293b;
        }
        input, select, textarea {
          width: 100%;
          padding: 14px 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          outline: none;
          font-size: 14px;
          transition: 0.3s;
        }
        input:focus, select:focus, textarea:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59,130,246,0.2);
        }
        textarea {
          resize: none;
        }
        button {
          width: 100%;
          padding: 16px;
          background: linear-gradient(to right, #4f46e5, #3b82f6);
          color: white;
          font-weight: 600;
          font-size: 16px;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          transition: 0.3s;
        }
        button:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .sidebar .card {
          padding: 20px;
          transition: 0.3s;
        }
        .sidebar .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.12);
        }
        .quick-tips li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          margin-bottom: 10px;
          color: #f1f5f9;
        }
        .quick-tips li div {
          width: 7px;
          height: 7px;
          background: white;
          border-radius: 50%;
          margin-top: 6px;
          flex-shrink: 0;
        }
        .table-container {
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        th, td {
          padding: 14px 15px;
          text-align: left;
        }
        th {
          text-transform: uppercase;
          color: #475569;
          border-bottom: 2px solid #e2e8f0;
          font-weight: 600;
        }
        tbody tr:hover {
          background-color: #f1f5f9;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          background: #fee2e2;
          color: #b91c1c;
        }
        @media(max-width: 1024px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

        <div className="container">
          {/* Header */}
          <div className="header">
            <h1>Add Funds</h1>
            <p>Submit a new payment request to add funds to your account</p>
          </div>

          {/* Main Grid */}
          <div className="grid">
            {/* Payment Form */}
            <div className="card">
              <div className="card-header">
                <CreditCard /> Payment Request Form
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>
                      <DollarSign /> Request Amount *
                    </label>
                    <input
                      type="number"
                      name="requestAmount"
                      value={formData.requestAmount}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter amount"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <FileText /> Bank Reference Number *
                    </label>
                    <input
                      type="text"
                      name="bankRefNo"
                      value={formData.bankRefNo}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter bank reference number"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <Calendar /> Payment Date *
                    </label>
                    <input
                      type="date"
                      name="paymentDate"
                      value={formData.paymentDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <Building2 /> Payment Mode *
                    </label>
                    <select
                      name="paymentMode"
                      value={formData.paymentMode}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select payment mode</option>
                      <option value="State Bank Of India">
                        State Bank Of India
                      </option>
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Punjab National Bank">
                        Punjab National Bank
                      </option>
                      <option value="Bank of Baroda">Bank of Baroda</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      <FileText /> Remarks
                    </label>
                    <textarea
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Bank Name, Account number, mobile number or any remarks"
                    />
                  </div>
                  <button type="submit">Submit Payment Request</button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="sidebar">
              <div
                className="card"
                style={{ background: "#4f46e5", color: "white" }}
              >
                <h3>Quick Tips</h3>
                <ul className="quick-tips">
                  <li>
                    <div></div> Double-check your bank reference number
                  </li>
                  <li>
                    <div></div> Payment verification may take 24-48 hours
                  </li>
                  <li>
                    <div></div> Keep your transaction receipt safe
                  </li>
                  <li>
                    <div></div> Contact support if payment is not reflected
                  </li>
                </ul>
              </div>
              <div className="card">
                <h3>Need Help?</h3>
                <p>
                  If you're facing any issues with your payment request, our
                  support team is here to help.
                </p>
                <button style={{ background: "#f1f5f9", color: "#334155" }}>
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="card">
            <div className="card-header">
              <Clock /> Payment History
            </div>
            <div className="card-body table-container">
              <table>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Mode</th>
                    <th>Bank Ref. No.</th>
                    <th>Response</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.length > 0 ? (
                    paymentHistory.map((payment) => (
                      <tr key={payment.id}>
                        <td>
                          <span className="status-badge">
                            <XCircle /> {payment.status}
                          </span>
                        </td>
                        <td>₹{payment.amount}</td>
                        <td>{payment.mode}</td>
                        <td>{payment.bankRefNo}</td>
                        <td>{payment.response || "-"}</td>
                        <td>{payment.date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        style={{ textAlign: "center", padding: "40px" }}
                      >
                        <Clock
                          style={{
                            width: "50px",
                            height: "50px",
                            color: "#cbd5e1",
                          }}
                        />
                        <p>No payment history found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
