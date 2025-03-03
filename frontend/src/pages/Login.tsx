import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, fetchUserByEmail } from "../api";
// import { EyeIcon, EyeOffIcon } from "lucide-react"; 
// import { EyeOffIcon } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState(""); // Manage email state
  const [password, setPassword] = useState(""); // Manage password state
  const [error, setError] = useState<string | null>(null);
  const [accept, setAccept] = useState<string| null>(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  const onPageLoad = () =>{
    if(localStorage.getItem("name") != null){
      setAccept(`✅ Login Successful. Welcome ${localStorage.getItem("name")}`);
    }
  }
  if(sessionStorage.getItem('reload') === 'true') {
    onPageLoad();
    sessionStorage.removeItem('reload');
  } else{
    sessionStorage.setItem('reload', 'true');
  }

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
      try{
        const res = await fetchUserByEmail(email);
      } catch(error){
        setError("Email not found");
        setLoading(false);
        return;
      }
      if(password == ""){
        setError("Password can't empty");
        setLoading(false);
        return;
      }

      const data = await loginUser(email, password); // Call API function
      console.log("✅ Login Successful:", data.Member.name);
      setAccept(`✅ Login Successful. Welcome ${data.Member.name}`);
      localStorage.setItem("email", email);
      localStorage.setItem("name", data.Member.name);
      window.location.reload();
      // // Store token in localStorage
      // localStorage.setItem("token", data.token);

      // // Redirect to home page after successful login
      // navigate("/");

    } catch (err: any) {
      console.error("❌ Login Error:", err);
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center h-[90vh] bg-gray-100 min-w-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 mb-30">
        {!accept &&
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        }
        {accept &&
          <h2 className="text-2xl font-semibold text-center mb-4">Login Successful</h2>
        }
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {accept && <p className="text-green-500 text-sm mb-4">{accept}</p>}
        {!accept &&
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

              <div className="flex items-center w-full border border-gray-300 rounded mt-1 text-black">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  className="p-2 m-0 w-full border-gray-300 rounded text-black"
                />
                <button
                  type = "button"
                  className="p-2 z-10 absolute right-1 p-0 m-0 appearance-none border-none focus:outline-none focus:ring-0 shadow-none"
                  onClick={()=> setShowPassword(!showPassword)}
                >
                  {/* {showPassword? :
                    <EyeOffIcon size={15} className="text-gray-500" /> :
                    <EyeIcon size={15} className="text-gray-500 pl-0 pr-0" />
                    } */}
                  
                </button>
              </div>
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
        }
      </div>
    </div>
  );
};

export default Login;