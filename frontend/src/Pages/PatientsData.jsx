import React, { useEffect, useState } from "react";
import axios from "axios";

export const PatientsData = () => {
  const [patients, setPatients] = useState([]);

  // Fetch patient data from the backend
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/patient_data");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

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
                <td className="px-4 py-2 text-gray-800">
                  {new Date(patient.date_in).toLocaleDateString()}
                </td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    patient.final_result === "Confirmed"
                      ? "text-green-600"
                      : patient.final_result === "Cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {patient.final_result}
                </td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    patient.prediction_status === "Critical"
                      ? "text-red-600"
                      : patient.prediction_status === "Completed"
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {patient.prediction_status}
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