import React from "react";
import { Link, useLocation } from "react-router-dom";

// Removed handleSearch from props
const Header = ({ selectedCity }) => {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/overview", label: "Overview" },
    { path: "/livability", label: "Livability" },
    { path: "/weather", label: "Weather" },
    { path: "/pollution", label: "Pollution" },
    { path: "/traffic", label: "Traffic" },
    { path: "/solar", label: "Solar" },
  ];

  // Removed searchTerm state and onSearchSubmit function

  return (
    <div className="mb-6">
      {/* Top Row: Title and Showing City */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">UrbanIQ</h1>

        {/* Removed Search Form */}

        {/* Display the currently active city */}
        {selectedCity && (
          <div className="text-sm text-gray-600 mt-2 sm:mt-0">
            Showing: {selectedCity}
          </div>
        )}
      </div>

      {/* Navigation Tabs/Links */}
      <nav className="bg-white rounded-lg shadow-sm p-2 flex space-x-4 overflow-x-auto">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out whitespace-nowrap ${
              location.pathname === link.path
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Header;