"use client";
// app/profile/page.jsx

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Profile from "/components/Profile";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit mode
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [phone, setPhone] = useState(""); // Set phone if available

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSaveChanges = () => {
    // Save changes to the backend or update session (omitting actual backend code for now)
    console.log("Saved:", { name, email, phone });
    setIsEditing(false);
  };

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
        <h2 className="text-2xl font-semibold">{session?.user?.name}</h2>
        <p className="text-gray-500">Software Developer</p> {/* Replace with dynamic role/description */}
      </div>

      {/* Editable Fields */}
      <div className="space-y-4">
        <div className="flex justify-center gap-4">
          <div className="flex flex-col items-center w-1/3 bg-gray-100 p-4 rounded-lg">
            <label htmlFor="name" className="text-gray-600 mb-2">Name</label>
            {isEditing ? (
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span>{name}</span>
            )}
          </div>

          <div className="flex flex-col items-center w-1/3 bg-gray-100 p-4 rounded-lg">
            <label htmlFor="email" className="text-gray-600 mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span>{email}</span>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <div className="flex flex-col items-center w-1/3 bg-gray-100 p-4 rounded-lg">
            <label htmlFor="phone" className="text-gray-600 mb-2">Phone Number</label>
            {isEditing ? (
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span>{phone || "Not provided"}</span>
            )}
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="flex justify-center gap-4 mt-6">
        {isEditing ? (
          <button
            onClick={handleSaveChanges}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={handleEditToggle}
            className="text-brown-500 border border-brown-500 px-4 py-2 rounded-md hover:bg-brown-100"
          >
            Edit
          </button>
        )}
      </div>

      {/* Include Profile Component */}
      <Profile />
    </div>
  );
}
