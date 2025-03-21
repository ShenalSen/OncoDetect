import React, { useState } from "react";

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [userQuestion, setUserQuestion] = useState("");

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (userQuestion.trim()) {
      alert(`Your question has been submitted: "${userQuestion}"`);
      setUserQuestion("");
    }
  };

  const faqs = [
    {
      question: "What is OncoDetect?",
      answer:
        "OncoDetect is an AI-powered cancer detection platform designed to help doctors and healthcare providers detect cancer at the earliest stages, enabling faster and more accurate treatments.",
    },
    {
      question: "How accurate is OncoDetect's technology?",
      answer:
        "Our technology has undergone extensive testing and validation. It provides highly accurate results by leveraging artificial intelligence and machine learning models trained on vast datasets.",
    },
    {
      question: "Who can use OncoDetect?",
      answer:
        "OncoDetect is designed for healthcare providers, hospitals, and clinics to assist doctors in diagnosing cancer early. Patients can indirectly benefit through their healthcare providers.",
    },
    {
      question: "Is OncoDetect available worldwide?",
      answer:
        "Yes! OncoDetect is available globally and is accessible online through our platform, ensuring that healthcare providers worldwide can access our tools and resources.",
    },
    {
      question: "How can I get started with OncoDetect?",
      answer:
        "To get started, simply visit our website, sign up as a healthcare provider, and start using our cancer detection tools. Our support team is available to assist with any inquiries.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl p-8 rounded-xl transform transition-all duration-1000 ease-in-out hover:scale-105">
        <h2 className="text-4xl font-bold text-center text-indigo-800 mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 py-4"
              onClick={() => toggleAccordion(index)}
            >
              <h3 className="text-xl font-semibold text-black cursor-pointer hover:text-indigo-600 transition-colors">
                {faq.question}
              </h3>
              <div
                className={`${
                  activeIndex === index ? "max-h-screen" : "max-h-0"
                } overflow-hidden transition-all duration-300 ease-in-out`}
              >
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-indigo-800 mb-4">
            Have another question?
          </h3>
          <form
            onSubmit={handleQuestionSubmit}
            className="flex flex-col space-y-4"
          >
            <input
              type="text"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="self-end bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-all"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
