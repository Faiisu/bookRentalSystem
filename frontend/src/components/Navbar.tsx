import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import SearchBar from "./SearchBar";
import { handleLogout } from "../auth";
import SearchPage from "../pages/SearchPage";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCartStore();
  const [username, setName] = useState(localStorage.getItem("username") || null);

  useEffect(() => {
    const token = localStorage.getItem("email");
    setIsLoggedIn(!!token);
  }, [location]);

  // Handle search and navigate to search page
  const handleSearch = (query: string) => {
    if (query.trim() !== "") {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="bg-white w-full">
      {/* Primary Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b-2 border-gray-300 bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-around py-4 px-6">
          {/* Logo */}
          <Link to="/" className="mr-4 text-3xl font-bold">LOGO</Link>

          {/* Search Bar */}
          <div className="mr-4 flex-1 flex justify-center">
            <div className="w-full">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          {/* Cart + Authentication Section */}
          <div className="flex items-center gap-6">
            {/* Cart */}
            <Link to="/cart" className="relative hover:underline text-lg font-semibold">
              Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Authentication */}
            <div className="relative flex">
              {username != null ? (
                <>
                  <div className = "relative inline-block group">
                    <div                   
                      className="rounded-md !cursor-pointer hover:underline text-lg font-semibold"
                    >
                      {username}
                    </div>
                    
                      {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block">
                      <button
                          onClick={() => navigate("/PersonalInfo")}
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          My Account
                        </button>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Logout
                        </button>
                    </div>
                  </div>    
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:underline text-lg font-semibold">Login</Link>
                  <Link to="/register" className="hover:underline ml-4 text-lg font-semibold">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacing to prevent content from being hidden behind fixed navbar */}
      <div className="h-20"></div>

      {/* Categories Section Below Navbar */}
      <div className="bg-gray-100 py-3 border-b border-gray-300">
        <div className="container mx-auto flex justify-center gap-6 font-semibold uppercase text-sm">
          <Link to="/" className="hover:underline hover:bg-gray-200 px-3 py-2 rounded-md">Promotion</Link>
          <Link to="/search" className="hover:underline hover:bg-gray-200 px-3 py-2 rounded-md">All Series</Link>
          <Link to="/" className="hover:underline hover:bg-gray-200 px-3 py-2 rounded-md">Writers</Link>
          <Link to="/" className="hover:underline hover:bg-gray-200 px-3 py-2 rounded-md">Manga</Link>
          <Link to="/" className="hover:underline hover:bg-gray-200 px-3 py-2 rounded-md">Novel</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;