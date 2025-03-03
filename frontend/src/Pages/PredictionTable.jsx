import React from 'react';

const data = [
  { name: "Ashini Ishara", dateIn: "Nov 19, 2024", finalResult: "Confirmed", predictionStatus: "Critical" },
  { name: "Shivalingam Kamalanathan", dateIn: "Dec 18, 2024", finalResult: "Incoming", predictionStatus: "Completed" },
  { name: "Ashini Ishara", dateIn: "Dec 01, 2024", finalResult: "Confirmed", predictionStatus: "Critical" },
  { name: "Shehani Perera", dateIn: "Dec 03, 2024", finalResult: "Confirmed", predictionStatus: "Critical" },
  { name: "Rukshana Alwis", dateIn: "Dec 05, 2024", finalResult: "Confirmed", predictionStatus: "Completed" },
  { name: "Deesha Zoyza", dateIn: "Dec 10, 2024", finalResult: "Incoming", predictionStatus: "Completed" },
  { name: "Fathima Nazruk", dateIn: "Dec 15, 2024", finalResult: "Confirmed", predictionStatus: "Failed" },
  { name: "Kavinthi Selwakumar", dateIn: "Dec 20, 2024", finalResult: "Cancelled", predictionStatus: "Failed" },
  { name: "Farhana Ahmed", dateIn: "Dec 25, 2024", finalResult: "Confirmed", predictionStatus: "Critical" },
  { name: "Emily Fernando", dateIn: "Dec 30, 2024", finalResult: "Cancelled", predictionStatus: "Failed" },
  { name: "Tashia Alexander", dateIn: "Jan 04, 2025", finalResult: "Incoming", predictionStatus: "Completed" },
  { name: "Sanduni Nihara", dateIn: "Jan 06, 2025", finalResult: "Incoming", predictionStatus: "Completed" }
];

const PredictionTable = () => {
  return (
    <div className="w-full">
      
      
      <div className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div>
          <input
            type="text"
            placeholder="Search Past Predictions"
            className="border border-gray-300 rounded-md px-3 py-1"
          />
        </div>
      </div>

      {/* MAIN CONTENT: Past Predictions header + table */}
      <div className="p-6">
        {/* Header row with "Past Predictions" title and date */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Past Predictions</h2>
          <span className="text-gray-500">Today, Nov 05, 2024</span>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-3">Patient Name</th>
                  <th scope="col" className="px-4 py-3">Date In</th>
                  <th scope="col" className="px-4 py-3">Final Result</th>
                  <th scope="col" className="px-4 py-3">Prediction Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.dateIn}</td>
                    <td className="px-4 py-2">{item.finalResult}</td>
                    <td className="px-4 py-2">{item.predictionStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionTable;