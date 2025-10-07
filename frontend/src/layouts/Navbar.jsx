import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleAuth = () => {
    logout(); // clear user context + token
    navigate("/login");
  };

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <header className="bg-white shadow-md h-20 md:h-24 flex items-center justify-between px-4 lg:px-8 relative">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src="logo.png"
          alt="Logo"
          className="h-12 sm:h-14 md:h-16 lg:h-20 object-contain"
        />
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-semibold text-base lg:text-lg">
        <Link to="/" className="relative group text-gray-700 hover:text-secondary">
          Home
          <span className="absolute left-0 -bottom-1 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link to="/complaints" className="relative group text-gray-700 hover:text-secondary">
          Complaints
          <span className="absolute left-0 -bottom-1 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link to="/filecomplaint" className="relative group text-gray-700 hover:text-secondary">
          File Complaint
          <span className="absolute left-0 -bottom-1 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link to="/mycomplaints" className="relative group text-gray-700 hover:text-secondary">
          My Complaints
          <span className="absolute left-0 -bottom-1 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {isAdmin && (
          <Link to="/admin" className="relative group text-gray-700 hover:text-secondary">
            Admin
            <span className="absolute left-0 -bottom-1 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        )}
      </nav>

      {/* Desktop Auth Button */}
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={handleAuth}
          className="bg-[#DD0300] hover:bg-[#FAB12F] text-white font-semibold px-5 py-2 rounded-xl shadow-md transition-colors duration-200 ease-in-out"
        >
          {isLoggedIn ? "Log out" : "Log in"}
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-gray-700 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#FEF3E2] border-t border-gray-200 shadow-md md:hidden z-50">
          <nav className="flex flex-col text-center py-4 space-y-3 font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-secondary transition">Home</Link>
            <Link to="/complaints" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-secondary transition">Complaints</Link>
            <Link to="/filecomplaint" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-secondary transition">File Complaint</Link>
            <Link to="/mycomplaints" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-secondary transition">My Complaints</Link>
            {isAdmin && (
              <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-secondary transition">Admin</Link>
            )}

            <button
              onClick={handleAuth}
              className="bg-[#DD0300] hover:bg-[#FAB12F] text-white font-semibold px-5 py-2 rounded-xl mx-auto mt-2 w-1/2 transition-colors duration-200 ease-in-out"
            >
              {isLoggedIn ? "Log out" : "Log in"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
