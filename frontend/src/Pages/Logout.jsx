import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    setIsAuthenticated(false); // Update the authentication state
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white border border-purple-300 p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Are you sure you want to log out?
        </h2>
        <div className="space-x-4">
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-md bg-purple-200 text-purple-800 font-medium hover:bg-purple-300 transition"
          >
            Yes, I want to Logout
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;