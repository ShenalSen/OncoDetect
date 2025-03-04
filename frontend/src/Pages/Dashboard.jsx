import React from "react";
import img1 from "../assets/doc.jpg";
import img6 from "../assets/file.png"; 
import { IoEllipsisHorizontal } from "react-icons/io5";

export const PatientDetails = () => {
  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold text-blue-500">Patient Details</h2>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <div className="flex items-center">
          <span className="w-40 text-sm font-medium text-gray-600">Patient id:</span>
          <input className="flex-1 text-sm text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="flex items-center">
          <span className="w-40 text-sm font-medium text-gray-600">Patient name:</span>
          <input className="flex-1 text-sm text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="flex items-center">
          <span className="w-40 text-sm font-medium text-gray-600">Patient age:</span>
          <input className="flex-1 text-sm text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="flex items-center">
          <span className="w-40 text-sm font-medium text-gray-600">Contact number:</span>
          <input className="flex-1 text-sm text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="flex items-center">
          <span className="w-40 text-sm font-medium text-gray-600">Appointment id:</span>
          <input className="flex-1 text-sm text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500" />
        </div>
      </div>
      <div className="w-full p-6 bg-white mt-6">
        <h2 className="text-xl font-semibold text-blue-500">Upload file</h2>
        <div className="mt-4 border-2 border-dashed border-red-500 rounded-lg p-6 flex flex-col items-center justify-center">
          <p className="text-sm text-red-500 text-center">
            Drag and drop an scan image file (DCM, TIF, JPEG, PNG, )
          </p>
          <img src={img6} className="w-16 h-16 my-4" alt="File" />
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600"
          >
            Select a file
          </button>
        </div>
        <button
          type="submit"
          className="mt-6 px-8 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 flex items-center justify-center mx-auto"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};
      
export const Appointment = () => {
  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-blue-500">Upcoming Appointment</h2>
        <IoEllipsisHorizontal className="text-gray-400" />
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">Today , Nov 05, 2024</p>
        <p className="text-xl font-bold text-purple-600 mt-1">4:35 pm</p>
      </div>
    </div>
  );
};

export const Notification=()=>{
  return(
      <div className="p-6 h-80 bg-white shadow rounded-lg">
            <h2 className="text-lg font-bold text-blue-600">Notifications </h2>
            <p className="mt-2 text-sm text-gray-500">Diagnostic Results Ready </p>
            
          </div>

  );

}
export const DoctorProf = () => {
  return ( 
    <div className="p-6 bg-white shadow rounded-lg flex flex-col items-center">
      <img
        src={img1}
        className="w-24 h-24 rounded-full object-cover"
        alt="Doctor"
      />
      <h2 className="text-lg font-bold mt-4">Dr. Ashan Perera, MD</h2>
      <p className="text-sm text-gray-500">Consultant Clinical Oncologist</p>
    </div>
  );
};  
    
export default PatientDetails;