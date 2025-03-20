<<<<<<< HEAD
import LoginPage from "./Pages/Login";
=======
<<<<<<< HEAD
import LoginPage from "./Pages/Login";
=======
import React from "react";
>>>>>>> aa1d765ae0497763b81524233f8a6792fea4e45c
>>>>>>> 8a6c2a8ea2094c0e09a3babe125778a40bc49683
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PastPredictions from "./Pages/PredictionTable";
import { PatientDetails, Appointment, Notification, DoctorProf } from "./Pages/Dashboard";
import PatientsData from "./Pages/PatientsData";
import SettingsPage from "./Pages/Settings";
import DiagnosticResults from "./Pages/DiagosticResults";
import Doctor from "./Pages/Doctor";
import Nav from "./components/Nav";
import Header01 from "./components/headerMain";
import React, { useState } from "react";

function DashBoard() {
  return (
    <div className="w-full">
      {/* Main Content Below Header */}
      <div className="flex flex-col lg:flex-row gap-6 p-4 pt-20 w-full">
        {/* Left Section */}
        <div className="flex-1">
          <PatientDetails />
          <PatientsData />
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 space-y-6">
          <DoctorProf />
          <Appointment />
          <Notification />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {isAuthenticated ? (
        <div className="flex">
          {/* Sidebar */}
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg">
            <Nav />
          </div>

          {/* Main Content Wrapper */}
          <div className="flex-1 ml-64 bg-gray-100 min-h-screen">
            {/* Fixed Header */}
            <Header01 />

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 8a6c2a8ea2094c0e09a3babe125778a40bc49683
            {/* Main Content (Pushed down to avoid overlap) */}
            <div className="p-6 pt-10">
              <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/past-predictions" element={<PastPredictions />} />
                <Route path="/doctor" element={<Doctor />} />
                <Route path="/reports" element={<DiagnosticResults />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </div>
<<<<<<< HEAD
=======
=======
          {/* Main Content (Pushed down to avoid overlap) */}
          <div className="p-6 pt-10">
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/past-predictions" element={<PastPredictions />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/reports" element={<DiagnosticResults />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
>>>>>>> aa1d765ae0497763b81524233f8a6792fea4e45c
>>>>>>> 8a6c2a8ea2094c0e09a3babe125778a40bc49683
          </div>
        </div>
      ) : (
        <LoginPage setIsAuthenticated={setIsAuthenticated} />
        
      )}
    </Router>
  );
}

export default App;


