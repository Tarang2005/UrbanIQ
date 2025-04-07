import React from "react";

const Header = ({ selectedCity, setSelectedCity }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-800">UrbanIQ Dashboard</h1>

      <div className="relative inline-block text-left">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Mumbai">Chennai</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
