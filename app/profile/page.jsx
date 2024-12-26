"use client";
// app/profile/page.jsx

import React from "react";
import Profile from "/components/Profile";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

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

      {/* Include Profile Component */}
      <Profile />
    </div>
  );
}
