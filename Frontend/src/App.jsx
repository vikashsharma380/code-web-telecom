import React from "react";
import { Routes, Route } from "react-router-dom";
import CodeWebTelecom from "./CodeWebFrontend";
import Login from "./pages/login";
import Signup from "./pages/signup";
import MobileRecharge from "./Components/MobileRecharge";
import { useParams } from "react-router-dom";
import ServicePage from "./pages/ServicePage";
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CodeWebTelecom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/service/:id" element={<ServicePage />} /> */}
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
      </Routes>
    </>
  );
}

export default App;
