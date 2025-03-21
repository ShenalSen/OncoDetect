

// import React from "react";

// const AboutUs = () => {
//   return (
//     <div className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded-lg mt-6">
//       <h2 className="text-3xl font-bold text-center text-blue-600">About Us</h2>
//       <p className="mt-4 text-center text-gray-700">
//         Welcome to <span className="font-semibold text-blue-600">OncoDetect</span>! We are a cutting-edge medical technology company focused on revolutionizing cancer detection through AI-powered tools. Our mission is to provide accurate, timely, and accessible solutions for early cancer diagnosis, helping healthcare providers make informed decisions and saving lives.
//       </p>

//       <div className="mt-8 text-gray-700">
//         <h3 className="text-xl font-semibold text-blue-600">Our Vision</h3>
//         <p className="mt-2">
//           At OncoDetect, our vision is to become a global leader in the early detection of cancer, utilizing innovative technologies to empower patients and doctors with the information they need for better outcomes. 
//         </p>

//         <h3 className="mt-6 text-xl font-semibold text-blue-600">Our Mission</h3>
//         <p className="mt-2">
//           We are committed to developing advanced diagnostic tools that harness artificial intelligence and machine learning to detect cancer at the earliest stages, providing a higher chance of successful treatment. Our goal is to make these tools available globally, ensuring better health for all.
//         </p>
        
//         <h3 className="mt-6 text-xl font-semibold text-blue-600">Why Choose OncoDetect?</h3>
//         <ul className="list-disc list-inside mt-2">
//           <li>💡 Innovative AI-powered cancer detection tools</li>
//           <li>⏱️ Fast and accurate results</li>
//           <li>🌍 Accessible solutions for healthcare providers globally</li>
//           <li>❤️ Passionate about improving lives through technology</li>
//         </ul>
//       </div>

//       <div className="mt-8 text-center">
//         <p className="text-gray-700">
//           For more information, feel free to <a href="https://www.oncodetect.lk/" className="font-semibold text-blue-600" target="_blank" rel="noopener noreferrer">visit our website</a>.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;




import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700 flex items-center justify-center py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl p-8 rounded-xl transform transition-all duration-1000 ease-in-out hover:scale-105">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-6 animate__animated animate__fadeIn animate__delay-1s">
          About Us
        </h2>
        <p className="text-center text-gray-700 mb-8 animate__animated animate__fadeIn animate__delay-2s">
          Welcome to <span className="font-semibold text-blue-600">OncoDetect</span>! We are a cutting-edge medical technology company focused on revolutionizing cancer detection through AI-powered tools. Our mission is to provide accurate, timely, and accessible solutions for early cancer diagnosis, helping healthcare providers make informed decisions and saving lives.
        </p>

        <div className="text-gray-700">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4 animate__animated animate__fadeIn animate__delay-3s">
            Our Vision
          </h3>
          <p className="mb-4 animate__animated animate__fadeIn animate__delay-4s">
            At OncoDetect, our vision is to become a global leader in the early detection of cancer, utilizing innovative technologies to empower patients and doctors with the information they need for better outcomes.
          </p>

          <h3 className="text-2xl font-semibold text-blue-600 mb-4 animate__animated animate__fadeIn animate__delay-5s">
            Our Mission
          </h3>
          <p className="mb-4 animate__animated animate__fadeIn animate__delay-6s">
            We are committed to developing advanced diagnostic tools that harness artificial intelligence and machine learning to detect cancer at the earliest stages, providing a higher chance of successful treatment. Our goal is to make these tools available globally, ensuring better health for all.
          </p>

          <h3 className="text-2xl font-semibold text-blue-600 mb-4 animate__animated animate__fadeIn animate__delay-7s">
            Why Choose OncoDetect?
          </h3>
          <ul className="list-disc list-inside space-y-2 animate__animated animate__fadeIn animate__delay-8s">
            <li>💡 Innovative AI-powered cancer detection tools</li>
            <li>⏱️ Fast and accurate results</li>
            <li>🌍 Accessible solutions for healthcare providers globally</li>
            <li>❤️ Passionate about improving lives through technology</li>
          </ul>
        </div>

        <div className="mt-8 text-center animate__animated animate__fadeIn animate__delay-9s">
          <p className="text-gray-700">
            For more information, feel free to{" "}
            <a
              href="https://www.oncodetect.lk/"
              className="font-semibold text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              visit our website
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
