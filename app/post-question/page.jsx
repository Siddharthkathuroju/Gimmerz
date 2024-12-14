"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Importing next-auth for session management
import Form from "/components/Form"; // Update import path if needed

const Qpage = () => {
  const { data: session, status } = useSession(); // Destructure `data` and `status` from `useSession`
  const [submitting, setIsSubmitting] = useState(false);
  const [question, setQuestion] = useState(""); // State for the question input field
  const [loadingState, setLoadingState] = useState({ loading: false, error: null });
  const [data, setData] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question || question.trim().length < 10) {
      setLoadingState({ loading: false, error: "Question must be at least 10 characters long." });
      return;
    }

    setIsSubmitting(true);
    setLoadingState({ loading: true, error: null });

    try {
      const response = await fetch("/api/questions/new/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, userId: session?.user?.id }), // Use session data safely
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit question");
      }

      const result = await response.json();
      console.log("Question submitted successfully:", result);

      setData(result); // Store the newly submitted question in the state
      setQuestion(""); // Reset the question field
    } catch (error) {
      console.error("Error submitting question:", error.message);
      setLoadingState({ loading: false, error: error.message });
    } finally {
      setIsSubmitting(false);
      setLoadingState((prev) => ({ ...prev, loading: false })); // Preserve error state
    }
  };

  // Handle session loading or unauthenticated state
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Please Sign In to Ask a Question</h1>
        <p className="text-lg text-gray-500">You need to be signed in to ask a question.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ask a Question</h1>

      {/* Show loading state or error message */}
      {loadingState.loading && <p className="text-blue-500">Loading...</p>}
      {loadingState.error && <p className="text-red-500">{loadingState.error}</p>}

      {/* Render the Form component if the user is signed in */}
      <Form
        type="Ask"
        post={question}
        setPost={setQuestion}
        submitting={submitting}
        handleSubmit={handleSubmit}
      />

      {/* Display the latest question submitted */}
      {data && (
        <div>
          <h2 className="text-xl font-semibold">Latest Question</h2>
          <p className="mt-2">{data?.question}</p>
        </div>
      )}
    </div>
  );
};

export default Qpage;
