import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/login", {
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
    <div className="min-h-screen flex items-center justify-center bg-[#FEF3E2]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-[#FAB12F]">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#FA812F]">Login</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FAB12F]"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
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
          <a href="/register" className="text-[#FA812F] font-medium hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginScreen;
