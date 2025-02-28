import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api"; // ✅ Import API function
import { EyeIcon, EyeOffIcon } from "lucide-react"; 

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  
  const navigate = useNavigate(); // Redirect after successful signup

  // Handle form submission
  const handleRegister = async () => {
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const data = await signupUser(email, password); // Call API
      console.log("✅ Signup Successful:", data);

      // Store token in localStorage
      localStorage.setItem("token", data.token);

      // Redirect user to home page
      navigate("/");

    } catch (err: any) {
      console.error("❌ Signup Error:", err);
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 mb-30">
        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submit */}
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="relative z-10 bg-white text-black w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          {/* Password Input with Toggle Button */}
          <div className="mb-4 relative">
            <div className="flex">
              <label className="block text-gray-700">
                Password 
              </label>
              <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 z-10 p-0 m-0 ml-1 appearance-none border-none"
                  >
                    {showPassword ?
                      <EyeOffIcon size={15} className="text-gray-500" /> :
                      <EyeIcon size={15} className="text-gray-500 pl-0 pr-0" />}
              </button>
            </div>    

            <div className="flex items-center w-full border border-gray-300 rounded mt-1 text-black">
              <input
                type={showPassword ? "text" : "password"} // ✅ Toggle visibility
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 m-0 w-full border-gray-300 rounded text-black"
                required />          
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">           
            <label className="block text-gray-700">
              Confirm Password 
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="relative bg-white text-black w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="button"
            onClick={handleRegister}
            className={`w-full p-2 rounded ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"} text-white`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;