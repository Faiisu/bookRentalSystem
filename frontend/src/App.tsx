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

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} /> {/* ✅ Updated */}
        <Route path="/books/:id" element={<BookDetail />} /> {/* ✅ Updated */}
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