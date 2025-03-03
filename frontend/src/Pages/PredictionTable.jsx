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
    <div className="p-6 w-full">
      {/* Main heading (outside the box) */}
      <h2 className="text-2xl font-bold mb-4 text-left">Past Predictions</h2>

      {/* Light gray/ash box wrapping everything else */}
      <div className="bg-gray-50 border border-gray-200 shadow-sm rounded-md p-6">
        {/* Patient Data header + date inside the box */}
        <div className="relative mb-4">
          <h3 className="text-md font-semibold text-left">Patient Data</h3>
          <span className="absolute top-0 right-0 text-gray-500 text-sm">
            Nov 05, 2025
          </span>
        </div>

        {/* Table container */}
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full text-sm text-gray-600 text-left">
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
                <tr
                  key={index}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
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
  );
};

export default PredictionTable;
