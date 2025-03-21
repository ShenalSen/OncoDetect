// import React from "react";
// import accountSetting from "../assets/settings.png";
// import notification from "../assets/notification.png"; 
// import privacy from "../assets/privacy-policy.png";
// import applicationSettings from "../assets/option.png"; 
// import appearance from "../assets/appearance.png";
// import contact from "../assets/customer-service.png";
// import feedback from "../assets/feedback.png";
// import about from "../assets/support.png";
// import help from "../assets/Faq.png"; 
// import arrow from "../assets/arrow.png"; 



// const Settings = () => {
//   const settingsOptions = [
//     { name: "Account Settings", icon: accountSetting },
//     { name: "Notification Preferences", icon: notification },
//     { name: "Privacy and Permissions", icon: privacy },
//     { name: "Application Settings and Controls", icon: applicationSettings },
//     { name: "Appearance and Accessibility", icon: appearance },
//     { name: "Contact Support", icon: contact },
//     { name: "Feedback and Suggestions", icon: feedback },
//     { name: "About us", icon: about },
//     { name: "Help and FAQ", icon: help },
//   ];

//   return (
    
//     <div className="flex flex-col lg:flex-row gap-6 p-4 ">
//       {/* Main settings content */}  
//       <div className="flex-1 p-8">
//         <div className="bg-white  rounded-lg shadow-lg p-6">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

//           <div className=" bg-gray-200 rounded-lg shadow-lg p-6">
//             <ul>
//               {settingsOptions.map((option, index) => (
//                 <li
//                   key={index}
//                   className="flex items-center justify-between py-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
//                 >
//                   <div className="flex items-center">
//                     {/* Icon placeholder */}
//                     <div className="w-10 h-10 mr-4">
//                       <img
//                         src={option.icon}
//                         alt={`${option.name} Icon`}
//                         className="w-full h-full object-contain rounded-full"
//                       />
//                     </div>
//                     <span className="text-gray-700">{option.name}</span>
//                   </div>
//                   {/* <div className="text-gray-400">&gt;</div> */}
//                   <img src={arrow} className="w-5 h-5 object-contain rounded-full "></img>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;

// import React from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom

// import accountSetting from "../assets/settings.png";
// import notification from "../assets/notification.png"; 
// import privacy from "../assets/privacy-policy.png";
// import applicationSettings from "../assets/option.png"; 
// import appearance from "../assets/appearance.png";
// import contact from "../assets/customer-service.png";
// import feedback from "../assets/feedback.png";
// import about from "../assets/support.png";
// import help from "../assets/Faq.png"; 
// import arrow from "../assets/arrow.png";

// const Settings = () => {
//   const settingsOptions = [
//     { name: "Account Settings", icon: accountSetting, route: "/account-settings" },
//     { name: "Notification Preferences", icon: notification, route: "/notification-preferences" },  // Add a route for this
//     { name: "Privacy and Permissions", icon: privacy, route: "/privacy-permissions" },  // Add a route for this
//     { name: "Application Settings and Controls", icon: applicationSettings, route: "/application-settings" },  // Add a route for this
//     { name: "Appearance and Accessibility", icon: appearance, route: "/appearance-accessibility" },  // Add a route for this
//     { name: "Contact Support", icon: contact, route: "/contact-support" },  // Add a route for this
//     { name: "Feedback and Suggestions", icon: feedback, route: "/feedback-suggestions" },  // Add a route for this
//     { name: "About us", icon: about, route: "/about-us" },  // Add a route for this
//     { name: "Help and FAQ", icon: help, route: "/help-faq" },  // Add a route for this
//   ];

//   return (
//     <div className="flex flex-col lg:flex-row gap-6 p-4">
//       {/* Main settings content */}
//       <div className="flex-1 p-8">
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

//           <div className="bg-gray-200 rounded-lg shadow-lg p-6">
//             <ul>
//               {settingsOptions.map((option, index) => (
//                 <li
//                   key={index}
//                   className="flex items-center justify-between py-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
//                 >
//                   <div className="flex items-center">
//                     {/* Icon placeholder */}
//                     <div className="w-10 h-10 mr-4">
//                       <img
//                         src={option.icon}
//                         alt={`${option.name} Icon`}
//                         className="w-full h-full object-contain rounded-full"
//                         aria-label={`${option.name} Icon`} // Accessibility improvement
//                       />
//                     </div>
//                     <span className="text-gray-700">{option.name}</span>
//                   </div>
//                   {/* Using Link for navigation */}
//                   <Link to={option.route || "#"} className="w-5 h-5 object-contain rounded-full">
//                     <img src={arrow} alt="Arrow Icon" />
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;


