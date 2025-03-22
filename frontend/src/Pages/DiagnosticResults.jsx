import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cancerImage from "../assets/cancerImage.png"; 

function DiagnosticResults() {
    const [results, setResults] = useState(null);
    const [patientInfo, setPatientInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // FIRST: Check if we have both patient ID and prediction in sessionStorage
                const sessionPatientId = sessionStorage.getItem('currentPatientId');
                const sessionPrediction = sessionStorage.getItem('predictionData');

                console.log("SessionStorage check:", {
                    sessionPatientId,
                    sessionPrediction: sessionPrediction ? "exists" : "not found"
                });

                if (sessionPatientId && sessionPrediction) {
                    try {
                        // Parse the prediction data
                        const predictionData = JSON.parse(sessionPrediction);
                        console.log("Using prediction data from sessionStorage:", predictionData);

                        // Fetch patient info
                        const patientResponse = await axios.get(`http://localhost:5000/patient/${sessionPatientId}`);
                        console.log("Patient data for session ID:", patientResponse.data);
                        setPatientInfo(patientResponse.data);

                        // If the patient has an image, set it
                        if (patientResponse.data && patientResponse.data.scan_file) {
                            setImageUrl(`http://localhost:5000/uploads/${patientResponse.data.scan_file}`);
                            console.log("Image URL set from patient data:", `http://localhost:5000/uploads/${patientResponse.data.scan_file}`);
                        }

                        // Use the prediction data from sessionStorage
                        setResults({
                            prediction_result: predictionData.predicted_class,
                            confidence_level: Math.round(predictionData.confidence * 100),
                            patient_name: patientResponse.data?.name || "Patient",
                            patient_age: patientResponse.data?.age || "N/A",
                            doctor_recommendation: predictionData.predicted_class === "Malignant"
                                ? "Schedule immediate follow-up consultation"
                                : "Continue routine screening",
                            additional_insights: predictionData.predicted_class === "Malignant"
                                ? "The mammogram shows suspicious areas that require further investigation."
                                : "No concerning features detected in the mammogram."
                        });

                        console.log("Set results from sessionStorage:", {
                            prediction_result: predictionData.predicted_class,
                            confidence_level: Math.round(predictionData.confidence * 100)
                        });

                        setLoading(false);
                        return; // Skip all other API calls
                    } catch (error) {
                        console.log("Error using sessionStorage data:", error);
                        // Continue with normal flow if using sessionStorage data fails
                    }
                }

                // If no sessionStorage data, continue with existing flow
                console.log("No sessionStorage data found or failed to use it, continuing with normal flow");

                // Original patient fetching logic
                if (sessionPatientId) {
                    console.log(`Using patient ID from session storage: ${sessionPatientId}`);
                    try {
                        await fetchPatientData(sessionPatientId);
                        return;
                    } catch (error) {
                        console.log(`Error fetching patient ${sessionPatientId} from session storage:`, error);
                        // Continue to other methods if this fails
                    }
                }

                // Check URL parameters
                const urlParams = new URLSearchParams(window.location.search);
                const urlPatientId = urlParams.get('patientId');
                if (urlPatientId) {
                    console.log(`Using patient ID from URL: ${urlPatientId}`);
                    try {
                        await fetchPatientData(urlPatientId);
                        return;
                    } catch (error) {
                        console.log(`Error fetching patient ${urlPatientId} from URL:`, error);
                        // Continue to other methods if this fails
                    }
                }

                // Check localStorage
                const localStoragePatientId = localStorage.getItem('currentPatientId');
                if (localStoragePatientId) {
                    console.log(`Using patient ID from localStorage: ${localStoragePatientId}`);
                    try {
                        await fetchPatientData(localStoragePatientId);
                        return;
                    } catch (error) {
                        console.log(`Error fetching patient ${localStoragePatientId} from localStorage:`, error);
                        // Continue to other methods if this fails
                    }
                }

                // As a last resort, try to get the most recent patient
                try {
                    console.log("Trying to get most recent patient as last resort");
                    const response = await axios.get("http://localhost:5000/patients/recent");
                    if (response.data && response.data.patient_id) {
                        console.log(`Using most recent patient ID: ${response.data.patient_id}`);
                        await fetchPatientData(response.data.patient_id);
                        return;
                    }
                } catch (error) {
                    console.log("Error fetching most recent patient:", error);
                }

                setError("Could not retrieve patient data. No patient ID found.");
                setLoading(false);

            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch diagnostic results.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper function to fetch patient data and related diagnostics
    const fetchPatientData = async (patientId) => {
        try {
            const patientResponse = await axios.get(`http://localhost:5000/patient/${patientId}`);
            console.log("Patient data from API:", patientResponse.data);
            setPatientInfo(patientResponse.data);

            // If the patient has an image, set it
            if (patientResponse.data && patientResponse.data.scan_file) {
                
                setImageUrl(`http://localhost:5000/uploads/${patientResponse.data.scan_file}`);
                console.log("Image URL set to:", `http://localhost:5000/uploads/${patientResponse.data.scan_file}`);
            }

            // Try to get diagnostic results for this patient
            try {
                console.log(`Fetching diagnostic results for patient ${patientId}`);
                const diagnosticResponse = await axios.get(`http://localhost:5000/diagnostic_result/patient/${patientId}`);
                console.log("Diagnostic data:", diagnosticResponse.data);

                if (Array.isArray(diagnosticResponse.data) && diagnosticResponse.data.length > 0) {
                    const diagnosticData = diagnosticResponse.data[0];

                    setResults({
                        prediction_result: diagnosticData.final_result,
                        confidence_level: diagnosticData.abnormal_percentage || 87,
                        patient_name: patientResponse.data?.name || diagnosticData.patient_name || "Jane Doe",
                        patient_age: patientResponse.data?.age || "45",
                        doctor_recommendation: diagnosticData.doctor_recommendation || "Pending doctor review",
                        additional_insights: diagnosticData.additional_insights || "Waiting for detailed analysis"
                    });

                    // If there's an annotated image, use that
                    if (diagnosticData.annotated_image) {
                        setImageUrl(`http://localhost:5000/uploads/${diagnosticData.annotated_image}`);
                        console.log("Using annotated image:", `http://localhost:5000/uploads/${diagnosticData.annotated_image}`);
                    }
                } else {
                    console.log("No diagnostic data in response, trying prediction endpoint");
                    throw new Error("No diagnostic data");
                }
            } catch (diagnosticError) {
                console.log("Error or no diagnostic results, trying prediction endpoint:", diagnosticError);

                // If no diagnostic results, try the prediction endpoint
                try {
                    console.log(`Fetching prediction for patient ${patientId}`);
                    const predictionResponse = await axios.get(`http://localhost:5000/predict/${patientId}`);
                    console.log("Prediction data from API:", predictionResponse.data);

                    setResults({
                        prediction_result: predictionResponse.data.predicted_class,
                        confidence_level: Math.round(predictionResponse.data.confidence * 100),
                        patient_name: patientResponse.data?.name || "Jane Doe",
                        patient_age: patientResponse.data?.age || "45",
                        doctor_recommendation: "Pending doctor review",
                        additional_insights: "This is an initial AI prediction. Please consult with your doctor."
                    });
                } catch (predictionError) {
                    console.log("Error fetching prediction:", predictionError);
                    throw predictionError;
                }
            }

            setLoading(false);
            setError(null);
            return true;
        } catch (error) {
            console.error("Error in fetchPatientData:", error);
            throw error;
        }
    };

    // Function to handle image load errors
    const handleImageError = (e) => {
        console.log("Image failed to load, using fallback");
        e.target.src = cancerImage; // Use fallback image
    };

    // Function to handle downloading PDF report
    
    const handleDownloadPDF = async () => {
        if (!patientInfo || !results) {
            alert("Cannot generate report: Missing patient or diagnostic information");
            return;
        }

        try {
            // Create a form for submitting
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'http://localhost:5000/patient_report';
            form.target = '_blank'; // Open in new tab
            form.style.display = 'none'; // Hide the form

            // Add hidden fields with the data
            const addField = (name, value) => {
                const field = document.createElement('input');
                field.type = 'hidden';
                field.name = name;
                field.value = value || '';
                form.appendChild(field);
            };

            addField('name', patientInfo.name);
            addField('patient_id', patientInfo.patient_id);
            addField('diagnosis', results.prediction_result);
            addField('notes', results.additional_insights);

            // Add the form to the document and submit it
            document.body.appendChild(form);
            form.submit();

            // Remove the form after submission
            setTimeout(() => {
                document.body.removeChild(form);
            }, 1000);

            console.log("PDF report requested");
        } catch (error) {
            console.error("Error requesting PDF:", error);
            alert("Failed to generate PDF report. Please try again later.");
        }
    };
    if (loading) {
        return (
            <div className="ml-5 p-10 pt-10 bg-gray-100 min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="ml-5 p-10 pt-10 bg-gray-100 min-h-screen">
            <div className="text-center text-2xl font-bold text-purple-700 bg-purple-100 p-2 rounded-md mb-6">
                Diagnostic Results
            </div>

            <div className="max-w-4xl bg-white p-6 rounded-lg shadow-lg mx-auto">
                <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold">Mammogram Image</h2>
                    <img
                        src={imageUrl || cancerImage}
                        onError={handleImageError}
                        alt="Mammogram"
                        className="w-3/4 mx-auto rounded-lg border border-gray-300 my-4"
                    />
                    <p className="text-gray-600">This image shows the detected anomalies.</p>
                </div>

                {results && (
                    <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-6">
                        <h2 className="text-lg font-semibold text-center mb-4">Results Summary</h2>
                        <ul className="text-gray-700 space-y-2">
                            <li><strong>Patient Name:</strong> {results.patient_name || "Not available"}</li>
                            <li>
                                <strong>Diagnosis:</strong>
                                <span className={`font-semibold ml-1 ${results.prediction_result === "Malignant" ? "text-red-500" : "text-green-500"}`}>
                                    {results.prediction_result || "Pending"}
                                </span>
                            </li>
                            <li>
                                <strong>Confidence Level:</strong>
                                <span className="text-green-500 font-semibold ml-1">
                                    {results.confidence_level || "N/A"}%
                                </span>
                            </li>
                            <li>
                                <strong>Further Action Required:</strong>
                                <span className="text-blue-500 underline cursor-pointer ml-1">
                                    Schedule a consultation
                                </span>
                            </li>
                        </ul>
                    </div>
                )}

                <div className="text-center bg-white p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-lg font-semibold mb-4">Statistical Analysis</h2>
                    <div className="relative w-36 h-36 mx-auto rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-green-500 flex items-center justify-center">
                        <div className="absolute w-28 h-28 bg-white rounded-full flex items-center justify-center text-xl font-bold text-red-500">
                            {results?.confidence_level || "N/A"}%
                        </div>
                    </div>
                </div>

                {patientInfo && (
                    <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-6">
                        <h2 className="text-lg font-semibold mb-4">Patient Information</h2>
                        <p><strong>Age:</strong> {patientInfo.age || "Not available"}</p>
                        <p><strong>Contact:</strong> {patientInfo.contact_number || "Not available"}</p>
                        <p><strong>Patient ID:</strong> {patientInfo.patient_id || "Not available"}</p>
                        <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">
                            View Full Patient History
                        </button>
                    </div>
                )}

                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-lg font-semibold mb-4">Additional Insights</h2>
                    <p>
                        <strong className="text-red-500">Note:</strong> {results?.additional_insights || "No additional insights available."}
                    </p>
                    <p className="mt-2">
                        This result is based on a thorough analysis of mammogram data, which showed
                        <span className="text-purple-500"> anomalies in specific regions</span> requiring further medical review.
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center">
                    <h2 className="text-lg font-semibold mb-4">Actions</h2>
                    <p>Download the report or confirm the diagnosis for further steps.</p>
                    <div className="mt-4 space-x-4">
                        <button
                            onClick={handleDownloadPDF}
                            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition"
                        >
                            Download PDF
                        </button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                            Confirm Diagnosis
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiagnosticResults;