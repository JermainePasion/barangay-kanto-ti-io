import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow-md h-20 md:h-24 flex items-center justify-between px-4 lg:px-8">
      <Link to="/" className="flex items-center gap-2">
        <img
          src="https://i.ibb.co/W6ZXdqN/2021-10-26-16h20-21.png"
          alt="Logo"
          className="h-12"
        />
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-semibold text-base lg:text-lg">
        <Link to="/" className="relative group text-gray-700 hover:text-secondary">
          <span>Home</span>
          <span className="absolute left-0 -bottom-1 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link to="/complaint" className="relative group text-gray-700 hover:text-secondary">
          <span>Complaints</span>
          <span className="absolute left-0 -bottom-1 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link to="/filecomplaint" className="relative group text-gray-700 hover:text-secondary">
          <span>File Complaint</span>
          <span className="absolute left-0 -bottom-1 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link to="/mycomplaints" className="relative group text-gray-700 hover:text-secondary">
          <span>My Complaints</span>
          <span className="absolute left-0 -bottom-1 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link to="/admin" className="relative group text-gray-700 hover:text-secondary">
          <span>Admin</span>
          <span className="absolute left-0 -bottom-1 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </nav>

 
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="bg-accent hover:bg-primary text-white font-semibold px-5 py-2 rounded-xl shadow-md transition-colors duration-200 ease-in-out"
        >
          Log out
        </button>
      </div>

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


      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#FEF3E2] border-t border-gray-200 shadow-md md:hidden z-50">
          <nav className="flex flex-col text-center py-4 space-y-3 font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-secondary transition">Home</Link>
            <Link to="/complaint" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-secondary transition">Complaints</Link>
            <Link to="/filecomplaint" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-secondary transition">File Complaint</Link>
            <Link to="/mycomplaints" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-secondary transition">My Complaints</Link>
            <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-secondary transition">Admin</Link>

            <button
              onClick={handleLogout}
              className="bg-accent hover:bg-primary text-white font-semibold px-5 py-2 rounded-xl mx-auto mt-2 w-1/2 transition-colors duration-200 ease-in-out"
            >
              Log out
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
