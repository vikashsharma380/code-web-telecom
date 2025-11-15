import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Styles";

export default function ActionButton() {
  const navigate = useNavigate();
  const [popupOption, setPopupOption] = useState(null);
  const [selectedCustomerType, setSelectedCustomerType] = useState("");

  const handleClosePopup = () => {
    setPopupOption(null);
    setSelectedCustomerType("");
  };

  const handleConfirm = () => {
    if (popupOption === "REGISTER") {
      if (selectedCustomerType === "Master Distributor") {
        navigate("/master-distributor-registration");
      } else if (selectedCustomerType === "Distributor") {
        navigate("/distributor-registration");
      } else if (selectedCustomerType === "Retailer") {
        navigate("/retailer-registration");
      }
    } else if (popupOption === "BALANCE TRANSFER") {
      if (selectedCustomerType === "Master Distributor") {
        navigate("/balance-transfer-master-distributor");
      } else if (selectedCustomerType === "Distributor") {
        navigate("/balance-transfer-distributor");
      } else if (selectedCustomerType === "Retailer") {
        navigate("/balance-transfer-retailer");
      }
    }
    handleClosePopup();
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <div style={styles.actionButtons}>
          {/* REGISTER */}
          <button
            style={styles.actionBtn}
            onClick={() => setPopupOption("REGISTER")}
          >
            REGISTER
          </button>

          {/* BALANCE TRANSFER */}
          <button
            style={styles.actionBtn}
            onClick={() => setPopupOption("BALANCE TRANSFER")}
          >
            BALANCE TRANSFER
          </button>

          {/* Other buttons */}
          <button
            style={styles.actionBtn}
            onClick={() => navigate("/update-news")}
          >
            UPDATE NEWS
          </button>
          <button
            style={styles.actionBtn}
            onClick={() => navigate("/site-enquiry")}
          >
            SITE ENQUIRY
          </button>
          <button style={styles.actionBtn} onClick={() => navigate("/add-api")}>
            ADD API
          </button>
          <button
            style={styles.actionBtn}
            onClick={() => navigate("/upi-gateway")}
          >
            UPI GATEWAYY
          </button>
          <button
            style={styles.actionBtn}
            onClick={() => navigate("/recharge-history")}
          >
            RECHARGE HISTORY
          </button>
          <button
            style={styles.actionBtn}
            onClick={() => navigate("/leaderboard")}
          >
            LEADERBOARD
          </button>
        </div>
      </div>

      {/* Popup for REGISTER and BALANCE TRANSFER */}
      {popupOption && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h3 style={styles.popupTitle}>
              Please Select Customer Type ({popupOption})
            </h3>
            <select
              style={styles.select}
              value={selectedCustomerType}
              onChange={(e) => setSelectedCustomerType(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="Master Distributor">Master Distributor</option>
              <option value="Distributor">Distributor</option>
              <option value="Retailer">Retailer</option>
            </select>

            <div style={styles.popupButtons}>
              <button style={styles.closeBtn} onClick={handleClosePopup}>
                Close
              </button>
              <button
                style={styles.confirmBtn}
                onClick={handleConfirm}
                disabled={!selectedCustomerType}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
