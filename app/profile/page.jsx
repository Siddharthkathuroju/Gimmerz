"use client";
// app/profile/page.jsx

import React, { useState, useEffect } from "react";
import Profile from "/components/Profile";
import { useSession } from "next-auth/react";
export default function ProfilePage() {
  const [questions, setQuestions] = useState([]);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewQuestions, setViewQuestions] = useState(false);

  const handleViewQuestionsClick = () => {
    setViewQuestions(true);
  };

  useEffect(() => {
    if (!viewQuestions) return;

    // Simulating API call to fetch user's questions
    async function fetchQuestions() {
      try {
        const response = await fetch("/api/questions/qget"); // Replace with your API endpoint
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
  }, [viewQuestions]); // Only trigger fetch when viewQuestions is true

  return (
    <div className="profile-page container mx-auto p-6">
      <div className="profile-header text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Your Profile</h1>
        <p className="text-lg text-gray-600 mt-2">Here you can view your questions and manage your content.</p>
      </div>

      {/* Profile Information */}
      <div className="profile-info text-center mb-6">
        <div className="avatar mb-4">
          <img
            src="https://via.placeholder.com/150" // Replace with user's avatar if available
            alt="Profile Avatar"
            className="rounded-full w-32 h-32 mx-auto"
          />
        </div>
        <h2 className="text-2xl font-semibold">{session.user.name}</h2> {/* Replace with dynamic name */}
        <p className="text-gray-500">Software Developer</p> {/* Replace with dynamic role/description */}
      </div>

      {/* Button to View Questions */}
      <div className="view-questions-button text-center mb-8">
        <button
          onClick={handleViewQuestionsClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
        >
          {viewQuestions ? "Loading your questions..." : "View Your Questions"}
        </button>
      </div>

      {/* Questions List */}
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
