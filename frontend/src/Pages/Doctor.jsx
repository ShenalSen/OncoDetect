import React, { useState, useEffect } from 'react';
import doctorImage from '../assets/doctor.jpg';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Doctor = () => {
  const [doctor, setDoctor] = useState({
    name: 'Loading...',
    specialization: '',
    licenseNumber: '',
    contactNumber: '',
    email: '',
    hospital: '',
    yearsExperience: 0,
    totalPatients: 0,
    predictionsMade: 0,
    accuracyRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        console.log("Fetching doctor profile with token:", token ? "Token exists" : "No token");
        
        const response = await axios.get('http://localhost:5000/doctor/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log("API Response:", response.data);
        
        if (response.data && Object.keys(response.data).length > 0) {
          setDoctor(response.data);
          setError(null);
        } else {
          console.warn("API returned empty data, using fallback");
          throw new Error("Empty data received");
        }
      } catch (err) {
        console.error("Error fetching doctor profile:", err);
        console.error("Error details:", err.response?.data || "No response data");
        setError("Failed to load doctor profile. Using default data.");
        
        // Fallback to demo data if API fails
        setDoctor({
          name: 'Ashan Perera',
          specialization: 'Consultant Clinical Oncologist',
          licenseNumber: 'SLMC 769873458T',
          contactNumber: '+9476 741 9000',
          email: 'ashanp@nw.dr.lk',
          hospital: 'Nawaloka Hospitals PLC',
          yearsExperience: 15,
          totalPatients: 250,
          predictionsMade: 120,
          accuracyRate: 98
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchDoctorProfile();
  }, [Navigate]);
  return (
    <div className="bg-gray-100 min-h-screen w-full flex justify-center items-center">
      {/* Responsive container that adjusts based on screen size */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        {/* Main content area */}
        <div className="w-full">
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              <p>{error}</p>
            </div>
          )}

          {/* Main Doctor Profile Container */}
          <div className="bg-white border border-gray-300 shadow-md rounded-lg p-4 sm:p-6 md:p-8">
            {/* Doctor Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-left">
              Doctor Profile
            </h1>

            {loading ? (
              <div className="flex justify-center items-center py-8 sm:py-12">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <>
                {/* Personal Information Box (light ash) */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-3 sm:mb-4 text-left">
                    Personal Information
                  </h2>
                  <div className="flex flex-col md:flex-row items-center md:items-start">
                    <img
                      src={doctorImage}
                      alt={doctor.name}
                      className="rounded-full h-24 w-24 sm:h-32 sm:w-32 md:mr-6 mb-4 md:mb-0 object-cover border-2 border-gray-200"
                    />
                    <div className="text-gray-700 space-y-2 text-center md:text-left w-full">
                      <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="font-semibold">Name:</span> 
                        <span className="break-words">{doctor.name}</span>
                      </p>
                      <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="font-semibold">Specialization:</span> 
                        <span className="break-words">{doctor.specialization}</span>
                      </p>
                      <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="font-semibold">Medical License Number:</span> 
                        <span className="break-words">{doctor.licenseNumber}</span>
                      </p>
                      <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="font-semibold">Contact Details:</span> 
                        <span className="break-words">{doctor.contactNumber}</span>
                      </p>
                      <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="font-semibold">Email Address:</span> 
                        <span className="break-words">{doctor.email}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Professional Details Box (light ash) */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-10">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-3 sm:mb-4 text-left">
                    Professional Details
                  </h2>
                  <div className="text-gray-700 space-y-2 text-left">
                    <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="font-semibold">Associated Hospital/Clinic:</span> 
                      <span className="break-words">{doctor.hospital}</span>
                    </p>
                    <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="font-semibold">Years of Experience:</span> 
                      <span>{doctor.yearsExperience} years</span>
                    </p>
                  </div>
                </div>

                {/* Dashboard Statistics Section (light ash) */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 w-full">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-3 sm:mb-4 text-left">
                    Dashboard Statistics
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-white p-3 sm:p-4 rounded-lg text-center shadow">
                      <p className="text-lg sm:text-xl font-semibold text-gray-800">{doctor.totalPatients}</p>
                      <p className="text-sm sm:text-base text-gray-600">Total Patients</p>
                    </div>
                    <div className="bg-white p-3 sm:p-4 rounded-lg text-center shadow">
                      <p className="text-lg sm:text-xl font-semibold text-gray-800">{doctor.predictionsMade}</p>
                      <p className="text-sm sm:text-base text-gray-600">Predictions Made</p>
                    </div>
                    <div className="bg-white p-3 sm:p-4 rounded-lg text-center shadow">
                      <p className="text-lg sm:text-xl font-semibold text-gray-800">{doctor.accuracyRate}%</p>
                      <p className="text-sm sm:text-base text-gray-600">Accuracy Rate</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* End of main Doctor Profile container */}
        </div>
      </div>
    </div>
  );
};

export default Doctor;