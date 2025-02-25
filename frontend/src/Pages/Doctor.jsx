import React from 'react';
import doctorImage from '../assets/doctor.jpeg';

const Doctor = () => {
  return (
    <div className="bg-gray-100 min-h-screen pl-80 pr-8 py-8 w-full">
      {/* Outer Doctor Container with an ash-gray border */}
      <div className="bg-white border border-gray-300 shadow-md rounded-lg p-8">
        {/* Doctor Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-left">Doctor</h1>

        {/* Personal Information Box */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-left">Personal Information</h2>
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

        {/* Professional Details Box */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 w-full">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-left">Professional Details</h2>
          <div className="text-gray-700 space-y-2 text-left">
            <p>
              <span className="font-semibold">Associated Hospital/Clinic:</span> Nawaloka Hospitals PLC
            </p>
            <p>
              <span className="font-semibold">Years of Experience:</span> 15 years
            </p>
          </div>
        </div>
         {/* Dashboard Statistics Section - START */}
         <div className="bg-white border border-gray-200 rounded-lg p-6 w-full">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-left">Dashboard Statistics</h2>
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
        {/* Dashboard Statistics Section - END */}
      </div>
    </div>
  );
};

export default Doctor;