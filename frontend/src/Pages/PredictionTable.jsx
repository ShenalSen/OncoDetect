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
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-semibold">Past Predictions</h1>
                <div>
                    <input type="search" placeholder="Search Past Predictions" className="input input-bordered" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Date In</th>
                            <th>Final Result</th>
                            <th>Prediction Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className={item.status === "Critical" ? "bg-red-200" : ""}>
                                <td>{item.name}</td>
                                <td>{item.dateIn}</td>
                                <td>{item.result}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PastPredictions;
