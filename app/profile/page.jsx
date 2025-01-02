"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Profile from "/components/Profile";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  // Ensure session is available before setting initial state
  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit mode
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // Set phone if available
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/150"); // Default profile picture
  const [uploadedFile, setUploadedFile] = useState(null); // Holds the selected file

  // Set initial profile values when session is available
  useEffect(() => {
    if (session) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
    }
  }, [session]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("/api/profiles/update/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, profilePic }),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      const result = await response.json();
      console.log(result.message);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result); // Set the preview of the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (uploadedFile) {
      console.log("Uploading file:", uploadedFile);
      // Add logic to upload the file to the server if needed
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>; // Show loading indicator until session is available
  }

  return (
    <div className="profile-page container mx-auto p-6">
      <div className="profile-header text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Your Profile</h1>
        <p className="text-lg text-gray-600 mt-2">Here you can view your questions and manage your content.</p>
      </div>

      {/* Profile Information */}
      <div className="profile-info text-center mb-6">
        <div className="avatar mb-4 relative">
          <img
            src={profilePic}
            alt="Profile Avatar"
            className="rounded-full w-32 h-32 mx-auto object-cover"
          />
          {isEditing && (
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <button
                onClick={handleUpload}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Upload
              </button>
            </div>
          )}
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
