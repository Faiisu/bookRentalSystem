import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import SearchBar from "./SearchBar";


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCartStore();
  const [name, setName] = useState(localStorage.getItem("name"));
  const [dropdown, setDropDown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("email");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    navigate("/Login")
  };

  // Handle search and navigate to search page
  const handleSearch = (query: string) => {
    if (query.trim() !== "") {
      navigate(`/search?q=${query}`);
    }
  };

  const showDropDown = () => {
    setDropDown(!dropdown);
  }

  return (
    <div className="bg-white min-w-full ">
      {/* Primary Navbar */}
      <nav className="min-w-[100vw] fixed top-0 z-9999 border-b-3 border-black flex items-center justify-between p-4 bg-white">
      {/* Logo */}
      <Link to="/" className="text-3xl font-bold">LOGO</Link>
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
            <div className="relative group">           
              <button onClick={showDropDown} className="!hover:underline !border-0">{name}</button>
              {/* dropdown menu */}
              <div className="absolute right-2 top-[10px] hidden mt-2 w-64 space-y-2 bg-white border border-gray-200 rounded-md shadow-lg group-hover:block">
                <a href="#" onClick={()=>{navigate("\PersonalInfo")}} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Account</a>
                <a href="#" onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</a>
              </div> 
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline ml-4">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
      <div className="h-21"></div>
      {/* Categories Section Below Navbar */}
      <div className="bg-gray-100 py-3">
        <div className="flex justify-center gap-6 font-semibold uppercase text-sm">
          <Link to="/" className="hover:underline hover:bg-gray-200">Promotion</Link>
          <Link to="/products" className="hover:underline hover:bg-gray-200">All Series</Link>
          <Link to="/" className="hover:underline hover:bg-gray-200">Writers</Link>
          <Link to="/" className="hover:underline hover:bg-gray-200">Manga</Link>
          <Link to="/" className="hover:underline hover:bg-gray-200">Novel</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;