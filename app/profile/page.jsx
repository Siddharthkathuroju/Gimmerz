"use client";
// app/profile/page.jsx

import React, { useState, useEffect } from "react";
import Profile from "/components/Profile";
export default function ProfilePage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating API call to fetch user's questions
    async function fetchQuestions() {
      try {
        const response = await fetch("/api/user/questions"); // Replace with your API endpoint
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
  }, []);

  return (
    <div className="profile-page">
      <h1 className="page-title">Your Questions</h1>
      {loading && <p>Loading your questions...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div className="questions-list">
          {questions.length > 0 ? (
            questions.map((question) => (
              <div key={question.id} className="question-item">
                <h2>{question.title}</h2>
                <p>{question.description}</p>
                <p className="timestamp">Posted on: {new Date(question.createdAt).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>You have not posted any questions yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
