// import React from "react";
// import img1 from "../assets/doc.jpg";
// import img6 from "../assets/file.png"; 
// import { IoEllipsisHorizontal } from "react-icons/io5";

// export const PatientDetails = () => {
//   return (
//     <div className="p-6 bg-white shadow rounded-lg">
//       <h2 className="text-xl font-semibold text-blue-500">Patient Details</h2>
//       <div className="grid grid-cols-1 gap-4 mt-4">
//         <div className="flex items-center">
//           <span className="w-40 text-sm font-medium text-gray-600">Patient id:</span>
//           <input className="flex-1 text-sm text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500" />
//         </div>
//         <div className="flex items-center">
//           <span className="w-40 text-sm font-medium text-gray-600">Patient name:</span>
//           <input className="flex-1 text-sm text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500" />
//         </div>
//         <div className="flex items-center">
//           <span className="w-40 text-sm font-medium text-gray-600">Patient age:</span>
//           <input className="flex-1 text-sm text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500" />
//         </div>
//         <div className="flex items-center">
//           <span className="w-40 text-sm font-medium text-gray-600">Contact number:</span>
//           <input className="flex-1 text-sm text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500" />
//         </div>
//         <div className="flex items-center">
//           <span className="w-40 text-sm font-medium text-gray-600">Appointment id:</span>
//           <input className="flex-1 text-sm text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500" />
//         </div>
//       </div>
//       <div className="w-full p-6 bg-white mt-6">
//         <h2 className="text-xl font-semibold text-blue-500">Upload file</h2>
//         <div className="mt-4 border-2 border-dashed border-red-500 rounded-lg p-6 flex flex-col items-center justify-center">
//           <p className="text-sm text-red-500 text-center">
//             Drag and drop an scan image file (DCM, TIF, JPEG, PNG, )
//           </p>
//           <img src={img6} className="w-16 h-16 my-4" alt="File" />
//           <button
//             type="button"
//             className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600"
//           >
//             Select a file
//           </button>
//         </div>
//         <button
//           type="submit"
//           className="mt-6 px-8 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 flex items-center justify-center mx-auto"
//         >
//           SUBMIT
//         </button>
//       </div>
//     </div>
//   );
// };

// export const Appointment = () => {
//   return (
//     <div className="p-6 bg-white shadow rounded-lg">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-blue-500">Upcoming Appointment</h2>
//         <IoEllipsisHorizontal className="text-gray-400" />
//       </div>
//       <div className="mt-4">
//         <p className="text-sm text-gray-500">Today , Nov 05, 2024</p>
//         <p className="text-xl font-bold text-purple-600 mt-1">4:35 pm</p>
//       </div>
//     </div>
//   );
// };

// export const Notification=()=>{
//   return(
//       <div className="p-6 h-80 bg-white shadow rounded-lg">
//             <h2 className="text-lg font-bold text-blue-600">Notifications </h2>
//             <p className="mt-2 text-sm text-gray-500">Diagnostic Results Ready </p>

//           </div>

//   );

// }
// export const DoctorProf = () => {
//   return ( 
//     <div className="p-6 bg-white shadow rounded-lg flex flex-col items-center">
//       <img
//         src={img1}
//         className="w-24 h-24 rounded-full object-cover"
//         alt="Doctor"
//       />
//       <h2 className="text-lg font-bold mt-4">Dr. Ashan Perera, MD</h2>
//       <p className="text-sm text-gray-500">Consultant Clinical Oncologist</p>
//     </div>
//   );
// };  

