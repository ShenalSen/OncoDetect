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
const PastPredictions = () => {
  return (
      <div className="bg-white shadow-lg rounded-lg p-4 max-w-4xl mx-auto mt-5">
          <div className="overflow-x-auto">
              <table className="table-auto w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                      <tr>
                          <th scope="col" className="px-4 py-2">Date In</th>
                          <th scope="col" className="px-4 py-2">Final Result</th>
                          <th scope="col" className="px-4 py-2">Prediction Status</th>
                      </tr>
                  </thead>
                  <tbody>
                      {data.map((item, index) => (
                          <tr key={index} className="bg-white border-b">
                              <td className="px-4 py-2">{item.dateIn}</td>
                              <td className="px-4 py-2">{item.finalResult}</td>
                              <td className="px-4 py-2">{item.status}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
  );
};

export default PastPredictions;