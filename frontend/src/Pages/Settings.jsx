import React from "react";
import { Link } from "react-router-dom";

import accountSetting from "../assets/settings.png";
import notification from "../assets/notification.png";
import privacy from "../assets/privacy-policy.png";
import applicationSettings from "../assets/option.png";
import contact from "../assets/customer-service.png";
import feedback from "../assets/feedback.png";
import about from "../assets/support.png";
import help from "../assets/Faq.png";
import arrow from "../assets/arrow.png";

const Settings = () => {
  const settingsOptions = [
    { name: "Account Settings", icon: accountSetting, route: "/account-settings" },
    { name: "Notification Preferences", icon: notification, route: "/notification-preferences" },
    { name: "Privacy and Permissions", icon: privacy, route: "/privacy-permissions" },
    { name: "Application Settings", icon: applicationSettings, route: "/application-settings" },
    { name: "Contact Support", icon: contact, route: "/contact-support" },
    { name: "Feedback and Suggestions", icon: feedback, route: "/feedback-suggestions" },
    { name: "About us", icon: about, route: "/about-us" },
    { name: "Help and FAQ", icon: help, route: "/help-faq" },
  ];
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 p-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Settings</h1>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm p-6">
            <ul>
              {settingsOptions.map((option, index) => (
                <li key={index} className="border-b last:border-b-0">
                  <Link 
                    to={option.route} 
                    className="flex items-center justify-between py-4 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 rounded-lg"
                    aria-label={`Go to ${option.name}`}
                  >
                    <div className="flex items-center">
                      <img 
                        src={option.icon} 
                        alt={`${option.name} Icon`} 
                        className="w-12 h-12 mr-4 object-contain rounded-full dark:invert dark:opacity-80" 
                      />
                      <span className="text-gray-700 dark:text-gray-200 text-lg font-medium">{option.name}</span>
                    </div>
                    <img src={arrow} alt="Arrow Icon" className="w-6 h-6" aria-hidden="true" />
                  </Link>
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

