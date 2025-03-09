import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookDetail from "./pages/BookDetail";
import Navbar from "./components/Navbar"; 
import Cart from "./pages/Cart";
import SearchPage from "./pages/SearchPage";
import PersonalInfo from "./pages/PersonalInfo";
import LoginAdmin from "./pages/adminPage/LoginAdmin";
import AdminSideBar from "./pages/adminPage/AdminSideBar";
import AdminMain from "./pages/adminPage/AdminMain";
import UserManage from "./pages/adminPage/userManage";
import StockManage from "./pages/adminPage/stockManage";

import { useState, useEffect } from "react";
import React from "react";

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

// ProtectedRoute Component for admin pages
const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const adminData = localStorage.getItem("adminData");
  if (!adminData) {
    return <Navigate to="/login/admin" replace />;
  }
  return <>{children}</>;
};

const App = () => {
  const adminData = localStorage.getItem("adminData");
  const [employeeData] = useState(adminData ? JSON.parse(adminData) : null);

  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;
    // If the path starts with "/adminPanel", update display to flex.
    if (location.pathname.startsWith("/AdminPanel")) {
      root.style.display = "flex";
    } else {
      // Reset to block (or your default) for other routes.
      root.style.display = "block";
    }
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/books" element={<><Navbar /><Books /></>} />
        <Route path="/books/:id" element={<><Navbar /><BookDetail /></>} />
        <Route path="/login" element={<><Navbar /><Login /></>} />
        <Route path="/register" element={<><Navbar /><Register /></>} />
        <Route path="/cart" element={<><Navbar /><Cart /></>} />
        <Route path="/search" element={<><Navbar /><SearchPage /></>} />
        <Route path="/PersonalInfo" element={<><Navbar /><PersonalInfo /></>} />
        
        {/* Admin route without Navbar */}
        <Route path="login/admin" element={<LoginAdmin />} />
        <Route path="/adminPanel/main" element={
          <ProtectedAdminRoute>
            <>
              <AdminSideBar />
              <AdminMain />
            </>
          </ProtectedAdminRoute>
        } />
        <Route path="/adminPanel/usermanage" element={
          <ProtectedAdminRoute>
            <>
              <AdminSideBar />
              <UserManage />
            </>
          </ProtectedAdminRoute>
        } />
        <Route path="/adminPanel/stockmanage" element={
          <ProtectedAdminRoute>
            <>
              <AdminSideBar />
              <StockManage />
            </>
          </ProtectedAdminRoute>
        } />
      </Routes>
    </>
  );
};

export default App;
