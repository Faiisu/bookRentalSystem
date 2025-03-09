import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Books from "./pages/Books"; // ✅ Changed Products → Books
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookDetail from "./pages/BookDetail"; // ✅ Changed ProductDetail → BookDetail
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

const App = () => {
  const adminData = localStorage.getItem("adminData");
  const [employeeData, setEmployeeObj] = useState(adminData?JSON.parse(adminData): null);
  const [name, setName] = useState();

  useEffect(() => {
    const root = document.getElementById("root");
    if(root == null) return;
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
      {/* Only render Navbar for these routes */}
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
        <Route path="/adminPanel/main" element={<><AdminSideBar/><AdminMain/></>} />
        <Route path="/adminPanel/usermanage" element={<><AdminSideBar/><UserManage/></>} />
        <Route path="/adminPanel/stockmanage" element={<><AdminSideBar/><StockManage/></>} />
      </Routes>
    </>
  );
};

export default App;