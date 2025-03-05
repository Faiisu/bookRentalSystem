import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar"; // ✅ Import Navbar component
import Cart from "./pages/Cart";
import SearchPage from "./pages/SearchPage";
import PersonalInfo from "./pages/PersonalInfo";

const App = () => {
  return (
    <>
      <Navbar /> {/* ✅ Navbar is now separate */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/PersonalInfo" element={<PersonalInfo />} />
      </Routes>
    </>
  );
};

export default App;