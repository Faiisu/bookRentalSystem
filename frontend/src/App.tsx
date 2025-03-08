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
import LoginAdmin from "./pages/LoginAdmin";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
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
        <Route path="/adminPanel" element={<AdminPanel />} />
        
      </Routes>
    </>
  );
};

export default App;