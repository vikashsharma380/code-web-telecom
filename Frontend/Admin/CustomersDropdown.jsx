import React, { useState } from "react";

export default function CustomersDropdown() {
  const [showMenu, setShowMenu] = useState(false);
  const [popupOption, setPopupOption] = useState(null);

  const handleOptionClick = (option) => {
    setPopupOption(option);
  };

  const handleClosePopup = () => {
    setPopupOption(null);
  };

  return (
    <div style={styles.navContainer}>
      {/* Customers Menu */}
      <div
        style={styles.navItem}
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <button style={styles.button}>CUSTOMERS ⮟</button>

        {showMenu && (
          <div style={styles.dropdown}>
            <div
              style={styles.dropdownItem}
              onClick={() => handleOptionClick("REGISTER")}
            >
              REGISTER
            </div>
            <div
              style={styles.dropdownItem}
              onClick={() => handleOptionClick("MANAGE")}
            >
              MANAGE
            </div>
            <div
              style={styles.dropdownItem}
              onClick={() => handleOptionClick("BALANCE TRANSFER")}
            >
              BALANCE TRANSFER
            </div>
          </div>
        )}
      </div>

      {/* Popup */}
      {popupOption && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h3 style={styles.popupTitle}>
              Please Select Customer Type ({popupOption})
            </h3>
            <select style={styles.select}>
              <option>Select...</option>
              <option>Master Distributor</option>
              <option>Distributor</option>
              <option>Retailer</option>
            </select>

            <div style={styles.popupButtons}>
              <button style={styles.closeBtn} onClick={handleClosePopup}>
                Close
              </button>
              <button style={styles.confirmBtn}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  navContainer: {
    position: "relative",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "40px",
  },
  navItem: {
    position: "relative",
    display: "inline-block",
  },
  button: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  dropdown: {
    position: "absolute",
    top: "40px",
    left: 0,
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    borderRadius: "6px",
    overflow: "hidden",
    zIndex: 10,
    width: "180px",
  },
  dropdownItem: {
    padding: "10px 15px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  popup: {
    background: "#fff",
    borderRadius: "8px",
    width: "360px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    animation: "fadeIn 0.3s ease",
  },
  popupTitle: {
    marginBottom: "20px",
  },
  select: {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
  },
  popupButtons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  closeBtn: {
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  confirmBtn: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
