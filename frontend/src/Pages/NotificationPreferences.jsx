import React, { useState } from "react";

const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const togglePreference = (type) => {
    setPreferences((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSave = () => {
    alert("✅ Your notification preferences have been saved successfully!");
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-12">
      {/* Title with better spacing */}
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">🔔 Notification Preferences</h2>

      <div className="space-y-6">
        {/* Notification Options */}
        {[
          { label: "Email Notifications", key: "email" },
          { label: "SMS Notifications", key: "sms" },
          { label: "Push Notifications", key: "push" },
        ].map(({ label, key }) => (
          <div
            key={key}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition"
          >
            <span className="text-gray-700 font-medium">{label}</span>
            <button
              onClick={() => togglePreference(key)}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
                preferences[key] ? "bg-green-500" : "bg-gray-400"
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${
                  preferences[key] ? "translate-x-7" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-8 w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        💾 Save Preferences
      </button>
    </div>
  );
};

export default NotificationPreferences;
