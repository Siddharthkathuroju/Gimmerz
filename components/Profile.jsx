// components/Profile.jsx

import React from "react";
import PropTypes from "prop-types";

function Profile({ questions, isLoading, error }) {
  return (
    <div className="profile-container">
      <h1 className="profile-title">Your Posted Questions</h1>

      {/* Loading State */}
      {isLoading && <p>Loading your questions...</p>}

      {/* Error State */}
      {error && <p className="error-message">{error}</p>}

      {/* Questions List */}
      {!isLoading && !error && (
        <div className="questions-list">
          {questions && questions.length > 0 ? (
            questions.map((question) => (
              <div key={question.id} className="question-item">
                <h2 className="question-title">{question.title}</h2>
                <p className="question-description">{question.description}</p>
                <p className="question-timestamp">
                  Posted on: {new Date(question.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>You haven't posted any questions yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

// PropTypes validation
Profile.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default Profile;
