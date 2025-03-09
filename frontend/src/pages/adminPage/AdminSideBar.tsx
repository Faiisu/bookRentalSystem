import { useState } from "react";
import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
  const adminData = localStorage.getItem("adminData");
  const [employeeData] = useState(adminData ? JSON.parse(adminData) : null);

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4 border-r-2 border-gray-700">
      {employeeData && (
        <div>
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
                  <label className="text-gray-100">MAIN</label>
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink 
                  to="/AdminPanel/usermanage" 
                  className={({ isActive }) => 
                    isActive ? "bg-gray-700 p-2 block rounded" : "hover:bg-gray-700 p-2 block rounded"
                  }
                >
                    <label className="text-gray-100">MEMBERS</label>
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink 
                  to="/AdminPanel/stockmanage" 
                  className={({ isActive }) => 
                    isActive ? "bg-gray-700 p-2 block rounded" : "hover:bg-gray-700 p-2 block rounded"
                  }
                >
                  <label className="text-gray-100">STOCK</label>
                </NavLink>
              </li>            
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AdminSideBar;
