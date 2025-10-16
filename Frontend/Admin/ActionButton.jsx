// import React from "react";
// import styles from "./Styles";
// const ActionButton = () => {
//   return (
//     <div>
//       {/* Action Buttons */}
//       <div style={styles.actionButtons}>
//         <button style={styles.actionBtn} className="action-btn">
//           REGISTER
//         </button>
//         <button style={styles.actionBtn} className="action-btn">
//           BALANCE TRANSFER
//         </button>
//         <button style={styles.actionBtn} className="action-btn">
//           UPDATE NEWS
//         </button>
//         <button style={styles.actionBtn} className="action-btn">
//           SITE ENQUIRY
//         </button>
//         <button style={styles.actionBtn} className="action-btn">
//           ADD API
//         </button>
//         <button style={styles.actionBtn} className="action-btn">
//           UPI GATEWAY
//         </button>
//         <button style={styles.actionBtn} className="action-btn">
//           RECHARGE HISTORY
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ActionButton;
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
