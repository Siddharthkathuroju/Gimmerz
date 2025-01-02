"use client";
import { useState } from "react";
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
import { signOut } from "next-auth/react";
import Link from "next/link";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { icon: FiHome, name: "ToDo",link: "/Todo" },
    { icon: FiPieChart, name: "Analytics", link: "/analytics" },
    { icon: FiUsers, name: "Profile", link: "/profile" },
    { icon: FiMail, name: "Messages", link: "/messages" },
    { icon: FiSettings, name: "Settings", link: "/settings" },
    { icon: FiHelpCircle, name: "Help Center", link: "/Helpcenter" },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-gray-900 text-white transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      } overflow-hidden`}
    >
      <div className="flex h-20 items-center justify-between px-4">
        <div className={`${isExpanded ? "block" : "hidden"} text-xl font-bold`}>
          Dashboard
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-lg p-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
          aria-label={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
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
              {isExpanded && (
                <div className="ml-3 flex flex-1 items-center justify-between">
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs">
                      {item.badge}
                    </span>
                  )}
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
          {isExpanded && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
