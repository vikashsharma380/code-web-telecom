import React from "react";
import styles from "../src/styles";
export default function Tab({ activeTab, setActiveTab }) {
  return (
    <div style={styles.tabSection}>
      <div style={styles.tabsContainer}>
        {[
          "Mobile",
          "DTH",
          "Data Card",
          "Postpaid",
          "Electricity",
          "Gas",
          "Insurance",
          "FASTag",
          "Google Play",
          "Water Bill",
          "Landline",
          "more",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            style={{
              ...styles.tabBtn,
              ...(activeTab === tab.toLowerCase() ? styles.tabBtnActive : {}),
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