// export default PatientDetails;
import React, { useEffect, useState } from "react";
import img1 from "../assets/doc.jpg";
import img6 from "../assets/file.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const PatientDetails = () => {
  const [patientData, setPatientData] = useState({
    patientID: "",
    patientName: "",
    patientAge: "",
    contactNumber: "",
    appointmentID: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  // Handle input changes for patient details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file.name, file.type, file.size);
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      console.log("File dropped:", file.name, file.type, file.size);
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  // Handle form submission
 // Update the handleSubmit function in your PatientDetails component
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validate form
  if (!selectedFile) {
    setMessage("Please select a scan file before submitting.");
    return;
  }
  
  if (!patientData.patientID || !patientData.patientName) {
    setMessage("Patient ID and Name are required fields.");
    return;
  }

  setIsSubmitting(true);
  setMessage("Processing your submission...");
  
  try {
    // First, upload the patient data and image
    console.log("Uploading patient data with file:", selectedFile.name);
    
    const patientFormData = new FormData();
    patientFormData.append("patient_id", patientData.patientID);
    patientFormData.append("name", patientData.patientName);
    patientFormData.append("age", patientData.patientAge);
    patientFormData.append("contact_number", patientData.contactNumber);
    patientFormData.append("appointment_id", patientData.appointmentID);
    patientFormData.append("scan_file", selectedFile);

    const patientResponse = await axios.post(
      "http://localhost:5000/patient", 
      patientFormData, 
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    
    console.log("Patient data uploaded:", patientResponse.data);
    
    // Store the patient ID in sessionStorage to make it available to the DiagnosticResults component
    sessionStorage.setItem('currentPatientId', patientData.patientID);
    console.log("Saved patient ID to sessionStorage:", patientData.patientID);
    
    // Then send the image for prediction using the same file object
    console.log("Sending file for prediction");
    
    const predictionFormData = new FormData();
    predictionFormData.append("file", selectedFile);
    predictionFormData.append("patient_id", patientData.patientID);
    
    const predictionResponse = await axios.post(
      "http://localhost:5000/predict", 
      predictionFormData, 
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    
    console.log("Prediction received:", predictionResponse.data);
    
    // Store the prediction result in sessionStorage
    sessionStorage.setItem('predictionData', JSON.stringify(predictionResponse.data));
    console.log("Saved prediction data to sessionStorage:", predictionResponse.data);
    
    // Handle successful submission
    setPredictionResult(predictionResponse.data);
    
    console.log("Prediction received:", predictionResponse.data);
    
    // Handle successful submission
    setPredictionResult(predictionResponse.data);
    
    const confidence = predictionResponse.data.confidence;
    const confidencePercent = typeof confidence === 'number' 
      ? Math.round(confidence * 100) 
      : confidence;
    
    setMessage(
      `Patient added successfully! Prediction: ${predictionResponse.data.predicted_class} ` +
      `(${confidencePercent}% confidence)`
    );
    
    // Clear form fields but keep the message
    setPatientData({
      patientID: "",
      patientName: "",
      patientAge: "",
      contactNumber: "",
      appointmentID: "",
    });
    setSelectedFile(null);
    setFileName("");
    
  } catch (error) {
    console.error("Error during submission:", error);
    
    // Try to extract error message
    const errorMessage = 
      error.response?.data?.message || 
      error.message || 
      "Unknown error occurred";
    
    setMessage(`Error: ${errorMessage}. Please try again.`);
  } finally {
    setIsSubmitting(false);
  }
};

  // Handle clicking the "View Prediction" button
  const handleViewPrediction = () => {
    // Get the patient ID from the prediction result
    const patientId = predictionResult?.patient_id || patientData.patientID;
    
    // Make sure the patient ID is available in sessionStorage for the diagnostic results page
    if (patientId) {
      sessionStorage.setItem('currentPatientId', patientId);
      console.log("Saved patient ID to sessionStorage before redirect:", patientId);
    }
    
    // Navigate to the diagnostic results page
    window.location.href = "/reports";
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold text-blue-600">Patient Details</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mt-4">
        {/* Patient ID */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-600">Patient ID:</label>
          <input
            type="text"
            name="patientID"
            value={patientData.patientID}
            onChange={handleInputChange}
            placeholder="Enter patient ID"
            className="flex-1 text-sm text-gray-800 border-b-2 border-black focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Patient Name */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-600">Name:</label>
          <input
            type="text"
            name="patientName"
            value={patientData.patientName}
            onChange={handleInputChange}
            placeholder="Enter patient name"
            className="flex-1 text-sm text-gray-800 border-b-2 border-black focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Patient Age */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-600">Age:</label>
          <input
            type="number"
            name="patientAge"
            value={patientData.patientAge}
            onChange={handleInputChange}
            placeholder="Enter patient age"
            className="flex-1 text-sm text-gray-800 border-b-2 border-black focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Contact Number */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-600">Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={patientData.contactNumber}
            onChange={handleInputChange}
            placeholder="Enter contact number"
            className="flex-1 text-sm text-gray-800 border-b-2 border-black focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Appointment ID */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-600">Appointment ID:</label>
          <input
            type="text"
            name="appointmentID"
            value={patientData.appointmentID}
            onChange={handleInputChange}
            placeholder="Enter appointment ID"
            className="flex-1 text-sm text-gray-800 border-b-2 border-black focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* File Upload */}
        <div className="w-full p-6 bg-white mt-6">
          <h2 className="text-xl font-semibold text-blue-500">Upload Mammogram</h2>
          <div 
            className="mt-4 border-2 border-dashed border-red-500 rounded-lg p-6 flex flex-col items-center justify-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <p className="text-sm text-red-500 text-center">
              Drag and drop a scan image file (DCM, TIF, JPEG, PNG)
            </p>
            <img src={img6} className="w-16 h-16 my-4" alt="File" />

            {/* Hidden File Input */}
            <label className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-blue-600">
              Select a file
              <input
                type="file"
                accept=".dcm,.tif,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Show selected file name */}
            {fileName && (
              <p className="mt-2 text-sm text-gray-700">Selected: {fileName}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-6 px-8 py-2 ${
              isSubmitting ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
            } text-white font-medium rounded-md transition flex items-center justify-center mx-auto`}
          >
            {isSubmitting ? "Processing..." : "SUBMIT"}
          </button>
        </div>
      </form>

      {/* Display Message */}
      {message && (
        <div className={`mt-4 p-3 rounded ${predictionResult ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
          <p className={predictionResult ? "text-green-600" : "text-red-600"}>
            {message}
          </p>
          
          {predictionResult && (
            <div className="mt-3">
              <button
                onClick={handleViewPrediction}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                View Detailed Results
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/appointments");
        console.log("Appointments data:", response.data); 

        if (Array.isArray(response.data)) {
          setAppointments(response.data);
        } else {

          setAppointments([response.data]);
        }

        setError(null);
      } catch (error) {
        console.log("Error fetching appointments:", error);
        setError("Could not load appointment data");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Function to extract the time
  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-6 h-80 bg-white shadow rounded-lg overflow-auto">
      <h2 className="text-lg font-bold text-blue-600">Upcoming Appointments</h2>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      ) : error ? (
        <p className="mt-4 text-sm text-red-500">{error}</p>
      ) : appointments && appointments.length > 0 ? (
        <div className="mt-4">
          {appointments.map((appointment, index) => (
            <div key={index} className="mb-4 pb-3 border-b border-gray-200">
              <p className="mt-2 text-sm text-gray-500">
                Date: {formatDate(appointment.appointment_date)}
              </p>
              <p className="text-xl font-bold text-purple-600">
                Time: {formatTime(appointment.appointment_date)}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Doctor ID: {appointment.doctor_id}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Description: {appointment.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-500">No upcoming appointments found.</p>
      )}
    </div>
  );
};

export const Notification = () => {
  const [notifications, setNotifications] = useState([]); // Store notifications
  const [message, setMessage] = useState(""); // Store new notification message
  const [userId, setUserId] = useState(""); // Store user id for notification

  // Fetch data from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.log("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  // Handle form submission for new notification
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/notifications", {
        user_id: userId,
        message: message,
      });
      console.log(response.data);
    } catch (error) {
      console.log("Error creating notification:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold text-blue-600">Notifications</h2>

      {/* Display notifications */}
      <ul className="mt-4">
        {notifications.map((notification, index) => (
          <li key={index} className="text-sm text-gray-600">
            <strong>{notification.timestamp}:</strong> {notification.message}
          </li>
        ))}
      </ul>


    </div>
  );
};

export const DoctorProf = () => {
  return (
    <div className="p-6 h-50 bg-white shadow rounded-lg">
      <div className="mt-4">
        <img src={img1} className="w-40 h-40 rounded-none mx-auto" alt="Doctor Profile" />
      </div>
      <h2 className="text-lg font-bold text-blue-600">Dr. Ashan Perera, MD</h2>
      <p className="text-sm text-gray-500">Consultant Clinical Oncologist</p>
    </div>
  );
};

export default PatientDetails;