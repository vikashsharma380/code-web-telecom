import React from "react";
import { Routes, Route } from "react-router-dom";
import CodeWebTelecom from "./CodeWebFrontend";
import Login from "./pages/login";
import Signup from "./pages/signup";
import MobileRecharge from "./Components/MobileRecharge";

import { useParams } from "react-router-dom";
import ServicePage from "./pages/ServicePage";


function App() {
  return (
    <>
     
     
      <Routes>
        <Route path="/" element={<CodeWebTelecom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/service/:id" element={<ServicePage />} /> */}
        <Route path="/MobileRecharge" element={<MobileRecharge  />} />
        
         
      </Routes>
    </>
  );
}

export default App;
