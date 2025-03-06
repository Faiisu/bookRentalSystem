import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircleIcon, LogOutIcon } from "lucide-react";

const PersonalInfo = () => {
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [name, setName] = useState(localStorage.getItem("name"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        navigate("/Login");
    };

    return (
        <div className="flex justify-center w-[100vw] min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
            <div className="mt-20 h-150 bg-white p-8 rounded-2xl shadow-2xl w-[22rem] text-center relative">
                
                {/* Avatar & Username */}
                <div className="flex flex-col items-center mb-4">
                    <UserCircleIcon className="w-20 h-20 text-gray-400" />
                    <h2 className="text-xl font-semibold mt-2 text-gray-700">{name || "Username"}</h2>
                    <p className="text-gray-500 text-sm">{email || "email@example.com"}</p>
                </div>

                {/* Divider */}
                <hr className="my-4 border-gray-200" />

                {/* Logout Button */}
                <button
                    type="button"
                    className="w-full py-2 rounded-lg bg-red-500 text-white font-medium text-lg flex items-center justify-center gap-2 hover:bg-red-600 transition"
                    onClick={handleLogout}
                >
                    <LogOutIcon className="w-5 h-5" /> LOGOUT
                </button>
            </div>
        </div>
    );
};

export default PersonalInfo;