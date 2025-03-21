import React, { useState } from "react";

const FeedbackForm = () => {
  const [form, setForm] = useState({ name: "", email: "", feedback: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!form.name) newErrors.name = "⚠️ Name is required";
    if (!form.email) {
      newErrors.email = "⚠️ Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "⚠️ Invalid email format";
    }
    if (!form.feedback) newErrors.feedback = "⚠️ Feedback is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", feedback: "" });
      setTimeout(() => setSubmitted(false), 3000);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">💡 We Value Your Feedback</h2>
      <p className="text-center text-gray-600 mb-6">
        Please share your thoughts and suggestions to help us improve.
      </p>
      {submitted && (
        <p className="text-green-600 text-center font-semibold">
          ✅ Thank you for your feedback! We appreciate your input.
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
            Feedback
          </label>
          <textarea
            id="feedback"
            name="feedback"
            value={form.feedback}
            onChange={handleChange}
            placeholder="Share your feedback or suggestions"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.feedback && <p className="text-red-500 text-sm mt-1">{errors.feedback}</p>}
        </div>

        <button
          type="submit"
          className={`w-full p-2 rounded text-white ${
            isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "📩 Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
