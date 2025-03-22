import React, { useEffect, useState } from "react";
import axios from "axios";

export const PatientsData = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch patient data from the backend
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/patient_data");
      setPatients(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      setError("Failed to load patient data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Format date string safely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  };

  // Get style class for final result
  const getFinalResultClass = (result) => {
    if (!result) return "text-gray-600";
    
    switch (result.toLowerCase()) {
      case "confirmed":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      case "incoming":
        return "text-blue-600";
      default:
        return "text-yellow-600";
    }
  };

  // Get style class for prediction status
  const getPredictionStatusClass = (status) => {
    if (!status) return "text-gray-600";
    
    switch (status.toLowerCase()) {
      case "malignant":
        return "text-red-600";
      case "benign":
        return "text-green-600";
      case "critical":
        return "text-red-600";
      case "completed":
        return "text-green-600";
      case "failed":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Patient Data</h2>
        <button 
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm flex items-center"
          onClick={fetchPatients}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
          <button 
            className="mt-2 text-blue-500 hover:underline"
            onClick={fetchPatients}
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left text-gray-600 px-4 py-2">Patient Name</th>
                <th className="text-left text-gray-600 px-4 py-2">Date In</th>
                <th className="text-left text-gray-600 px-4 py-2">Final Result</th>
                <th className="text-left text-gray-600 px-4 py-2">Prediction Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? (
                patients.map((patient, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-800">{patient.name || "Unknown"}</td>
                    <td className="px-4 py-2 text-gray-800">{formatDate(patient.date_in)}</td>
                    <td className={`px-4 py-2 font-semibold ${getFinalResultClass(patient.final_result)}`}>
                      {patient.final_result || "Pending"}
                    </td>
                    <td className={`px-4 py-2 font-semibold ${getPredictionStatusClass(patient.prediction_status)}`}>
                      {patient.prediction_status || "Unknown"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                    No patient data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientsData;