import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img11 from "../assets/OncoDetect.png";

const LogoutPage = ({ setIsAuthenticated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No active session found');
        setIsLoading(false);
        return;
      }

      // Try to send an empty request body to fix the 422 error
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // Add empty object as request body
      });

      if (response.ok) {
        // Clear token from storage
        localStorage.removeItem('token');
        setSuccess('Successfully logged out');
        
        // Update authentication state after a brief delay to show success message
        setTimeout(() => {
          setIsAuthenticated(false);
          navigate('/login');
        }, 1500);
      } else {
        // Handle common error cases
        if (response.status === 422) {
          console.log("422 Unprocessable Entity - Trying alternative logout approach");
          // If API still fails, just clear the token and log out on the client side
          localStorage.removeItem('token');
          setSuccess('Logged out on client side');
          setTimeout(() => {
            setIsAuthenticated(false);
            navigate('/login');
          }, 1500);
        } else {
          const data = await response.json();
          setError(data.message || 'Logout failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
      
      // Even if the API request fails, we can still log out on client side
      localStorage.removeItem('token');
      setSuccess('Logged out on client side');
      
      setTimeout(() => {
        setIsAuthenticated(false);
        navigate('/login');
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-96 text-center">
        <div className="flex justify-center mb-6">
          <img src={img11} alt="OncoDetect Logo" className="h-20" />
        </div>
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Onco<span className="text-gray-800">Detect</span></h1>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}
        
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-2">Confirm Logout</h2>
          <p className="text-gray-600">Are you sure you want to log out of your account?</p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={handleLogout}
            className={`w-full ${isLoading ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'} text-white py-3 rounded-md transition`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging out...' : 'Logout'}
          </button>
          
          <button
            onClick={handleCancel}
            className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 py-3 rounded-md transition"
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;