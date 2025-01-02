"use client";

import React, { useState } from "react";

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search for:", searchQuery);
    // Implement search functionality if needed
  };

  return (
    <div className="help-center container mx-auto py-10 px-5">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Help Center</h1>
        <p className="text-lg text-gray-600 mt-2">
          How can we assist you today? Browse topics or search for help.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full max-w-lg"
        >
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>

      {/* FAQ Section */}
      <div className="faq-section mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">FAQs</h2>
        <div className="space-y-4">
          <details className="bg-gray-100 p-4 rounded-lg">
            <summary className="font-medium cursor-pointer">
              How can I reset my password?
            </summary>
            <p className="mt-2 text-gray-600">
              To reset your password, go to the login page and click on "Forgot
              Password." Follow the instructions sent to your email.
            </p>
          </details>
          <details className="bg-gray-100 p-4 rounded-lg">
            <summary className="font-medium cursor-pointer">
              How can I contact customer support?
            </summary>
            <p className="mt-2 text-gray-600">
              You can contact customer support via email at
              support@example.com or call us at +1-800-555-1234.
            </p>
          </details>
          <details className="bg-gray-100 p-4 rounded-lg">
            <summary className="font-medium cursor-pointer">
              How do I update my account information?
            </summary>
            <p className="mt-2 text-gray-600">
              Go to your account settings and edit your profile information
              under the "Profile" tab.
            </p>
          </details>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="contact-section mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Contact Us
        </h2>
        <p className="text-gray-600 mb-4">
          Need further assistance? Reach out to us via the following options:
        </p>
        <ul className="space-y-2">
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:support@example.com" className="text-blue-500">
              support@example.com
            </a>
          </li>
          <li>
            <strong>Phone:</strong> +1-800-555-1234
          </li>
          <li>
            <strong>Live Chat:</strong> Available 24/7 on our website
          </li>
        </ul>
      </div>

      {/* Troubleshooting Section */}
      <div className="troubleshooting-section">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Troubleshooting Guides
        </h2>
        <ul className="space-y-4">
          <li className="bg-gray-100 p-4 rounded-lg">
            <strong>Login Issues:</strong> Step-by-step guide to resolve login
            problems.
          </li>
          <li className="bg-gray-100 p-4 rounded-lg">
            <strong>Payment Problems:</strong> Learn how to troubleshoot
            payment-related issues.
          </li>
          <li className="bg-gray-100 p-4 rounded-lg">
            <strong>Account Access:</strong> Guide to recover your account if
            locked.
          </li>
        </ul>
      </div>
    </div>
  );
}
