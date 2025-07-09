import React from "react";
import Logo from "../Shared/Logo";
import { Link } from "react-router-dom";

const links = [
  { name: "Blog", path: "/blog" },
  { name: "Menu", path: "/menu" },
  { name: "About Us", path: "/about" },
];

export default function Footer() {
  return (
    <footer className="bg-background-footer py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-5">
        {/* Top section with logo and links - desktop */}
        <div className="hidden md:flex flex-row justify-between w-full border-b-2 border-b-gray-300 py-6">
          <div>
            <Logo />
          </div>
          <div className="flex flex-row items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-neutral-content font-medium hover:text-purple transition duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Top section for mobile - logo and social icons on same line */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <Logo />
          <div className="flex gap-6">
            {/* Social media icons */}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-115 transition-transform duration-200"
            >
              <img
                className="size-5"
                src="/icons/instagramIcon.svg"
                alt="instagram"
              />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-115 transition-transform duration-200"
            >
              <img
                className="size-5"
                src="/icons/linkedinIcon.svg"
                alt="linkedin"
              />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-115 transition-transform duration-200"
            >
              <img
                className="size-5"
                src="/icons/facebookIcon.svg"
                alt="facebook"
              />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-115 transition-transform duration-200"
            >
              <img
                className="size-5"
                src="/icons/twitterIcon.svg"
                alt="twitter"
              />
            </a>
          </div>
        </div>

        {/* Mobile nav links in column */}
        <div className="md:hidden flex flex-col space-y-4 mb-6 border-b border-b-gray-300 pb-6">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-neutral-content font-medium hover:text-purple transition duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Bottom section with copyright and social icons for desktop */}
        <div className="hidden md:flex justify-between pt-8">
          <p className="text-neutral-content">
            © 2025 EATLY All Rights Reserved.
          </p>
          <div className="flex gap-10">
            {/* Social media icons */}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-115 transition-transform duration-200"
            >
              <img src="/icons/instagramIcon.svg" alt="instagram" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-115 transition-transform duration-200"
            >
              <img src="/icons/linkedinIcon.svg" alt="linkedin" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-115 transition-transform duration-200"
            >
              <img src="/icons/facebookIcon.svg" alt="facebook" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-115 transition-transform duration-200"
            >
              <img src="/icons/twitterIcon.svg" alt="twitter" />
            </a>
          </div>
        </div>

        {/* Copyright text for mobile */}
        <div className="md:hidden text-center">
          <p className="text-slate-600 text-sm">
            © 2025 EATLY All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
