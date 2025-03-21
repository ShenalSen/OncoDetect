import React, { useState } from 'react';
import img11 from "../assets/OncoDetect.png"; 
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For registration
  const [confirmPassword, setConfirmPassword] = useState(''); // For registration
  const [phone, setPhone] = useState(''); // New state for phone number
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Login logic
      if (email === "admin@example.com" && password === "password123") {
        setIsAuthenticated(true); 
        navigate("/");
      } else {
        alert("Invalid credentials, please try again.");
      }
    } else {
      // Registration logic
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      if (!phone.match(/^\d{10}$/)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }
      alert("Registration successful! Please log in.");
      setIsLogin(true); // Switch to login after registration
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-96 text-center border-4 border-purple-500">
        <div className="flex justify-center mb-6">
          <img src={img11} alt="OncoDetect Logo" className="h-20" />
        </div>
        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          Onco<span className="text-gray-800">Detect</span>
        </h1>
        <h2 className="text-xl font-semibold mb-4">
          {isLogin ? "Login to your account" : "Register a new account"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 border-2 border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="w-full p-3 border-2 border-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <input
              type="email"
              placeholder="Enter email here"
              className="w-full p-3 border-2 border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter password here"
              className="w-full p-3 border-2 border-red-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full p-3 border-2 border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          {isLogin ? "New to OncoDetect?" : "Already have an account?"}{" "}
          <span
            className="text-purple-700 font-semibold cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
