
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Login";
import PastPredictions from "./Pages/PredictionTable";
import { PatientDetails, Appointment, Notification, DoctorProf } from "./Pages/Dashboard";
import PatientsData from "./Pages/PatientsData";
import SettingsPage from "./Pages/Settings";
import Doctor from "./Pages/Doctor";
import Nav from "./components/Nav";
import Header01 from "./components/headerMain";
import DiagnosticResults from "./Pages/DiagnosticResults";
import AccountSettings from "./Pages/AccountSettings";
import NotificationPreferences from "./Pages/NotificationPreferences";
import PrivacyPermissions from "./Pages/PrivacyPermissions";
import ApplicationSettings from "./Pages/ApplicationSettings";
import ContactSupport from "./Pages/ContactSupport";
import FeedbackForm from "./Pages/FeedbackForm";
import AboutUs from "./Pages/AboutUs";
import FAQPage from "./Pages/FAQPage";
import React, { useState, useEffect } from "react";
import Logout from "./Pages/Login";


function DashBoard() {
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-6 p-4 pt-12 w-full">
        <div className="flex-1">
          <PatientDetails />
          <PatientsData />
        </div>
        <div className="w-full lg:w-1/3 space-y-3">
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

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

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

            {/* Main Content (Pushed down to avoid overlap) */}
            <div className="p-6 pt-10">
              <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/past-predictions" element={<PastPredictions />} />
                <Route path="/doctor" element={<Doctor />} />
                <Route path="/reports" element={<DiagnosticResults />} />
                <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />



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
                <Route path="/application-settings" element={<ApplicationSettings />} /> {/* Add route */}
                <Route path="/contact-support" element={<ContactSupport />} /> {/* Add route */}
                <Route path="/feedback" element={<FeedbackForm />} /> {/* Add route */}
                <Route path="/about-us" element={<AboutUs />} /> {/* Add route for About Us */}
                <Route path="/help-faq" element={<FAQPage />} /> {/* Add route for FAQPage */}
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