import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LogOutIcon, AlignJustifyIcon } from "lucide-react";
// import any additional icons if desired (e.g., for open/close)
// import { XIcon, MenuIcon } from "lucide-react"; // Example if available

const AdminSideBar = () => {
  const adminData = localStorage.getItem("adminData");
  const [employeeData] = useState(adminData ? JSON.parse(adminData) : null);
  const [isOpen, setIsOpen] = useState(true); // Sidebar defaults to open

  const handleLogout = () => {
    localStorage.removeItem("adminData");
    window.location.reload();
  };

  return (
    <>
      {isOpen ? (
        <div className=" bg-gray-800 text-white w-64 min-h-screen p-4 border-r-2 border-gray-700 z-10 fixed left-0 top-0">
          {/* Close Button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-white hover:text-gray-300"
          >
            {/* Replace "X" with an icon if desired */}
            X
          </button>
          {employeeData && (
            <div className="relative h-full">
              {/* Profile Section */}
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">{employeeData.name}</h2>
              </div>

              {/* Divider */}
              <hr className="border-gray-600 my-4" />

              {/* Navigation Links */}
              <nav>
                <ul>
                  <li className="mb-2">
                    <NavLink 
                      to="/AdminPanel/main" 
                      className={({ isActive }) => 
                        isActive ? "bg-gray-700 p-2 block rounded" : "hover:bg-gray-700 p-2 block rounded"
                      }
                    >
                      <span className="text-gray-100">MAIN</span>
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink 
                      to="/AdminPanel/usermanage" 
                      className={({ isActive }) => 
                        isActive ? "bg-gray-700 p-2 block rounded" : "hover:bg-gray-700 p-2 block rounded"
                      }
                    >
                      <span className="text-gray-100">MEMBERS</span>
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink 
                      to="/AdminPanel/stockmanage" 
                      className={({ isActive }) => 
                        isActive ? "bg-gray-700 p-2 block rounded" : "hover:bg-gray-700 p-2 block rounded"
                      }
                    >
                      <span className="text-gray-100">STOCK</span>
                    </NavLink>
                  </li>            
                </ul>
              </nav>

              {/* Logout Button */}
              <button
                type="button"
                className="bottom-0 w-full py-2 rounded-lg bg-red-500 text-white font-medium text-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition"
                onClick={handleLogout}
              >
                <LogOutIcon className="w-5 h-5" /> LOGOUT
              </button>
            </div>
          )}
        </div>
      ) : (
        // When sidebar is closed, show a fixed button at the top-left to reopen it.
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-2 left-2 z-20 bg-gray-800 text-white p-2 rounded hover:bg-gray-700"
        >
          {/* Replace "Open" with an icon if desired */}
          <AlignJustifyIcon/>
        </button>
      )}
    </>
  );
};

export default AdminSideBar;
