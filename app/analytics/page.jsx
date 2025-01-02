"use client";

import React, { useState, useEffect } from "react";

export default function DailyStreak() {
  // Simulated contributions for demonstration
  const [contributions, setContributions] = useState({});
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    // Example: Simulated contributions data
    const mockData = {};
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
      mockData[date.toISOString().split("T")[0]] = Math.random() > 0.5; // Random boolean to simulate contribution
    }
    setContributions(mockData);
  }, []);

  const getDayOfWeek = (date) => {
    return new Date(date).getDay();
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = getDaysInMonth(year, month);

    const grid = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateKey = date.toISOString().split("T")[0];
      const contributed = contributions[dateKey];

      grid.push(
        <div
          key={dateKey}
          className={`h-6 w-6 rounded-md border ${
            contributed
              ? "bg-green-500 border-green-700"
              : "bg-gray-300 border-gray-500"
          }`}
          title={`${dateKey}: ${contributed ? "Contributed" : "No Contribution"}`}
        ></div>
      );
    }

    return grid;
  };

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/attendance?userId=12345"); // Replace with actual userId
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analytics-component container mx-auto py-10 px-5">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Daily Streak Tracker</h1>
        <p className="text-lg text-gray-600 mt-2">
          Your attendance tracker for the month
        </p>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 justify-center mb-6">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-medium text-gray-700">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>

      {/* View Analytics Button */}
      <div className="flex justify-center">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          onClick={fetchAnalytics}
          disabled={loading}
        >
          {loading ? "Loading..." : "View Analytics"}
        </button>
      </div>

      {/* Display Analytics */}
      {analytics && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Analytics Overview</h2>
          <p><strong>Current Streak:</strong> {analytics.streak}</p>
          <p><strong>Last Marked:</strong> {new Date(analytics.lastMarked).toLocaleDateString()}</p>
          <p><strong>Total Contributions:</strong> {analytics.contributions.length}</p>
        </div>
      )}
    </div>
  );
}
