import React from "react";
import accountSetting from "../assets/settings.png";
import notification from "../assets/notification.png"; 
import privacy from "../assets/privacy-policy.png";
import applicationSettings from "../assets/option.png"; 
import appearance from "../assets/appearance.png";
import contact from "../assets/customer-service.png";
import feedback from "../assets/feedback.png";
import about from "../assets/support.png";
import help from "../assets/Faq.png"; 
import arrow from "../assets/arrow.png"; 



const Settings = () => {
  const settingsOptions = [
    { name: "Account Settings", icon: accountSetting },
    { name: "Notification Preferences", icon: notification },
    { name: "Privacy and Permissions", icon: privacy },
    { name: "Application Settings and Controls", icon: applicationSettings },
    { name: "Appearance and Accessibility", icon: appearance },
    { name: "Contact Support", icon: contact },
    { name: "Feedback and Suggestions", icon: feedback },
    { name: "About us", icon: about },
    { name: "Help and FAQ", icon: help },
  ];

  return (
    
    <div className="flex flex-col lg:flex-row gap-6 p-4 ">
      {/* Main settings content */}  
      <div className="flex-1 p-8">
        <div className="bg-white  rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

          <div className=" bg-gray-200 rounded-lg shadow-lg p-6">
            <ul>
              {settingsOptions.map((option, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between py-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center">
                    {/* Icon placeholder */}
                    <div className="w-10 h-10 mr-4">
                      <img
                        src={option.icon}
                        alt={`${option.name} Icon`}
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                    <span className="text-gray-700">{option.name}</span>
                  </div>
                  {/* <div className="text-gray-400">&gt;</div> */}
                  <img src={arrow} className="w-5 h-5 object-contain rounded-full "></img>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
