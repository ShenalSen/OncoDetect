
    
// export default PatientDetails;
import React, { useEffect, useState } from "react";
import img1 from "../assets/doc.jpg";
import img6 from "../assets/file.png";
import axios from "axios";

export const PatientDetails = () => {
  const [patientData, setPatientData] = useState({
    patientID: "",
    patientName: "",
    patientAge: "",
    contactNumber: "",
    appointmentID: "",
  });

  const [selectedFile, setSelectedFile] = useState(null); // Store selected file
  const [message, setMessage] = useState("");  // Store response message

  // Handle input changes for patient details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file); // Store the selected file in state
  };

  // // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(); // Create FormData object

  //   // Append form fields to FormData
  //   formData.append("patient_id", patientData.patientID);
  //   formData.append("name", patientData.patientName);
  //   formData.append("age", patientData.patientAge);
  //   formData.append("contact_number", patientData.contactNumber);
  //   formData.append("appointment_id", patientData.appointmentID);

  //   // Append the selected file
  //   if (selectedFile) {
  //     formData.append("scan_file", selectedFile);
  //   } else {
  //     console.log("No file selected.");
  //   }

  //   // Send data to backend using Axios
  //   try {
  //     const response = await axios.post("http://localhost:5000/patient", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     setMessage("Patient added successfully!");  // Set success message
  //   } catch (error) {
  //     setMessage("Error adding patient.");  // Set error message
  //   }
  // };

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();

  // Append form fields
  formData.append("patient_id", patientData.patientID);
  formData.append("name", patientData.patientName);
  formData.append("age", patientData.patientAge);
  formData.append("contact_number", patientData.contactNumber);
  formData.append("appointment_id", patientData.appointmentID);

  // Append the selected file
  if (selectedFile) {
    formData.append("scan_file", selectedFile);
  } else {
    setMessage("Please select a file before submitting.");
    return;
  }

  // Send data to backend
  try {
    const response = await axios.post("http://localhost:5000/patient", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Check if prediction data is returned
    if (response.data && response.data.prediction) {
      setMessage(`Prediction: ${response.data.prediction}`);
    } else {
      setMessage("Patient added successfully, but no prediction received.");
    }
  } catch (error) {
    setMessage("Error uploading file and getting prediction.");
    console.error(error);
  }
};


  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold text-blue-600">Patient Details</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
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
  <h2 className="text-xl font-semibold text-blue-500">Upload File</h2>
  <div className="mt-4 border-2 border-dashed border-red-500 rounded-lg p-6 flex flex-col items-center justify-center">
    <p className="text-sm text-red-500 text-center">
      Drag and drop a scan image file (DCM, TIF, JPEG, PNG)
    </p>
    <img src={img6} className="w-16 h-16 my-4" alt="File" />
    
    {/* Hidden File Input */}
    <label className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-blue-600">
      Select a file
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>

    {/* Show selected file name */}
    {selectedFile && (
      <p className="mt-2 text-sm text-gray-700">Selected: {selectedFile.name}</p>
    )}
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="mt-6 px-8 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 flex items-center justify-center mx-auto"
  >
    SUBMIT
  </button>
</div>



        

        

        {/* Submit Button */}
        <div className="mt-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Add Patient</button>
        </div>
      </form>

      {/* Display Message */}
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export const Appointment = () => {
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get("http://localhost:5000/appointment"); 
        setAppointmentData(response.data);
      } catch (error) {
        console.log("Error fetching appointment:", error);
      }
    };
    fetchAppointment();
  }, []);

  return (
    <div className="p-6 h-80 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold text-blue-600">Upcoming Appointment</h2>

      {/* Display appointment information */}
      {appointmentData.date && appointmentData.time ? (
        <div>
          <p className="mt-2 text-sm text-gray-500">Date: {appointmentData.date}</p>
          <p className="text-xl font-bold text-purple-600">Time: {appointmentData.time}</p>
          <p className="mt-2 text-sm text-gray-500">Doctor: {appointmentData.doctor}</p>
          <p className="mt-2 text-sm text-gray-500">Status: {appointmentData.status}</p>
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-500">No upcoming appointment found.</p>
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