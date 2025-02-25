import React from 'react';

const Header = () => {
  return (
    <div className="flex justify-between items-center border-b p-6 bg-white">
      <h1 className="text-2xl font-bold text-gray-800"></h1>
      <div className="flex space-x-2">
        <input 
          type="text" 
          placeholder="Search Past Predictions" 
          className="px-4 py-2 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button 
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:shadow-outline"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Header;
