import React from 'react';

// If this component is being declared in the same file, make sure it's unique and not repeated
const PredictionTable = () => {
  const predictions = [
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

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Patient Name</th>
            <th scope="col" className="px-6 py-3">Date In</th>
            <th scope="col" className="px-6 py-3">Final Result</th>
            <th scope="col" className="px-6 py-3">Prediction Status</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((prediction, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="px-6 py-4">{prediction.name}</td>
              <td className="px-6 py-4">{prediction.dateIn}</td>
              <td className="px-6 py-4">{prediction.finalResult}</td>
              <td className="px-6 py-4">{prediction.predictionStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default PredictionTable;
