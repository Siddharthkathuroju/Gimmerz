"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";
import {
  FiMenu,
  FiHome,
  FiPieChart,
  FiSettings,
  FiUsers,
  FiMail,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const menuItems = [
    { icon: FiHome, name: "ToDo", link: "/Todo" },
    { icon: FiPieChart, name: "Analytics", link: "/analytics" },
    { icon: FiUsers, name: "Profile", link: "/profile" },
    { icon: FiMail, name: "Messages", link: "/messages" },
    { icon: FiSettings, name: "Settings", link: "/settings" },
    { icon: FiHelpCircle, name: "Help Center", link: "/Helpcenter" },
  ];

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-gray-900 text-white transition-all duration-300 ${
          isSidebarExpanded ? "w-64" : "w-20"
        } overflow-hidden`}
      >
        <div className="flex h-20 items-center justify-between px-4">
          <div
            className={`${
              isSidebarExpanded ? "block" : "hidden"
            } text-xl font-bold`}
          >
            Dashboard
          </div>
          <button
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className="rounded-lg p-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-label={
              isSidebarExpanded ? "Collapse Sidebar" : "Expand Sidebar"
            }
          >
            <FiMenu className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col gap-2 px-3">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.link || "#"} passHref>
              <button
                className="flex items-center rounded-lg p-3 text-gray-300 transition-colors hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                <item.icon className="h-6 w-6" />
                {isSidebarExpanded && (
                  <div className="ml-3 flex flex-1 items-center justify-between">
                    <span>{item.name}</span>
                  </div>
                )}
              </button>
            </Link>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <button
            type="button"
            onClick={signOut}
            className="flex w-full items-center rounded-lg p-3 text-gray-300 transition-colors hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-label="Logout"
          >
            <FiLogOut className="h-6 w-6" />
            {isSidebarExpanded && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarExpanded ? "ml-64" : "ml-20"}`}>
        <nav className="flex items-center justify-between w-full bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow-md py-4 px-6">
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
              <>
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => {
                        signIn(provider.id);
                      }}
                      className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    >
                      Sign in
                    </button>
                  ))}
              </>
            )}
          </div>
        </nav>

        {/* Homepage Content */}
        <section className="w-full flex flex-col items-center justify-center py-10 bg-gradient-to-br from-blue-50 via-purple-100 to-indigo-50">
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
    </div>
  );
};

export default Nav;
