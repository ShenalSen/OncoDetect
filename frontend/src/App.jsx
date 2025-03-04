<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PastPredictions from "./Pages/PastPredictions";
import { PatientDetails, Appointment, Notification, DoctorProf } from "./Pages/Dashboard";
import PatientsData from "./Pages/PatientsData";
import SettingsPage from "./Pages/Settings";
import DiagnosticResults from "./Pages/DiagosticResults";
import Doctor from "./Pages/Doctor";
import Nav from "./components/Nav";
import Header01 from "./components/headerMain";

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
  return (
    <Router>
      {/* Sidebar & Header Wrapper */}
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg">
          <Nav />
        </div>

        {/* Main Content Wrapper */}
        <div className="flex-1 ml-64 bg-gray-100 min-h-screen">
          {/* Fixed Header */}
          <Header01 />

          {/* Main Content (Pushed down to avoid overlap) */}
          <div className="p-6 pt-10">
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/past-predictions" element={<PastPredictions />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/reports" element={<DiagnosticResults />} />
              <Route path="/settings" element={<SettingsPage />} />
=======
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import LSideBar from './Components/L-SideBar';
import Doctor from './Pages/Doctor';
import PredictionTable from './Pages/PredictionTable';

function App() {
  return (
    <BrowserRouter>
      {/* Use flex to place sidebar and main content side by side. 
          Also use min-h-screen to fill the viewport vertically. */}
      <div className="flex min-h-screen">
        
        {/* Sidebar with a fixed width (e.g., w-64 = 16rem). 
            Adjust width as you prefer or style within LSideBar. */}
        <div className="w-64 bg-gray-200">
          <LSideBar />
        </div>
        
        {/* Main area: top bar + routed pages below */}
        <div className="flex-1 flex flex-col">
          {/* Top bar (Dashboard + Search) */}
          <div className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div>
              <input
                type="text"
                placeholder="Search Past Predictions"
                className="border border-gray-300 rounded-md px-3 py-1"
              />
            </div>
          </div>

          {/* Main content (pages) goes here */}
          <div className="p-6 flex-1">
            <Routes>
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/past-predictions" element={<PredictionTable />} />
>>>>>>> c5695bf41ca23c36861f54371ddd6bcf3859b066
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
