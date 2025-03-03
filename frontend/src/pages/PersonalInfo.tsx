import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser, fetchUserByEmail } from "../api"; // ✅ Import API function
import { EyeIcon, EyeOffIcon } from "lucide-react"; 

const PersonalInfo = () => {
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [name, setName] = useState(localStorage.getItem("name"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        navigate("/Login")
      };
    
     // Handle form submission

    return (
        <div className="flex items-center justify-center min-h-[100vh] min-w-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 mb-30">
            <h2 className="text-2xl font-semibold text-center mb-4">My Profile</h2>
            
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="mt-4">Username: {name}</div>
                <div className="mt-4">Email : {email}</div>

                <button
                type="button"              
                className={`w-full mt-4 p-1 rounded bg-blue-500 hover:bg-blue-600 text-white`}
                onClick={handleLogout}
                >
                    LOGOUT
                </button>
            
            </form>
        </div>
        </div>
    );
};

export default PersonalInfo;