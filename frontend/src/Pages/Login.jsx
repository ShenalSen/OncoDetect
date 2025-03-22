// import React, { useState } from 'react';
// import img11 from "../assets/OncoDetect.png"; 
// import { useNavigate } from 'react-router-dom';

// const LoginPage = ({ setIsAuthenticated }) => {
//   const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  
//   // Login states
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
  
//   // Register states
//   const [username, setUsername] = useState(''); // For registration
//   const [specialization, setSpecialization] = useState(''); // For registration
//   const [licenseNumber, setLicenseNumber] = useState(''); // For registration
//   const [hospital, setHospital] = useState(''); // For hospital
//   const [contactNumber, setContactNumber] = useState(''); // For registration
  
//   // UI states
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
  
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setIsLoading(true);

//     if (isLogin) {
//       // Login logic
//       try {
//         const response = await fetch('http://localhost:5000/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ email, password }),
//           credentials: 'include'
//         });

//         const data = await response.json();

//         if (response.ok) {
//           localStorage.setItem('token', data.token);
//           setIsAuthenticated(true);
//         } else {
//           setError(data.message || 'Login failed. Please try again.');
//         }
//       } catch (error) {
//         setError('Network error. Please check your connection and try again.');
//         console.error('Login error:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       // Registration logic
//       try {
//         const response = await fetch('http://localhost:5000/register', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ 
//             email, 
//             username, 
//             password,
//             specialization,
//             licenseNumber,
//             hospital,
//             contactNumber
//           })
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setSuccess('Registration successful! You can now login.');
          
//           // Clear registration form
//           setEmail('');
//           setPassword('');
//           setUsername('');
//           setSpecialization('');
//           setLicenseNumber('');
//           setHospital('');
//           setContactNumber('');
          
//           // Switch to login form
//           setTimeout(() => {
//             setIsLogin(true);
//           }, 2000);
//         } else {
//           setError(data.message || 'Registration failed. Please try again.');
//         }
//       } catch (error) {
//         setError('Network error. Please check your connection and try again.');
//         console.error('Registration error:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-white py-10">
//       <div className="bg-white p-10 rounded-2xl shadow-xl w-96 text-center border-4 border-purple-500">
//         <div className="flex justify-center mb-6">
//           <img src={img11} alt="OncoDetect Logo" className="h-20" />
//         </div>
//         <h1 className="text-3xl font-bold text-purple-700 mb-6">
//           Onco<span className="text-gray-800">Detect</span>
//         </h1>
        
//         {error && (
//           <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
//             {error}
//           </div>
//         )}
        
//         {success && (
//           <div className="mb-4 p-2 bg-green-100 text-green-700 rounded text-sm">
//             {success}
//           </div>
//         )}
        
//         <h2 className="text-xl font-semibold mb-4">
//           {isLogin ? "Login to your account" : "Register a new account"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {!isLogin && (
//             <>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Enter your name"
//                   className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                   disabled={isLoading}
//                 />
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Enter your specialization"
//                   className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   value={specialization}
//                   onChange={(e) => setSpecialization(e.target.value)}
//                   required
//                   disabled={isLoading}
//                 />
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Enter your medical license number"
//                   className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   value={licenseNumber}
//                   onChange={(e) => setLicenseNumber(e.target.value)}
//                   required
//                   disabled={isLoading}
//                 />
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Enter your hospital/clinic"
//                   className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   value={hospital}
//                   onChange={(e) => setHospital(e.target.value)}
//                   required
//                   disabled={isLoading}
//                 />
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Enter your contact details"
//                   className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   value={contactNumber}
//                   onChange={(e) => setContactNumber(e.target.value)}
//                   required
//                   disabled={isLoading}
//                 />
//               </div>
//             </>
//           )}
//           <div>
//             <input
//               type="email"
//               placeholder="Enter email here"
//               className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               disabled={isLoading}
//             />
//           </div>
//           <div>
//             <input
//               type="password"
//               placeholder="Enter password here"
//               className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               disabled={isLoading}
//             />
//           </div>
//           <button
//             type="submit"
//             className={`w-full ${isLoading ? 'bg-purple-400' : 'bg-purple-600'} text-white py-3 rounded-md hover:bg-purple-700 transition`}
//             disabled={isLoading}
//           >
//             {isLoading ? (isLogin ? "Logging in..." : "Registering...") : (isLogin ? "Login" : "Register")}
//           </button>
//         </form>
//         <p className="mt-4 text-sm text-gray-600">
//           {isLogin ? "New to OncoDetect?" : "Already have an account?"}{" "}
//           <span
//             className="text-purple-700 font-semibold cursor-pointer"
//             onClick={() => {
//               setIsLogin(!isLogin);
//               setError('');
//               setSuccess('');
//             }}
//           >
//             {isLogin ? "Register here" : "Login here"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// export default LoginPage;
import React, { useState } from 'react';
import img11 from "../assets/OncoDetect.png"; 
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For registration
  const [confirmPassword, setConfirmPassword] = useState(''); // For registration
  const [specialization, setSpecialization] = useState(''); // For registration
  const [medicalLicense, setMedicalLicense] = useState(''); // For registration
  const [contactDetails, setContactDetails] = useState(''); // For registration
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
      alert("Registration successful! Please log in.");
      setIsLogin(true); // Switch to login after registration
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white py-10">
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
            <>
              <div>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter your specialization"
                  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter your medical license number"
                  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={medicalLicense}
                  onChange={(e) => setMedicalLicense(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter your contact details"
                  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={contactDetails}
                  onChange={(e) => setContactDetails(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <div>
            <input
              type="email"
              placeholder="Enter email here"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter password here"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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