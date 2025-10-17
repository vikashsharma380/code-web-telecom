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
import UPIGateway from "./pages/UPIGateway";
import AddAPI from "./pages/AddAPI";
import SiteEnquiry from "./pages/SiteEnquiry";
import UpdateNews from "./pages/UpdateNews";
import BalanceTransfer from "./pages/BalanceTransfer";
import Register from "./pages/Register";
import ActionButton from "../Admin/ActionButton";
import CustomersRegister from "../Admin/AdminPages/CustomersRegister";
import CustomersManage from "../Admin/AdminPages/CustomersManage";
import CustomersBalanceTransfer from "../Admin/AdminPages/CustomersBalanceTransfer";
import ApiRegister from "../Admin/AdminPages/ApiRegister";
import ApiManage from "../Admin/AdminPages/ApiManage";
import SettingChangeLogo from "../Admin/AdminPages/SettingChangeLogo";
import SettingUpdateContact from "../Admin/AdminPages/SettingUpdateContact";
import SettingSwitchApi from "../Admin/AdminPages/SettingSwitchApi";
import SettingApiSetting from "../Admin/AdminPages/SettingApiSetting";
import SettingSetCommission from "../Admin/AdminPages/SettingSetCommission";
import SettingCreateCommissionPlan from "../Admin/AdminPages/SettingCreateCommissionPlan";
import SettingAddBankDetails from "../Admin/AdminPages/SettingAddBankDetails";
import SettingBusinessType from "../Admin/AdminPages/SettingBusinessType";
import SettingEditState from "../Admin/AdminPages/SettingEditState";
import ReportPendingRecharge from "../Admin/AdminPages/ReportPendingRecharge";
import ReportRechargeHistory from "../Admin/AdminPages/ReportRechargeHistory";
import ReportMasterDistributorReport from "../Admin/AdminPages/ReportMasterDistributorReport";
import ReportDistributorReport from "../Admin/AdminPages/ReportDistributorReport";
import SupportTicket from "../Admin/AdminPages/SupportTicket";
import SupportSetAlert from "../Admin/AdminPages/SupportSetAlert";

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
        {/* action buttons */}
        <Route path="/register" element={<Register />} />
        <Route path="/balance-transfer" element={<BalanceTransfer />} />
        <Route path="/update-news" element={<UpdateNews />} />
        <Route path="/site-enquiry" element={<SiteEnquiry />} />
        <Route path="/add-api" element={<AddAPI />} />
        <Route path="/upi-gateway" element={<UPIGateway />} />
        {/* Customers */}
        <Route path="/customers/register" element={<CustomersRegister />} />
        <Route path="/customers/manage" element={<CustomersManage />} />
        <Route
          path="/customers/balance-transfer"
          element={<CustomersBalanceTransfer />}
        />

        {/* API Panel */}
        <Route path="/api/register" element={<ApiRegister />} />
        <Route path="/api/manage" element={<ApiManage />} />

        {/* Setting */}
        <Route path="/setting/change-logo" element={<SettingChangeLogo />} />
        <Route
          path="/setting/update-contact"
          element={<SettingUpdateContact />}
        />
        <Route path="/setting/switch-api" element={<SettingSwitchApi />} />
        <Route path="/setting/api-setting" element={<SettingApiSetting />} />
        <Route
          path="/setting/set-commission"
          element={<SettingSetCommission />}
        />
        <Route
          path="/setting/create-commission-plan"
          element={<SettingCreateCommissionPlan />}
        />
        {/* <Route path="/setting/add-bank-name" element={<SettingAddBankName />} /> */}
        <Route
          path="/setting/add-bank-details"
          element={<SettingAddBankDetails />}
        />
        <Route
          path="/setting/business-type"
          element={<SettingBusinessType />}
        />
        <Route path="/setting/edit-state" element={<SettingEditState />} />
        {/* <Route path="/setting/upi-setting" element={<SettingUpiSetting />} /> */}
        {/* <Route
          path="/setting/change-password"
          element={<SettingChangePassword />}
        /> */}

        {/* Report */}
        <Route
          path="/report/pending-recharge"
          element={<ReportPendingRecharge />}
        />
        <Route
          path="/report/recharge-history"
          element={<ReportRechargeHistory />}
        />
        {/* <Route
          path="/report/check-transaction"
          element={<ReportCheckTransaction />}
        /> */}
        {/* <Route
          path="/report/account-report"
          element={<ReportAccountReport />}
        /> */}
        <Route
          path="/report/master-distributor-report"
          element={<ReportMasterDistributorReport />}
        />
        <Route
          path="/report/distributor-report"
          element={<ReportDistributorReport />}
        />
        {/* <Route
          path="/report/retailer-report"
          element={<ReportRetailerReport />}
        /> */}

        {/* Support */}
        <Route path="/support/support-ticket" element={<SupportTicket />} />
        <Route path="/support/set-alert" element={<SupportSetAlert />} />
      </Routes>
    </>
  );
}

export default App;
