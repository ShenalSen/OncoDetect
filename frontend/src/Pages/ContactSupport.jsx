import React, { useState } from "react";

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
    <div className="max-w-lg mx-auto bg-white shadow-xl rounded-2xl p-6 mt-12 transition-all duration-300">
      {/* Title */}
      <h2 className="text-xl font-extrabold text-gray-800 text-center mb-8"> Contact Support</h2>

      {submitted && (
        <div className="bg-green-100 text-green-700 p-4 rounded-xl text-center mb-4">
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold text-lg p-4 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg"
        >
           Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactSupport;
