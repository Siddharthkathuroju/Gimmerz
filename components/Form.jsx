"use client";

import React from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto"> {/* Center form with max width */}
      <div>
        <label className="block text-gray-700 mb-2 text-lg font-medium">
          Your Question
        </label>
        <textarea
          value={post}
          onChange={(e) => setPost(e.target.value)} // Update the question as the user types
          placeholder="Ask your question here"
          required
          className="w-full h-40 p-4 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 hover:bg-blue-600 transition"
        >
          {submitting ? "Generating..." : type}
        </button>
      </div>
    </form>
  );
};

export default Form;
