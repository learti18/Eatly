import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Shared/Logo";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Menu", path: "/menu" },
  { name: "Blogs", path: "/blogs" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/menu")) {
      setActiveLink("Menu");
    } else if (path.includes("/blogs")) {
      setActiveLink("Blogs");
    } else if (path.includes("/pricing")) {
      setActiveLink("Pricing");
    } else if (path.includes("/contact")) {
      setActiveLink("Contact");
    } else {
      setActiveLink("");
    }
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="bg-background-main top-0 z-[1000] px-5 fixed top-0 w-full">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center py-4 border-b-2 border-b-gray-200 drop-shadow-md">
          <Logo />
          <div className="ml-16 flex hidden md:flex">
            <div className="flex gap-8 text-text-medium font-medium">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`${
                    activeLink === link.name ? "text-purple font-semibold" : ""
                  } hover:text-purple hover:-translate-y-0.5 transition-all`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="ml-auto hidden md:flex items-center">
            <Link
              to="/sign-in"
              className="font-medium text-text-medium hover:text-primary hover:-translate-y-0.5 transition-all px-8 py-2"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="font-medium bg-primary hover:bg-[#6453d0] transition-all duration-200 rounded-[12.68px] text-white px-6 py-2.5 ml-4 hover:shadow-lg hover:-translate-y-0.5"
            >
              Sign Up
            </Link>
          </div>

          {/* mobile menu button */}
          <motion.div className="ml-auto md:hidden" whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 cursor-pointer rounded-md text-text-medium hover:text-purple focus:outline-none"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <motion.svg
                className={`${mobileMenuOpen ? "hidden" : "block"} h-8 w-8`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={false}
                animate={mobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </motion.svg>
              <motion.svg
                className={`${mobileMenuOpen ? "block" : "hidden"} h-8 w-8`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={false}
                animate={mobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </motion.svg>
            </button>
          </motion.div>
        </div>

        {/* mobile menu dropdown */}
        <div
          className={`md:hidden fixed top-[73px] bg-background-main shadow-lg z-[1000] w-full left-0 border-b border-gray-light transition-all duration-300 ease-in-out overflow-auto max-h-[calc(100vh-64px)] ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5 pointer-events-none"
          }`}
        >
          <div className="flex flex-col px-6 py-6 text-text-medium font-medium divide-y divide-gray-100">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`py-3 ${
                  activeLink === link.name
                    ? "text-purple"
                    : "hover:text-purple transition-colors"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 px-6 py-6 border-t border-gray-200 bg-gray-50">
            <Link
              to="/sign-in"
              className="font-medium text-center text-text-medium py-3 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="font-medium bg-primary text-center rounded-xl text-white px-6 py-3 hover:bg-opacity-90 transition-colors shadow-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* backdrop - fixed position with proper styling */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-[999] md:hidden top-[73px]"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
