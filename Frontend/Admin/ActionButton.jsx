import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Styles";

const ActionButton = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={styles.actionButtons}>
        <button style={styles.actionBtn} onClick={() => navigate("/register")}>
          REGISTER
        </button>
        <button
          style={styles.actionBtn}
          onClick={() => navigate("/balance-transfer")}
        >
          BALANCE TRANSFER
        </button>
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
          UPI GATEWAY
        </button>
        <button
          style={styles.actionBtn}
          onClick={() => navigate("/recharge-history")}
        >
          RECHARGE HISTORY
        </button>
      </div>
    </div>
  );
};

export default ActionButton;
