"use client";

import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 w-full">
      <div className="px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and description */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white">YourWebsite</h2>
            <p className="mt-2 text-sm text-gray-400">
              Empowering you to explore and grow.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  <Link href="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:underline">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Resources</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  <Link href="/blog" className="hover:underline">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:underline">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social media */}
          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex mt-2 space-x-4">
              <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
                <FaFacebook className="h-6 w-6 hover:text-blue-500" />
              </Link>
              <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
                <FaTwitter className="h-6 w-6 hover:text-blue-400" />
              </Link>
              <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
                <FaInstagram className="h-6 w-6 hover:text-pink-500" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <FaLinkedin className="h-6 w-6 hover:text-blue-700" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} YourWebsite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
