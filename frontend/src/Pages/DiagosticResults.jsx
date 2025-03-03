import React from 'react';
import cancerImage from "../assets/cancerImage.png";

function DiagnosticResults() {
    return (
        <div className="ml-5 p-10 pt-10 bg-gray-100 min-h-screen w-60px">
            <div className="text-center text-2xl font-bold text-purple-700 bg-purple-100 p-2 rounded-md mb-6">
                Diagnostic Results
            </div>

            <div className="max-w-10xl bg-white p-6 rounded-lg shadow-lg">

                <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold">Mammogram Image</h2>
                    <img src={cancerImage} alt="Mammogram" className="w-3/4 mx-auto rounded-lg border border-gray-300 my-4" />
                    <p className="text-gray-600">This image shows the detected anomalies.</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-center mb-4">Results Summary</h2>
                    <ul className="text-gray-700 space-y-2">
                        <li><strong>Patient Name:</strong> Jane Doe</li>
                        <li><strong>Diagnosis:</strong> <span className="text-red-500 font-semibold">Malignant</span></li>
                        <li><strong>Confidence Level:</strong> <span className="text-green-500 font-semibold">87%</span></li>
                        <li><strong>Further Action Required:</strong> <span className="text-blue-500 underline cursor-pointer">Schedule a consultation</span></li>
                    </ul>
                </div>

                <div className="text-center bg-white p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-lg font-semibold mb-4">Statistical Analysis</h2>
                    <div className="relative w-36 h-36 mx-auto rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-green-500 flex items-center justify-center">
                        <div className="absolute w-28 h-28 bg-white rounded-full flex items-center justify-center text-xl font-bold text-red-500">
                            87%
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-lg font-semibold mb-4">Patient Information</h2>
                    <p><strong>Age:</strong> 45</p>
                    <p><strong>Sex:</strong> Female</p>
                    <p><strong>Medical History:</strong> <span className="text-blue-500 font-semibold">No significant history</span></p>
                    <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">View Predictions</button>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-lg font-semibold mb-4">Additional Insights</h2>
                    <p><strong className="text-red-500">Note:</strong> Further tests are recommended to ensure early detection.</p>
                    <p>This result is based on a thorough analysis of mammogram data, which showed <span className="text-purple-500">anomalies in specific regions</span> requiring further medical review.</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center">
                    <h2 className="text-lg font-semibold mb-4">Actions</h2>
                    <p>Download the report or confirm the diagnosis for further steps.</p>
                    <div className="mt-4 space-x-4">
                        <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition">Download PDF</button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">Confirm Diagnosis</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiagnosticResults;
