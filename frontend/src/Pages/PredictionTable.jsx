import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PredictionTable = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/past_predictions');
        setPredictions(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching predictions:", err);
        setError("Failed to load prediction data. Please try again later.");
        // Load fallback data if server fails
        setPredictions([
          { name: "Ashini Ishara", dateIn: "Dec 01, 2024", finalResult: "Confirmed", predictionStatus: "Malignant" },
          { name: "Shehani Perera", dateIn: "Dec 03, 2024", finalResult: "Confirmed", predictionStatus: "Malignant" },
          { name: "Rukshana Alwis", dateIn: "Dec 05, 2024", finalResult: "Confirmed", predictionStatus: "Benign" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  // Helper function to determine row styling based on prediction status
  const getRowStyle = (status) => {
    if (status === 'Malignant') {
      return 'bg-red-50';
    } else if (status === 'Benign') {
      return 'bg-green-50';
    }
    return 'bg-white';
  };

  // Helper function to style prediction status text
  const getStatusStyle = (status) => {
    if (status === 'Malignant') {
      return 'font-medium text-red-600';
    } else if (status === 'Benign') {
      return 'font-medium text-green-600';
    }
    return 'text-gray-500';
  };

  if (loading) {
    return (
      <div className="text-center py-6">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="mt-2 text-gray-600">Loading predictions...</p>
      </div>
    );
  }

  if (error && predictions.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-red-500">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <p className="text-yellow-700">{error}</p>
        </div>
      )}
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Patient Name</th>
            <th scope="col" className="px-6 py-3">Date In</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Prediction</th>
            <th scope="col" className="px-6 py-3">Confidence</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((prediction, index) => (
            <tr key={index} className={`${getRowStyle(prediction.predictionStatus)} border-b`}>
              <td className="px-6 py-4 font-medium text-gray-900">
                {prediction.name}
              </td>
              <td className="px-6 py-4">{prediction.dateIn}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  prediction.finalResult === 'Confirmed' 
                    ? 'bg-blue-100 text-blue-800' 
                    : prediction.finalResult === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                }`}>
                  {prediction.finalResult}
                </span>
              </td>
              <td className={`px-6 py-4 ${getStatusStyle(prediction.predictionStatus)}`}>
                {prediction.predictionStatus}
              </td>
              <td className="px-6 py-4">
                {prediction.confidence ? `${prediction.confidence.toFixed(1)}%` : 'N/A'}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
      {predictions.length === 0 && !loading && (
        <div className="text-center py-10 text-gray-500">
          <p>No prediction data available yet</p>
        </div>
      )}
    </div>
  );
};

export default PredictionTable;