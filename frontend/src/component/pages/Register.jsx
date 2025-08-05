

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photopre, setPhotopre] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState({});
  const [strengthLabel, setStrengthLabel] = useState("Very Weak");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const navigate = useNavigate();

  const changephotohanderler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhotopre(reader.result);
      reader.readAsDataURL(file);
      setPhoto(file);
    }
  };

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter email first");
      return;
    }
    try {
      setOtpLoading(true);
      const { data } = await axios.post(
        "http://localhost:8080/api/users/send-otp",
        { email }
      );
      toast.success(data.message || "OTP sent successfully");
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Enter OTP");
      return;
    }
    try {
      setOtpLoading(true);
      const { data } = await axios.post(
        "http://localhost:8080/api/users/verify-otp",
        { email, otp }
      );
      toast.success(data.message || "OTP verified successfully");
      setOtpVerified(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const hamdelragister = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      toast.error("Please verify OTP first");
      return;
    }

    if (!name || !email || !phone || !password || !role || !education || !photo) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("photo", photo);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);

    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8080/api/users/ragister",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data.message || "User registered successfully");

      setEducation("");
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setPhone("");
      setPhotopre("");
      setPhoto("");

      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const checkPassword = (password) => {
    const checks = {
      length: password.length >= 6,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordChecks(checks);

    const score = Object.values(checks).filter(Boolean).length;
    if (score === 5) setStrengthLabel("Very Strong");
    else if (score === 4) setStrengthLabel("Strong");
    else if (score === 3) setStrengthLabel("Medium");
    else if (score === 2) setStrengthLabel("Weak");
    else setStrengthLabel("Very Weak");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md shadow-md rounded-lg bg-white p-4">
        <form onSubmit={hamdelragister}>
          <div className="text-center font-bold text-3xl mb-4">
            Sky<span className="text-red-600">Blog</span>
          </div>
          <h1 className="font-semibold text-xl">Register</h1>

          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 border rounded-md mt-2">
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded-md mt-2" />

          <div className="flex gap-2 mt-2">
            <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded-md" />
            <button type="button" onClick={handleSendOtp} disabled={otpLoading || otpVerified} className="bg-blue-500 text-white px-3 py-2 rounded-md">
              {otpLoading ? "Sending..." : otpVerified ? "Verified" : "Send OTP"}
            </button>
          </div>

          {otpSent && !otpVerified && (
            <div className="flex gap-2 mt-2">
              <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-2 border rounded-md" />
              <button type="button" onClick={handleVerifyOtp} disabled={otpLoading} className="bg-green-500 text-white px-3 py-2 rounded-md">
                {otpLoading ? "Verifying..." : "Verify"}
              </button>
            </div>
          )}

          <input type="number" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border rounded-md mt-2" />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              checkPassword(e.target.value);
            }}
            className="w-full p-2 border rounded-md mt-2"
          />

          {password && (
            <>
              <p className="text-sm mt-1 font-semibold">Password strength: {strengthLabel}</p>
              <ul className="text-sm mt-1 space-y-1">
                <li className={passwordChecks.length ? "text-green-600" : "text-red-600"}> {passwordChecks.length ? "✓" : "✗"} At least 6 characters</li>
                <li className={passwordChecks.upper ? "text-green-600" : "text-red-600"}> {passwordChecks.upper ? "✓" : "✗"} Contains uppercase letter</li>
                <li className={passwordChecks.lower ? "text-green-600" : "text-red-600"}> {passwordChecks.lower ? "✓" : "✗"} Contains lowercase letter</li>
                <li className={passwordChecks.number ? "text-green-600" : "text-red-600"}> {passwordChecks.number ? "✓" : "✗"} Contains a number</li>
                <li className={passwordChecks.special ? "text-green-600" : "text-red-600"}> {passwordChecks.special ? "✓" : "✗"} Contains special character</li>
              </ul>
            </>
          )}

          <select value={education} onChange={(e) => setEducation(e.target.value)} className="w-full p-2 border rounded-md mt-2 mb-4">
            <option value="">Select Education</option>
            <option value="Bca">BCA</option>
            <option value="Mca">MCA</option>
            <option value="Btech">B.Tech</option>
            <option value="Bcom">B.Com</option>
            <option value="MBA">MBA</option>
            <option value="other">Other</option>
          </select>

          <div className="flex items-center">
            <div className="photo w-20 h-20 mr-4">
              <img src={photopre || "photo"} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <input type="file" onChange={changephotohanderler} className="w-full p-2 border rounded-md mt-2" />
          </div>

          <p className="text-center mt-2">
            Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
          </p>

          <button type="submit" disabled={loading} className={`w-full p-2 mt-4 rounded-md text-white ${loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-800"}`}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
