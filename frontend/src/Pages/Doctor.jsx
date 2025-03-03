import React from 'react';
import doctorImage from '../assets/doctor.jpeg';

const Doctor = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8 w-full">
      {/* Outer wrapper with left margin for sidebar and a set width */}
      <div className="max-w-4xl ml-64 w-full">
        
        {/* Top Bar (Dashboard + Search) */}
        <div className="bg-white p-4 shadow-md rounded-lg mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
          <input
            type="text"
            placeholder="Search Past Predictions"
            className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Main Doctor Profile Container */}
        <div className="bg-white border border-gray-300 shadow-md rounded-lg p-8">
          {/* Doctor Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-left">
            Doctor Profile
          </h1>

          {/* Personal Information Box (light ash) */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4 text-left">
              Personal Information
            </h2>
            <div className="flex flex-col md:flex-row items-start">
              <img
                src={doctorImage}
                alt="Ashan Perera"
                className="rounded-full h-32 w-32 md:mr-6 mb-4 md:mb-0 object-cover border-2 border-gray-200"
              />
              <div className="text-gray-700 space-y-2 text-left">
                <p>
                  <span className="font-semibold">Name:</span> Ashan Perera
                </p>
                <p>
                  <span className="font-semibold">Specialization:</span> Consultant Clinical Oncologist
                </p>
                <p>
                  <span className="font-semibold">Medical License Number:</span> SLMC 769873458T
                </p>
                <p>
                  <span className="font-semibold">Contact Details:</span> +9476 741 9000
                </p>
                <p>
                  <span className="font-semibold">Email Address:</span> ashanp@nw.dr.lk
                </p>
              </div>
            </div>
          </div>

          {/* Professional Details Box (light ash) */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-10">
            <h2 className="text-2xl font-bold text-gray-700 mb-4 text-left">
              Professional Details
            </h2>
            <div className="text-gray-700 space-y-2 text-left">
              <p>
                <span className="font-semibold">Associated Hospital/Clinic:</span> Nawaloka Hospitals PLC
              </p>
              <p>
                <span className="font-semibold">Years of Experience:</span> 15 years
              </p>
            </div>
          </div>

          {/* Dashboard Statistics Section (light ash) */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 w-full">
            <h2 className="text-2xl font-bold text-gray-700 mb-4 text-left">
              Dashboard Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-xl font-semibold text-gray-800">250</p>
                <p className="text-gray-600">Total Patients</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-xl font-semibold text-gray-800">120</p>
                <p className="text-gray-600">Predictions Made</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-xl font-semibold text-gray-800">98%</p>
                <p className="text-gray-600">Accuracy Rate</p>
              </div>
            </div>
          </div>
        </div>
        {/* End of main Doctor Profile container */}
      </div>
    </div>
  );
};

export default Doctor;
