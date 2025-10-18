import { useNavigate } from "react-router-dom";
import styles from "../src/styles";
export default function Tab() {
  const navigate = useNavigate();
  const tabs = [
    { name: "Mobile", path: "/MobileRecharge" },
    { name: "DTH", path:"/DTHRecharge" },
    { name: "Postpaid", path: "/PostpaidRecharge" },
    { name: "Electricity", path: "/ElectricityRecharge" },
    { name: "Gas", path:"/GasRecharge" },
    { name: "Data Card", path: "/DataCardRecharge" },
    { name: "FASTag", path: "/FASTagRecharge"},
    { name: "Insurance", path: "/InsuranceRecharge" },
    { name: "Google Play", path: "/GooglePlayRecharge" },
    { name: "Water Bill", path: "/WaterBillRecharge" },
  ];

  return (
    <div style={styles.tabSection}>
      <div style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => navigate(tab.path)}
            style={styles.tabBtn}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
}
