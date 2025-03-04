import React from "react";
import { FiSearch, FiBell } from "react-icons/fi";

const Header01 = () => {
  return (
    <div className="fixed top-0 left-64 w-[calc(100%-16rem)] bg-white shadow-md z-50 flex items-center justify-between p-4">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      {/* Search Bar & Notification */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative w-64 lg:w-80">
          <input
            type="text"
            placeholder="Search Past Predictions"
            className="w-full h-9 pl-4 pr-10 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <FiSearch className="absolute right-3 top-2.5 text-gray-500" size={16} />
        </div>

        {/* Notification Icon */}
        <div className="relative p-2 bg-purple-100 rounded-full cursor-pointer hover:bg-purple-200">
          <FiBell className="text-purple-600" size={18} />
        </div>
      </div>
    </div>
  );
};

export default Header01;
