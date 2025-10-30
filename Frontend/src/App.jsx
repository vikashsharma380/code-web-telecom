import React, { useEffect } from "react";
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

// Report Pages
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

// Admin Pages
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
import SupportSetAlert from "../Admin/AdminPages/SupportSetAlert";

// User Components
import UserChangePassword from "./Components/UserChangePassword";
import AddFund from "./Components/AddFund";
import UserSupportTicket from "./Components/UserSupportTicket";
import UserEditProfile from "./Components/UserEditProfile";
import UserMyCommission from "./Components/UserMyCommission";
import { useNavigate } from "react-router-dom";
import MasterDistributorRegistration from "../Admin/AdminPages/MasterDistributorRegistration";
import DistributorRegistration from "../Admin/AdminPages/DistributorRegistration";
import RetailerRegistration from "../Admin/AdminPages/RetailerRegistration";
import SettingsAddBankName from "../Admin/AdminPages/SettingsAddBankName";
import SettingUpiSetting from "../Admin/AdminPages/SettingUpiSetting";
import SettingChangePassword from "../Admin/AdminPages/SettingChangePassword";
import ReportCheckTransaction from "../Admin/AdminPages/ReportCheckTransaction";
import ReportRetailerReport from "../Admin/AdminPages/ReportRetailerReport";
import ManageMasterDistributor from "../Admin/ManageMasterDistributor";
import ManageDistributor from "../Admin/AdminPages/ManageDistributor";
import ManageRetailer from "../Admin/AdminPages/ManageRetailer";
import BalanceTransferRetailer from "../Admin/AdminPages/BalanceTransferRetailer";
import BalanceTransferDistributor from "../Admin/AdminPages/BalanceTransferDistributor";
import BalanceTransferMasterDistributor from "../Admin/AdminPages/BalanceTransferMasterDistributor";
// import CustomersDropdown from "../Admin/CustomersDropdown";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
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

        {/* Reports */}
        <Route path="/mini-statement" element={<MiniStatement />} />
        <Route path="/recharge-history" element={<RechargeHistory />} />
        <Route path="/ledger" element={<Ledger />} />
        <Route path="/refund-report" element={<RefundReport />} />
        <Route path="/my-earning" element={<MyEarning />} />
        <Route path="/search-transaction" element={<SearchTransaction />} />
        <Route path="/search-plan" element={<SearchPlan />} />
        <Route path="/upi-gateway" element={<UPIGateway />} />
        <Route path="/add-api" element={<AddAPI />} />
        <Route path="/site-enquiry" element={<SiteEnquiry />} />
        <Route path="/update-news" element={<UpdateNews />} />
        <Route path="/balance-transfer" element={<BalanceTransfer />} />

        {/* User */}
        <Route path="/change-password" element={<UserChangePassword />} />
        <Route path="/add-fund" element={<AddFund />} />
        <Route path="/support-ticket" element={<UserSupportTicket />} />
        <Route path="/edit-profile" element={<UserEditProfile />} />
        <Route path="/my-commission" element={<UserMyCommission />} />

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
        <Route
          path="/setting/add-bank-details"
          element={<SettingAddBankDetails />}
        />
        <Route
          path="/setting/business-type"
          element={<SettingBusinessType />}
        />
        <Route path="/setting/edit-state" element={<SettingEditState />} />

        {/* Report */}
        <Route
          path="/report/pending-recharge"
          element={<ReportPendingRecharge />}
        />
        <Route
          path="/report/recharge-history"
          element={<ReportRechargeHistory />}
        />
        <Route
          path="/report/master-distributor-report"
          element={<ReportMasterDistributorReport />}
        />
        <Route
          path="/report/distributor-report"
          element={<ReportDistributorReport />}
        />

        {/* Support */}
        <Route path="/support/set-alert" element={<SupportSetAlert />} />
        {/* New Registration Routes */}
        <Route
          path="/master-distributor-registration"
          element={<MasterDistributorRegistration />}
        />
        <Route
          path="/distributor-registration"
          element={<DistributorRegistration />}
        />
        <Route
          path="/retailer-registration"
          element={<RetailerRegistration />}
        />
        <Route
          path="/setting/add-bank-name"
          element={<SettingsAddBankName />}
        />
        <Route path="/setting/upi-setting" element={<SettingUpiSetting />} />
        <Route
          path="/setting/change-password"
          element={<SettingChangePassword />}
        />
        <Route
          path="/report/check-transaction"
          element={<ReportCheckTransaction />}
        />
        <Route
          path="/report/retailer-report"
          element={<ReportRetailerReport />}
        />
        <Route
          path="/manage-master-distributor"
          element={<ManageMasterDistributor />}
        />
        <Route path="/manage-distributor" element={<ManageDistributor />} />
        <Route path="/manage-retailer" element={<ManageRetailer />} />
        <Route
          path="/balance-transfer-master-distributor"
          element={<BalanceTransferMasterDistributor />}
        />
        <Route
          path="/balance-transfer-distributor"
          element={<BalanceTransferDistributor />}
        />
        <Route
          path="/balance-transfer-retailer"
          element={<BalanceTransferRetailer />}
        />
      </Routes>
      {/* <CustomersDropdown /> */}
    </>
  );
}

export default App;
