import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-md h-20 md:h-24 flex items-center justify-between px-4 lg:px-8">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2">
        <img
          src="https://i.ibb.co/W6ZXdqN/2021-10-26-16h20-21.png"
          alt="Logo"
          className="h-12"
        />
      </a>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-semibold text-base lg:text-lg">
        {["Home", "Services", "About", "Projects", "Skills", "Contacts"].map(
          (item) => (
            <a
              key={item}
              href="#"
              className="relative group text-gray-700 hover:text-[#FA812F]"
            >
              <span>{item}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-[#FAB12F] transition-all duration-300 group-hover:w-full"></span>
            </a>
          )
        )}
      </nav>

      {/* Contact Button (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        <button className="bg-[#DD0303] hover:bg-[#FA812F] text-white font-semibold px-5 py-2 rounded-xl shadow-md transition-all duration-200">
          Contact Me
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
            {["Home", "Services", "About", "Projects", "Skills", "Contacts"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-700 hover:text-[#FA812F] transition"
                >
                  {item}
                </a>
              )
            )}
            <button className="bg-[#DD0303] hover:bg-[#FA812F] text-white font-semibold px-5 py-2 rounded-xl mx-auto mt-2 w-1/2">
              Contact Me
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
