// import React from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Styles";

// const ActionButton = () => {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <div style={styles.actionButtons}>
//         <button style={styles.actionBtn} onClick={() => navigate("/register")}>
//           REGISTER
//         </button>
//         <button
//           style={styles.actionBtn}
//           onClick={() => navigate("/balance-transfer")}
//         >
//           BALANCE TRANSFER
//         </button>
//         <button
//           style={styles.actionBtn}
//           onClick={() => navigate("/update-news")}
//         >
//           UPDATE NEWS
//         </button>
//         <button
//           style={styles.actionBtn}
//           onClick={() => navigate("/site-enquiry")}
//         >
//           SITE ENQUIRY
//         </button>
//         <button style={styles.actionBtn} onClick={() => navigate("/add-api")}>
//           ADD API
//         </button>
//         <button
//           style={styles.actionBtn}
//           onClick={() => navigate("/upi-gateway")}
//         >
//           UPI GATEWAY
//         </button>
//         <button
//           style={styles.actionBtn}
//           onClick={() => navigate("/recharge-history")}
//         >
//           RECHARGE HISTORY
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ActionButton;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Styles";

export default function ActionButton() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const handleNavigate = (type, path) => {
    navigate(`/${type}/${path}`);
    setHovered(null);
  };

  const optionStyle = {
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "8px 12px",
    background: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "0.2s",
  };

  const optionHoverStyle = {
    background: "#f3f4f6",
  };

  const dropdownContainer = {
    position: "absolute",
    top: "100%",
    left: 0,
    background: "#fff",
    border: "1px solid #ccc",
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
    zIndex: 9999,
    minWidth: "180px",
    borderRadius: "6px",
    overflow: "hidden",
    opacity: 0,
    transform: "translateY(5px)",
    pointerEvents: "none",
    transition: "opacity 0.2s ease, transform 0.2s ease",
  };

  const showDropdown = {
    opacity: 1,
    transform: "translateY(0)",
    pointerEvents: "auto",
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={styles.actionButtons}>
        {/* REGISTER */}
        <div
          style={{ position: "relative", display: "inline-block" }}
          onMouseEnter={() => setHovered("register")}
          onMouseLeave={() => setHovered(null)}
        >
          <button style={styles.actionBtn}>REGISTER</button>

          <div
            style={{
              ...dropdownContainer,
              ...(hovered === "register" ? showDropdown : {}),
            }}
          >
            <button
              style={optionStyle}
              onMouseEnter={(e) =>
                (e.target.style.background = optionHoverStyle.background)
              }
              onMouseLeave={(e) => (e.target.style.background = "#fff")}
              onClick={() => handleNavigate("register", "master-distributor")}
            >
              Master Distributor
            </button>
            <button
              style={optionStyle}
              onMouseEnter={(e) =>
                (e.target.style.background = optionHoverStyle.background)
              }
              onMouseLeave={(e) => (e.target.style.background = "#fff")}
              onClick={() => handleNavigate("register", "distributor")}
            >
              Distributor
            </button>
            <button
              style={optionStyle}
              onMouseEnter={(e) =>
                (e.target.style.background = optionHoverStyle.background)
              }
              onMouseLeave={(e) => (e.target.style.background = "#fff")}
              onClick={() => handleNavigate("register", "retailer")}
            >
              Retailer
            </button>
          </div>
        </div>

        {/* BALANCE TRANSFER */}
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginLeft: "10px",
          }}
          onMouseEnter={() => setHovered("balance-transfer")}
          onMouseLeave={() => setHovered(null)}
        >
          <button style={styles.actionBtn}>BALANCE TRANSFER</button>

          <div
            style={{
              ...dropdownContainer,
              ...(hovered === "balance-transfer" ? showDropdown : {}),
            }}
          >
            <button
              style={optionStyle}
              onMouseEnter={(e) =>
                (e.target.style.background = optionHoverStyle.background)
              }
              onMouseLeave={(e) => (e.target.style.background = "#fff")}
              onClick={() =>
                handleNavigate("balance-transfer", "master-distributor")
              }
            >
              Master Distributor
            </button>
            <button
              style={optionStyle}
              onMouseEnter={(e) =>
                (e.target.style.background = optionHoverStyle.background)
              }
              onMouseLeave={(e) => (e.target.style.background = "#fff")}
              onClick={() => handleNavigate("balance-transfer", "distributor")}
            >
              Distributor
            </button>
            <button
              style={optionStyle}
              onMouseEnter={(e) =>
                (e.target.style.background = optionHoverStyle.background)
              }
              onMouseLeave={(e) => (e.target.style.background = "#fff")}
              onClick={() => handleNavigate("balance-transfer", "retailer")}
            >
              Retailer
            </button>
          </div>
        </div>

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
}
