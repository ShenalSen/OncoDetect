import React, { useState } from "react";

const ApplicationSettings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "english",
  });

  const toggleSetting = (setting) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleLanguageChange = (e) => {
    setSettings((prev) => ({ ...prev, language: e.target.value }));
  };

  const handleSave = () => {
    alert("✅ Your settings have been saved successfully!");
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-xl rounded-2xl p-6 mt-12 transition-all duration-300">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">⚙️ Application Settings</h2>
      
      <div className="space-y-4">
        {/* Dark Mode Toggle */}
        <div className="flex justify-between items-center bg-gray-100 p-5 rounded-xl hover:bg-gray-200 transition cursor-pointer">
          <span className="text-gray-700 font-medium text-lg">Enable Dark Mode</span>
          <button
            onClick={() => toggleSetting("darkMode")}
            className={`w-16 h-8 flex items-center rounded-full p-1 transition-all duration-300 ${settings.darkMode ? "bg-green-500" : "bg-gray-400"}`}
          >
            <div
              className={`w-7 h-7 bg-white rounded-full shadow-md transform transition-all duration-300 ${settings.darkMode ? "translate-x-8" : "translate-x-0"}`}
            ></div>
          </button>
        </div>

        {/* Language Selector */}
        <div className="flex justify-between items-center bg-gray-100 p-5 rounded-xl hover:bg-gray-200 transition">
          <span className="text-gray-700 font-medium text-lg">Language</span>
          <select
            value={settings.language}
            onChange={handleLanguageChange}
            className="bg-white border border-gray-400 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-8 w-full bg-blue-600 text-white font-semibold text-lg p-4 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg"
      >
        💾 Save Settings
      </button>
    </div>
  );
};

export default ApplicationSettings;