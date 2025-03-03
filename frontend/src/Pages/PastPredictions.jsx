import React from 'react';
import PredictionTable from './PredictionTable';
//import Header from './Header'; // Ensure the Header component is imported

const PastPredictions = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col p-6 pt-10">
     
      <div className="flex-1 flex justify-center items-center p-6">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Past Predictions</h2>
          <PredictionTable />
        </div>
      </div>
    </div>
  );
}

export default PastPredictions;
