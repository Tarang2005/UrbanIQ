// src/components/Header.jsx

import React from "react";
import { Link, useLocation } from "react-router-dom";

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

  return (
    <div className="mb-6">
      {/* Top Row: Title and Showing City */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-5 gap-4"> {/* Increased bottom margin slightly */}
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">UrbanIQ</h1> {/* Slightly larger title */}

        {selectedCity && (
          <div className="text-sm text-gray-600 mt-2 sm:mt-0 px-3 py-1 bg-gray-200 rounded-full"> {/* Added subtle background chip */}
            Showing: <span className="font-medium">{selectedCity}</span>
          </div>
        )}
      </div>

      {/* Navigation Container - Example: Subtle background, maybe less aggressive shadow */}
      <nav className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-2 flex space-x-1 sm:space-x-2 overflow-x-auto items-center">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              // Updated Link Styling
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out whitespace-nowrap relative group
                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-inner" // Active state: Darker bg, white text
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60" // Inactive state: Subtle hover
                }
              `}
            >
              {link.label}
               {/* Optional: Animated underline effect on hover for inactive links */}
               {!isActive && (
                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
               )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Header;