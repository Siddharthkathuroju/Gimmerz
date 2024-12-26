"use client";

import React, { useState, useEffect } from "react";

export default function Profile() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewQuestions, setViewQuestions] = useState(false);

  const handleViewQuestionsClick = () => {
    setViewQuestions(true);
  };

  useEffect(() => {
    if (!viewQuestions) return;

    async function fetchQuestions() {
      try {
        const response = await fetch("/api/questions/qget/");
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [viewQuestions]);

  return (
    <div className="profile-questions text-center">
      <div className="view-questions-button text-center mb-8">
        <button
          onClick={handleViewQuestionsClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
        >
          {viewQuestions ? "Loading your questions..." : "View Your Questions"}
        </button>
      </div>

      {viewQuestions && (
        <div className="questions-list">
          {loading && <p>Loading your questions...</p>}
          {error && <p className="error text-red-500">{error}</p>}
          {!loading && !error && questions.length > 0 ? (
            questions.map((question) => (
              <div key={question.id} className="question-item mb-6 p-4 border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold">{question.title}</h3>
                <p className="text-gray-700 mt-2">{question.description}</p>
                <p className="timestamp text-sm text-gray-500 mt-2">
                  Posted on: {new Date(question.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-600">You have not posted any questions yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
