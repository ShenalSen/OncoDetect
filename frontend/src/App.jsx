import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Login";
import PastPredictions from "./Pages/PredictionTable";
import { PatientDetails, Appointment, Notification, DoctorProf } from "./Pages/Dashboard";
import PatientsData from "./Pages/PatientsData";
import SettingsPage from "./Pages/Settings";
import DiagnosticResults from "./Pages/DiagosticResults";
import Doctor from "./Pages/Doctor";
import Nav from "./components/Nav";
import Header01 from "./components/headerMain";
import AccountSettings from "./Pages/AccountSettings";  
import NotificationPreferences from "./Pages/NotificationPreferences"; 
import PrivacyPermissions from "./Pages/PrivacyPermissions";  // Ensure correct import

function DashBoard() {
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-6 p-4 pt-20 w-full">
        <div className="flex-1">
          <PatientDetails />
          <PatientsData />
        </div>
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

            {/* Main Content */}
            <div className="p-6 pt-10">
              <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/past-predictions" element={<PastPredictions />} />
                <Route path="/doctor" element={<Doctor />} />
                <Route path="/reports" element={<DiagnosticResults />} />

                {/* Settings Page with Nested Routes */}
                <Route path="/settings" element={<SettingsPage />}>
                  <Route path="account" element={<AccountSettings />} />
                  <Route path="notifications" element={<NotificationPreferences />} />
                  <Route path="privacy" element={<PrivacyPermissions />} />
                </Route>

                {/* Direct Routes (if needed separately) */}
                <Route path="/account-settings" element={<AccountSettings />} />
                <Route path="/notification-preferences" element={<NotificationPreferences />} />
                <Route path="/privacy-permissions" element={<PrivacyPermissions />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <LoginPage setIsAuthenticated={setIsAuthenticated} />
      )}
    </Router>
  );
}

export default App;
