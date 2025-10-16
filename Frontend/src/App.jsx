import React from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CodeWebTelecom from "./CodeWebFrontend";
import Login from "./pages/login";
import Signup from "./pages/signup";
import MobileRecharge from "./Components/MobileRecharge";
import DTHRecharge from "./Components/DTHRecharge";
import ElectricityRecharge from "./Components/ElectricityRecharge";
import FASTagRecharge from "./Components/FASTagRecharge";
import GasRecharge from "./Components/GasRecharge";
import DataCardRecharge from "./Components/DataCardRecharge";
import Dashboard from "./Components/Dashboard";
import WebSolutions from "./Components/WebSolutions";
import InsuranceRecharge from "./Components/InsuranceRecharge";
import PostpaidRecharge from "./Components/PostpaidRecharge";
import GooglePlayRecharge from "./Components/GooglePlayRecharge";
import WaterBillRecharge from "./Components/WaterBillRecharge";
import AdminDashboard from "../Admin/AdminDashboard";

// 🔽 Import your new Report pages
import MiniStatement from "./pages/MiniStatement";
import RechargeHistory from "./pages/RechargeHistory";
import Ledger from "./pages/Ledger";
import RefundReport from "./pages/RefundReport";
import MyEarning from "./pages/MyEarning";
import SearchTransaction from "./pages/SearchTransaction";
import SearchPlan from "./pages/SearchPlan";

function App() {
  useEffect(() => {
    // Browser close hone par token remove
    const handleUnload = () => {
      localStorage.removeItem("token");
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<CodeWebTelecom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/MobileRecharge" element={<MobileRecharge />} />
        <Route path="/DTHRecharge" element={<DTHRecharge />} />
        <Route path="/ElectricityRecharge" element={<ElectricityRecharge />} />
        <Route path="/FASTagRecharge" element={<FASTagRecharge />} />
        <Route path="/GasRecharge" element={<GasRecharge />} />
        <Route path="/DataCardRecharge" element={<DataCardRecharge />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/web-solutions" element={<WebSolutions />} />
        <Route path="/InsuranceRecharge" element={<InsuranceRecharge />} />
        <Route path="/PostpaidRecharge" element={<PostpaidRecharge />} />
        <Route path="/GooglePlayRecharge" element={<GooglePlayRecharge />} />
        <Route path="/WaterBillRecharge" element={<WaterBillRecharge />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* 🔽 Report Section Routes */}
        <Route path="/mini-statement" element={<MiniStatement />} />
        <Route path="/recharge-history" element={<RechargeHistory />} />
        <Route path="/ledger" element={<Ledger />} />
        <Route path="/refund-report" element={<RefundReport />} />
        <Route path="/my-earning" element={<MyEarning />} />
        <Route path="/search-transaction" element={<SearchTransaction />} />
        <Route path="/search-plan" element={<SearchPlan />} />
      </Routes>
    </>
  );
}

export default App;
