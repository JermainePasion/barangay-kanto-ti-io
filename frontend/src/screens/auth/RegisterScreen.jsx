import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
        role: "user",
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      navigate("/"); // go to home
    } catch (err) {
      console.error("Registration failed", err);
      setError(err.response?.data?.message || "Error registering user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FEF3E2]">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md border-t-4 border-[#FA812F]">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#DD0303]">Create Account</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FAB12F]"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FAB12F]"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FAB12F]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FA812F] text-white py-2 px-4 rounded-md hover:bg-[#FAB12F] transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#DD0303] hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterScreen;
