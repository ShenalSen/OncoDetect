import React, { useState, useEffect } from 'react';
import PredictionTable from './PredictionTable';
import axios from 'axios';

const PastPredictions = () => {
  const [stats, setStats] = useState({
    total: 0,
    malignant: 0,
    benign: 0,
    pending: 0,
    confirmed: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch statistics for the dashboard summary
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/diagnostic_results/statistics');
        setStats({
          total: response.data.total_cases || 0,
          malignant: response.data.malignant_cases || 0,
          benign: response.data.benign_cases || 0,
          pending: response.data.pending_cases || 0,
          confirmed: response.data.confirmed_cases || 0
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
        // Set fallback stats
        setStats({
          total: 0,
          malignant: 0,
          benign: 0,
          pending: 0,
          confirmed: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col p-6 pt-10">
      {/* Stats overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Cases</h3>
          <p className="text-2xl font-bold text-gray-800">
            {loading ? "..." : stats.total}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Malignant</h3>
          <p className="text-2xl font-bold text-red-600">
            {loading ? "..." : stats.malignant}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Benign</h3>
          <p className="text-2xl font-bold text-green-600">
            {loading ? "..." : stats.benign}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Pending Review</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {loading ? "..." : stats.pending}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Confirmed</h3>
          <p className="text-2xl font-bold text-blue-600">
            {loading ? "..." : stats.confirmed}
          </p>
        </div>
      </div>
      
      {/* Main predictions table */}
      <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Past Predictions</h2>
          <div className="flex space-x-2">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
              onClick={() => window.location.reload()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>
          </div>
        </div>
        <PredictionTable />
      </div>
    </div>
  );
}

export default PastPredictions;