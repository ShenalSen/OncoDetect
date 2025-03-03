import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoEllipsisHorizontal } from "react-icons/io5";

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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Patient Data</h2>
        <div className="flex items-center">
          <p className="text-sm text-blue-500 mr-2">Today, Nov 05, 2024</p>
          <IoEllipsisHorizontal className="text-gray-400" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left text-gray-500 px-4 py-2 text-sm">Patient name</th>
              <th className="text-left text-gray-500 px-4 py-2 text-sm">Date in</th>
              <th className="text-left text-gray-500 px-4 py-2 text-sm">Final Result</th>
              <th className="text-left text-gray-500 px-4 py-2 text-sm">Prediction Status</th>
              <th className="text-left text-gray-500 px-4 py-2 text-sm"></th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-blue-50" : ""}>
                <td className="px-4 py-3 text-gray-800">{patient.name}</td>
                <td className="px-4 py-3 text-gray-800">{patient.dateIn}</td>
                <td className={`px-4 py-3 font-medium ${
                  patient.finalResult === "Confirmed"
                    ? "text-blue-500"
                    : patient.finalResult === "Cancelled"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}>
                  {patient.finalResult}
                </td>
                <td className={`px-4 py-3 font-medium ${
                  patient.predictionStatus === "Critical"
                    ? "text-red-500"
                    : patient.predictionStatus === "Completed"
                    ? "text-green-500"
                    : "text-orange-500"
                }`}>
                  {patient.predictionStatus}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="text-gray-500">
                    <CiEdit size={20} />
                  </button>
                  <button className="text-gray-500">
                    <MdDeleteOutline size={20} />
                  </button>
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

