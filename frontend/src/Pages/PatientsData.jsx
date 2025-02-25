import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";


export const PatientsData = () => {
    const patients = [
      {
        name: "Ashini Ishara",
        dateIn: "Nov 19, 2024",
        finalResult: "Confirmed",
        predictionStatus: "Critical",
      },
      {
        name: "Shivalingam Kan",
        dateIn: "Dec 18, 2024",
        finalResult: "Incoming",
        predictionStatus: "Completed",
      },
      {
        name: "Guhanadini Pori",
        dateIn: "Dec 18, 2024",
        finalResult: "Confirmed",
        predictionStatus: "Completed",
      },
      {
        name: "Jenita Hoodini",
        dateIn: "Dec 17, 2024",
        finalResult: "Cancelled",
        predictionStatus: "Failed",
      },
    ];
  
    return (
      <div className="p-6 bg-white shadow rounded-lg mt-6">
        <h2 className="text-lg font-bold text-black-600 mb-4">Patient Data</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="border-b">
                <th className="text-left text-gray-600 px-4 py-2">Patient Name</th>
                <th className="text-left text-gray-600 px-4 py-2">Date In</th>
                <th className="text-left text-gray-600 px-4 py-2">Final Result</th>
                <th className="text-left text-gray-600 px-4 py-2">Prediction Status</th>
               
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2 text-gray-800">{patient.name}</td>
                  <td className="px-4 py-2 text-gray-800">{patient.dateIn}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      patient.finalResult === "Confirmed"
                        ? "text-green-600"
                        : patient.finalResult === "Cancelled"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {patient.finalResult}
                  </td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      patient.predictionStatus === "Critical"
                        ? "text-red-600"
                        : patient.predictionStatus === "Completed"
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {patient.predictionStatus}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    
                    <CiEdit size={20} className="w-5 h-5 object-contain rounded-full" />
                    <MdDeleteOutline size={20} className="w-5 h-5 object-contain rounded-full " />
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
export default PatientsData;  