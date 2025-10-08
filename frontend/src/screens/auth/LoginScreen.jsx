import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ConstructionSVG from "../../components/ConstructionSVG";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/login`, {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);

      login(data.user);
      window.location.href = "/";
    } catch (err) {
      console.error("Login failed", err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FEF3E2] text-[#2E2E2E] ">
      {/* Left Section — Branding */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-[#FAB12F] text-white p-10 rounded-r-[2rem] shadow-lg">
        <motion.h1
        className="text-6xl font-bold mb-4 text-white"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        BRGY. KANTO TIÑO
      </motion.h1>
        <motion.p
        className="text-lg opacity-90 text-center max-w-sm mb-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      >
        Building Better Barangays Through Smart Reporting
      </motion.p>
        <ConstructionSVG/>
      </div>

      {/* Right Section — Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-[#FAB12F]">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#FA812F]">
            Login
          </h2>

          {error && (
            <p className="text-red-500 mb-4 text-center font-medium">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-[#2E2E2E]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FAB12F]"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-[#2E2E2E]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FAB12F]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FAB12F] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#FA812F] transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-[#FA812F] font-medium hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
