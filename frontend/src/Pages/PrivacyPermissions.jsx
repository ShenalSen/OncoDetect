import React, { useState } from "react";

const PrivacyPermissions = () => {
  const [settings, setSettings] = useState({
    profileVisibility: true,
    locationSharing: false,
    thirdPartyAccess: false,
    dataExport: false,
    sessionManagement: true,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDeleteRequest = () => {
    alert("⚠️ Account deletion request submitted. Our team will review it within 48 hours.");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">🔒 Privacy & Permissions</h2>
        
        <div className="space-y-6">
          {[
            { label: "Profile Visibility", key: "profileVisibility" },
            { label: "Location Sharing", key: "locationSharing" },
            { label: "Allow Third-Party App Access", key: "thirdPartyAccess" },
            { label: "Enable Data Export", key: "dataExport" },
            { label: "Session Management Alerts", key: "sessionManagement" },
          ].map(({ label, key }) => (
            <div key={key} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition">
              <span className="text-gray-700 font-medium">{label}</span>
              <button
                onClick={() => toggleSetting(key)}
                className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
                  settings[key] ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${
                    settings[key] ? "translate-x-7" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleDeleteRequest}
          className="mt-8 w-full bg-red-600 text-white font-semibold p-3 rounded-lg hover:bg-red-700 transition duration-200"
        >
          ❌ Request Account Deletion
        </button>
      </div>
    </div>
  );
};

export default PrivacyPermissions;