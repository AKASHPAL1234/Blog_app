




import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";

function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { setIsAuthenication } = useAuth();
  const navigate = useNavigate();

  const handelLogin = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      toast.error("Fill all fields");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/users/login",
        { email, password, role },
        { withCredentials: true }
      );

      toast.success(data.message || "User login successful");
      setIsAuthenication(true);
      setEmail("");
      setPassword("");
      setRole("");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md shadow-md rounded-lg bg-white p-6">
        <form onSubmit={handelLogin}>
          <div className="text-center font-bold text-3xl mb-4">
            Sky<span className="text-red-600">Blog</span>
          </div>
          <h1 className="font-semibold text-xl mb-4">Login</h1>
          
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded-md mt-2 mb-2"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md mt-2 mb-2"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md mt-2 mb-4"
          />
          <Link to='/resetpassword'>

            <p className="text-blue-800 underline">Forget password</p>

          </Link>

          <p className="text-center mb-4">
            No account?{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded-md text-white ${
              loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-800"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
