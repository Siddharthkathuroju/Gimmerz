"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";
import Sidebar from "./sidebar";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 ml-60">
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

          {/* Mobile Navigation */}
          <div className="flex items-center sm:hidden relative">
            {session?.user ? (
              <div className="flex items-center">
                <Image
                  src={session?.user.image}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-blue-600 cursor-pointer"
                  alt="profile"
                  onClick={() => setToggleDropdown(!toggleDropdown)}
                />

                {toggleDropdown && (
                  <div className="absolute top-12 right-0 w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-4">
                    <Link
                      href="app\profile\page.jsx"
                      className="block text-gray-700 hover:text-blue-600 py-2"
                      onClick={() => setToggleDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/create-prompt"
                      className="block text-gray-700 hover:text-blue-600 py-2"
                      onClick={() => setToggleDropdown(false)}
                    >
                      Post Thoughts
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut();
                      }}
                      className="w-full px-4 py-2 mt-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
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
      </div>
    </div>
  );
};

export default Nav;