// import React from "react";
// import { Link } from "react-router-dom"; // Import Link for navigation

// import accountSetting from "../assets/settings.png";
// import notification from "../assets/notification.png";
// import privacy from "../assets/privacy-policy.png";
// import applicationSettings from "../assets/option.png";
// import appearance from "../assets/appearance.png";
// import contact from "../assets/customer-service.png";
// import feedback from "../assets/feedback.png";
// import about from "../assets/support.png";
// import help from "../assets/Faq.png";
// import arrow from "../assets/arrow.png";

// const Settings = () => {
//   const settingsOptions = [
//     { name: "Account Settings", icon: accountSetting, route: "/account-settings" },
//     { name: "Notification Preferences", icon: notification, route: "/notification-preferences" },
//     { name: "Privacy and Permissions", icon: privacy, route: "/privacy-permissions" },
//     { name: "Application Settings and Controls", icon: applicationSettings, route: "/application-settings" },
//     { name: "Appearance and Accessibility", icon: appearance, route: "/appearance-accessibility" },
//     { name: "Contact Support", icon: contact, route: "/contact-support" },
//     { name: "Feedback and Suggestions", icon: feedback, route: "/feedback-suggestions" },
//     { name: "About us", icon: about, route: "/about-us" },
//     { name: "Help and FAQ", icon: help, route: "/help-faq" },
//   ];

//   return (
//     <div className="flex flex-col lg:flex-row gap-6 p-4">
//       {/* Main settings content */}
//       <div className="flex-1 p-8">
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

//           <div className="bg-gray-200 rounded-lg shadow-lg p-6">
//             <ul>
//               {settingsOptions.map((option, index) => (
//                 <li key={index} className="border-b last:border-b-0">
//                   {/* Wrap the entire row with Link for full-click navigation */}
//                   <Link 
//                     to={option.route} 
//                     className="flex items-center justify-between py-4 px-4 hover:bg-gray-100 transition-all duration-200 rounded-lg"
//                     aria-label={`Go to ${option.name}`}
//                   >
//                     <div className="flex items-center">
//                       {/* Icon */}
//                       <div className="w-10 h-10 mr-4">
//                         <img 
//                           src={option.icon} 
//                           alt={`${option.name} Icon`} 
//                           className="w-full h-full object-contain rounded-full" 
//                         />
//                       </div>
//                       <span className="text-gray-700 text-lg">{option.name}</span>
//                     </div>
//                     {/* Arrow Icon */}
//                     <img src={arrow} alt="Arrow Icon" className="w-5 h-5" aria-hidden="true" />
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;





import React from "react";
import { Link } from "react-router-dom";

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

const settingsOptions = [
  { name: "Account Settings", icon: accountSetting, route: "/account-settings" },
  { name: "Notification Preferences", icon: notification, route: "/notification-preferences" },
  { name: "Privacy and Permissions", icon: privacy, route: "/privacy-permissions" },
  { name: "Application Settings and Controls", icon: applicationSettings, route: "/application-settings" },
  { name: "Appearance and Accessibility", icon: appearance, route: "/appearance-accessibility" },
  { name: "Contact Support", icon: contact, route: "/contact-support" },
  { name: "Feedback and Suggestions", icon: feedback, route: "/feedback-suggestions" },
  { name: "About us", icon: about, route: "/about-us" },
  { name: "Help and FAQ", icon: help, route: "/help-faq" },
];

const Settings = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 min-h-screen bg-gray-100">
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
          <div className="bg-gray-200 rounded-lg shadow p-6">
            <ul>
              {settingsOptions.map((option, index) => (
                <li key={index} className="border-b last:border-b-0">
                  <Link 
                    to={option.route} 
                    className="flex items-center justify-between py-4 px-4 hover:bg-gray-100 transition-all duration-200 rounded-lg"
                    aria-label={`Go to ${option.name}`}
                  >
                    <div className="flex items-center">
                      <img 
                        src={option.icon} 
                        alt={`${option.name} Icon`} 
                        className="w-10 h-10 mr-4 object-contain rounded-full" 
                      />
                      <span className="text-gray-700 text-lg">{option.name}</span>
                    </div>
                    <img src={arrow} alt="Arrow Icon" className="w-5 h-5" aria-hidden="true" />
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

