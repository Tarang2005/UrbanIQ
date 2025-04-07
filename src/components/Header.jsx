import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'; // Ensure @heroicons/react is installed

const Header = ({ selectedCity, isDarkMode, toggleDarkMode }) => {
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
      <div className="flex flex-col sm:flex-row items-center justify-between mb-5 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">UrbanIQ</h1>

        <div className="flex items-center gap-4">
            {selectedCity && (
             <div className="text-sm text-gray-600 dark:text-gray-300 mt-2 sm:mt-0 px-3 py-1 bg-gray-200 dark:bg-slate-700 rounded-full">
                Showing: <span className="font-medium text-gray-800 dark:text-gray-100">{selectedCity}</span>
             </div>
            )}

            <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
                {isDarkMode ? (
                    <SunIcon className="h-5 w-5 text-yellow-400" />
                ) : (
                    <MoonIcon className="h-5 w-5 text-indigo-500" />
                )}
            </button>
        </div>
      </div>

      <nav className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-sm dark:shadow-slate-700/50 p-2 flex space-x-1 sm:space-x-2 overflow-x-auto items-center">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out whitespace-nowrap relative group
                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-inner"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/60 dark:hover:bg-slate-700/60"
                }
              `}
            >
              {link.label}
               {!isActive && (
                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 dark:bg-indigo-400 group-hover:w-full transition-all duration-300"></span>
               )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Header;