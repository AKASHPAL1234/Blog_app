


import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utiles";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });
  const [strengthLabel, setStrengthLabel] = useState("Very Weak");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    const length = password.length >= 6;
    const upper = /[A-Z]/.test(password);
    const lower = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const passedChecks = [length, upper, lower, number, special].filter(Boolean).length;

    let label = "Very Weak";
    if (passedChecks === 5) label = "Very Strong";
    else if (passedChecks === 4) label = "Strong";
    else if (passedChecks === 3) label = "Medium";
    else if (passedChecks === 2) label = "Weak";

    setPasswordChecks({ length, upper, lower, number, special });
    setStrengthLabel(label);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/users/reset-password`, {
        email,
        newPassword,
      });
      toast.success(data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleReset} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter new password"
          className="border p-2 w-full mb-2"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            checkPasswordStrength(e.target.value);
          }}
        />

        <p className="text-sm font-medium mb-2">Password strength: <span className="font-bold">{strengthLabel}</span></p>

        <ul className="text-sm text-gray-700 space-y-1 mb-4">
          <li className={passwordChecks.length ? "text-green-600" : "text-red-600"}>✓ At least 6 characters</li>
          <li className={passwordChecks.upper ? "text-green-600" : "text-red-600"}>✓ Contains uppercase letter</li>
          <li className={passwordChecks.lower ? "text-green-600" : "text-red-600"}>✓ Contains lowercase letter</li>
          <li className={passwordChecks.number ? "text-green-600" : "text-red-600"}>✓ Contains a number</li>
          <li className={passwordChecks.special ? "text-green-600" : "text-red-600"}>✓ Contains special character</li>
        </ul>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;

