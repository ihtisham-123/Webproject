import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./assets/screens/Home";
import OfferkiScreen from "./assets/screens/OfferkiScreen";
import FeaturesScreen from "./assets/screens/FeaturesScreen";
import FAQScreen from "./assets/screens/FAQScreen";
import Signin from "./assets/components/Signin";
import Signup from "./assets/components/Signup";
import AdminLayout from "./assets/screens/AdminLayout";
import Dashboard from "./assets/components/Dashboard";
import PlaceOrder from "./assets/components/PlaceOrder";
import Withdraw from "./assets/components/Withdraw";
import Referral from "./assets/components/Referral";
import KYC from "./assets/components/KYC";
import EmailVerification from "./assets/components/EmailVerification";



import AdminPanel from "./assets/components/Admin/AdminPanel";
import SearchOrders from "./assets/components/Admin/SearchOrders";
import Users from "./assets/components/Admin/Users";
const App: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Offer" element={<OfferkiScreen />} />
      <Route path="/Global" element={<FeaturesScreen />} />
      <Route path="/FAQ" element={<FAQScreen />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/emailverification" element={<EmailVerification />} />

      {/* Protected routes with sidebar */}
      <Route path="/" element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/kyc" element={<KYC />} />
      </Route>

      {/* Admin routes */}
      
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin/dashboard" element={<SearchOrders />} />
      <Route path="/admin/dashboard/users" element={<Users />} />



    </Routes>
  );
};

export default App;