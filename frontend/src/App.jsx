import React from 'react';
import PastPredictions from './Pages/PastPredictions'; 

import { PatientDetails, Appointment, Notification, DoctorProf } from './Pages/Dashboard';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientsData from './Pages/PatientsData';
import SettingsPage from './Pages/Settings';
import Nav from './components/Nav';
//import DiagnosticResults from './components/DiagnosticResults';
//import Doctor from './components/Doctor';
//import Header from './components/Header'; // Import the Header component
//import Header01 from './components/headerMain';

function DashBoard() {
  return (
     

    <div className="flex flex-col lg:flex-row gap-6 p-4">
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
  );
}

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar & Navbar Wrapper */}
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg">
          <Nav />
          
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-6 bg-gray-100 min-h-screen">
          
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/past-predictions" element={<PastPredictions />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/reports" element={<DiagnosticResults />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
