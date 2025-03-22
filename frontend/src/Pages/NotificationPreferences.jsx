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
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-2xl p-8">
        {/* Title with better spacing */}
        <h2 className="text-xl font-bold text-gray-800 text-center mb-10">
          Notification Preferences
        </h2>

        <div className="space-y-6">
          {/* Notification Options */}
          {[
            { label: "Email Notifications", key: "email" },
            { label: "SMS Notifications", key: "sms" },
            { label: "Push Notifications", key: "push" },
          ].map(({ label, key }) => (
            <div
              key={key}
              className="flex justify-between items-center bg-gray-100 p-5 rounded-xl hover:bg-gray-200 transition shadow-sm"
            >
              <span className="text-gray-800 font-semibold">{label}</span>
              <button
                onClick={() => togglePreference(key)}
                className={`w-16 h-8 flex items-center rounded-full p-1 transition ${
                  preferences[key] ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                <div
                  className={`w-7 h-7 bg-white rounded-full shadow-md transform transition ${
                    preferences[key] ? "translate-x-8" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-10 w-full  bg-blue-500 text-white font-bold py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-lg"
        >
           Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationPreferences;
