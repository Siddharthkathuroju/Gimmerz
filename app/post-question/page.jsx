"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react"; 
import Form from "/components/Form";
import Sidebar from "/components/sidebar";

const Qpage = () => {
  const { data: session, status } = useSession();
  const [submitting, setIsSubmitting] = useState(false);
  const [question, setQuestion] = useState("");
  const [loadingState, setLoadingState] = useState({ loading: false, error: null });
  const [data, setData] = useState(null);
  const [generatedContent, setGeneratedContent] = useState(null);

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
        body: JSON.stringify({ question, userId: session?.user?.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit question");
      }

      const result = await response.json();
      setData(result);
      setGeneratedContent(result.generatedContent);
      setQuestion("");
    } catch (error) {
      setLoadingState({ loading: false, error: error.message });
    } finally {
      setIsSubmitting(false);
      setLoadingState((prev) => ({ ...prev, loading: false }));
    }
  };

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
    <div className="flex min-h-screen">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Ask a Question</h1>

        {loadingState.loading && <p className="text-blue-500">Loading...</p>}
        {loadingState.error && <p className="text-red-500">{loadingState.error}</p>}

        <Form
          type="Generate"
          post={question}
          setPost={setQuestion}
          submitting={submitting}
          handleSubmit={handleSubmit}
        />

        {data && (
          <div>
            <h2 className="text-xl font-semibold mt-6">Latest Question</h2>
            <p className="mt-2">{data?.question}</p>
          </div>
        )}

        {generatedContent && (
          <div className="mt-6 p-4 bg-white rounded-md shadow">
            <h2 className="text-xl font-semibold">Generated Response</h2>
            <p className="mt-2 text-gray-700">{generatedContent}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Qpage;
