"use client";

import React from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700 mb-2">Your Question</label>
        <textarea
          value={post}
          onChange={(e) => setPost(e.target.value)} // Update the question as the user types
          placeholder="Ask your question here"
          required
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        >
          {submitting ? "Generating..." : type}
        </button>
      </div>
    </form>
  );
};

export default Form;
