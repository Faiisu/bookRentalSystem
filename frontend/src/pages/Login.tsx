import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const Login = () => {
  const [email, setEmail] = useState(""); // Manage email state
  const [password, setPassword] = useState(""); // Manage password state
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔥 Login component mounted");
  }, []);

  // Debug function to check if input is updating
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("📝 Email Input:", e.target.value);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("🔑 Password Input:", e.target.value);
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const data = await loginUser(email, password); // Call API function
      console.log("✅ Login Successful:", data);

      // Store token in localStorage
      localStorage.setItem("token", data.token);

      // Redirect to home page after successful login
      navigate("/");

    } catch (err: any) {
      console.error("❌ Login Error:", err);
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="relative z-10 bg-white text-black w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="relative z-10 bg-white text-black w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className={`w-full p-2 rounded ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} text-white`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;