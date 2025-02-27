import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCartStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  // Handle search and navigate to search page
  const handleSearch = (query: string) => {
    if (query.trim() !== "") {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="bg-white">
      {/* Primary Navbar */}
      <nav className="border-b-3 border-black flex items-center justify-between p-4 bg-white">
      {/* Logo */}
      <Link to="/" className="text-3xl font-bold">BOOK</Link>

      {/* Search Bar */}
      <div className="w-1/3">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Cart + Authentication Section */}
      <div className="flex items-center gap-6">
        {/* Cart */}
        <Link to="/cart" className="relative hover:underline">
          Cart
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </Link>

        {/* Authentication */}
        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline ml-4">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
      {/* Categories Section Below Navbar */}
      <div className="bg-gray-100 py-3">
        <div className="flex justify-center gap-6 font-semibold uppercase text-sm">
          <Link to="/" className="hover:underline hover:bg-gray-200">Promotion</Link>
          <Link to="/" className="hover:underline hover:bg-gray-200">All Series</Link>
          <Link to="/" className="hover:underline hover:bg-gray-200">Writers</Link>
          <Link to="/" className="hover:underline hover:bg-gray-200">Manga</Link>
          <Link to="/" className="hover:underline hover:bg-gray-200">Novel</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;