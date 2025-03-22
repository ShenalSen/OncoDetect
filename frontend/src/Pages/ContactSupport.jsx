import React, { useState } from "react";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

const ContactSupport = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("⚠️ Please fill in all the fields.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-r from-white to-gray-100 shadow-2xl rounded-3xl p-8 mt-16 transition-all duration-300">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8 tracking-wide">
        📩 Contact Support
      </h2>

      {submitted && (
        <div className="bg-green-100 text-green-700 p-4 rounded-xl text-center mb-6 shadow-md">
          ✅ Your message has been sent successfully!
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all duration-200"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all duration-200"
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all duration-200"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-base p-3 rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg transform hover:scale-105"
        >
          🚀 Send Message
        </button>
      </form>

      {/* Social Media Contacts */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Connect with us on Social Media
        </h3>
        <div className="flex justify-center space-x-8">
          <a
            href="https://web.facebook.com/profile.php?id=61573422031010"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-all duration-200 transform hover:scale-110"
          >
            <FaFacebook className="inline-block text-3xl" />
          </a>
          <a
            href="https://www.instagram.com/_oncodetect_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-800 transition-all duration-200 transform hover:scale-110"
          >
            <FaInstagram className="inline-block text-3xl" />
          </a>
          <a
            href="https://www.linkedin.com/company/oncodetect/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900 transition-all duration-200 transform hover:scale-110"
          >
            <FaLinkedin className="inline-block text-3xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
