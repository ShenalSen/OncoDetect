import React from "react";
import img1 from "../assets/doc.jpg";

import img6 from "../assets/file.png"; 
//import Header from "../components/headerMain";



  
export const PatientDetails = () => {
  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold text-blue-600">Patient Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
        {/* Patient Details Rows */}
        <div className="flex items-center">
          <span className="w-40 text-sm font-medium text-gray-600">Patient ID:</span>
          {/* <span className="flex-1 text-sm text-gray-800 bg-gray-100 p-2 rounded-lg">
           
          </span> */}
          <span className="flex-1 text-sm text-gray-800 border-b-2 border-black focus:outline-none focus:border-blue-500"></span>
        </div>
        <div className="flex items-center">
          <span className="w-40 text-sm font-medium text-gray-600">Patient Name:</span>
          {/* <span className="flex-1 W-64 text-gray-800 bg-gray-100 p-2 rounded-lg">
            
          </span> */}
          <span className="flex-1 text-sm text-gray-800 border-b-2 border-black focus:outline-none focus:border-blue-500"></span>
        </div>
        <div className="flex items-center">
          <span className="w-40 text-sm font-medium text-gray-600">Patient Age:</span>
          {/* <span className="flex-1  W-64 text-gray-800 bg-gray-100 p-2 rounded-lg"> */}
          <span className="flex-1 text-sm text-gray-800 border-b-2 border-black focus:outline-none focus:border-blue-500">
          </span>
        </div>
        <div className="flex items-center">
          <span className="w-40 text-sm font-medium text-gray-600">Contact Number:</span>
          {/* <span className="flex-1 W-64 text-gray-800 bg-gray-100 p-2 rounded-lg">
            
          </span> */}
          <span className="flex-1 text-sm text-gray-800 border-b-2 border-black focus:outline-none focus:border-blue-500"></span>
        </div>
        <div className="flex items-center">
          <span className="w-40 text-sm font-medium text-gray-600">Appointment ID:</span>
          {/* <span className="flex-1 text-sm text-gray-800 bg-gray-100 p-2 rounded-lg" >
           
          </span> */}
          <span className="flex-1 text-sm text-gray-800 border-b-2 border-black focus:outline-none focus:border-blue-500"></span>
        </div>
      </div>
      <div className="w-100 p-6 bg-white  mt-6">
       <h2 className="text-lg font-bold text-blue-600">Upload File</h2>
        <div className="mt-4 border-2 border-dashed border-red-500 rounded-lg p-4 flex flex-col items-center justify-center">
          <p className="text-sm text-red-500 text-center">
            Drag and drop a scan image file (DCM, TIF, JPEG, PNG)
          </p>
          <img src={img6}  className="w-20 h-20 rounded-none mx-auto"></img>
          <button
            type="button"
            className="w-50 mt-4 px-4 py-1 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
          >
            Select a file
          </button>
        </div>
        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-purple-500 text-white font-medium rounded hover:bg-purple-600 flex items-center justify-center mx-auto"
        >
          Submit
        </button>
      </div>
      


    </div>
  );
};


    
  export const Appointment=()=>{
    return(
        <div className="p-6 h-80 bg-white shadow rounded-lg">
              <h2 className="text-lg font-bold text-blue-600">Upcoming Appointment</h2>
              <p className="mt-2 text-sm text-gray-500">Today, Nov 05, 2024</p>
              {/* <p className="text-xl font-bold text-purple-600">4:35 PM</p> */}
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

  };
  export const DoctorProf=()=>{
    return( 
      <div className="p-6 h-50 bg-white shadow rounded-lg">
                   <div className="mt-4">
                      <img
                        src={img1}
                         className="w-40 h-40 rounded-none mx-auto"
                      />
                    </div>
                    <h2 className="text-lg font-bold text-blue-600">Dr. Ashan Perera, MD</h2>
                    <p className="text-sm text-gray-500">Consultant Clinical Oncologist</p>
                    
      </div>
    );
  };  
  
  
export default PatientDetails;
  