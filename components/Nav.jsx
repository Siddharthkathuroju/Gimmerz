"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";
import { FiMenu, FiLogOut } from "react-icons/fi";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className="flex flex-col min-h-screen"> {/* Use min-h-screen to ensure full height */}
      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="fixed left-0 top-0 h-full bg-gray-900 text-white w-64 p-4 z-40">
          <div className="flex justify-end">
            <button
              onClick={() => setIsSidebarVisible(false)} // Hide sidebar on close
              className="text-white p-2"
            >
              X {/* Close Icon */}
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/Todo">
              <button className="text-white p-3">ToDo</button>
            </Link>
            <Link href="/analytics">
              <button className="text-white p-3">Analytics</button>
            </Link>
            <Link href="/profile">
              <button className="text-white p-3">Profile</button>
            </Link>
            <Link href="/messages">
              <button className="text-white p-3">Messages</button>
            </Link>
            <Link href="/settings">
              <button className="text-white p-3">Settings</button>
            </Link>
            <Link href="/Helpcenter">
              <button className="text-white p-3">Help Center</button>
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="text-white p-3 mt-5"
            >
              <FiLogOut /> Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <nav className="w-full bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow-md py-4 px-6 flex items-center justify-between z-50">
        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsSidebarVisible(true)} // Show sidebar when clicked
          className="p-2 sm:block" // Make it visible on all screen sizes
        >
          <FiMenu className="h-6 w-6 text-gray-900" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/images/Glogo.jpg"
            alt="logo"
            width={35}
            height={35}
            className="object-contain"
          />
          <p className="text-2xl font-bold text-gray-900">Gimmer</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-12">
          {session?.user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/create-prompt"
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
              >
                Create Post
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100 transition"
              >
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-blue-600"
                  alt="profile"
                />
              </Link>
            </div>
          ) : (
            providers &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
              >
                Sign in
              </button>
            ))
          )}
        </div>
      </nav>

      {/* Homepage Content */}
      <section className="w-full flex flex-col items-center justify-center py-10 bg-gradient-to-br from-blue-50 via-purple-100 to-indigo-50 flex-grow"> 
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 text-center">
          Let's explore your learning!
          <br className="hidden md:block" />
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 text-center max-w-2xl">
          Your ultimate tool for managing and optimizing your schedule
        </p>

        {/* Center Button */}
        <div className="mt-8">
          <Link
            href="/post-question"
            className="px-6 py-3 text-white bg-blue-600 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            Talk with AI
          </Link>
        </div>
      </section>

      
    </div>
  );
};

export default Nav;
