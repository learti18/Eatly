import React, { useState } from "react";
import {
  LayoutDashboard,
  Car,
  Inbox,
  Calendar,
  Receipt,
  Settings,
  UserCircle,
  ChevronLeft,
  KeyRound,
  ForkKnife,
  User,
  LogOut,
  Book,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useLogout from "./../../Queries/Auth/useLogout";

export default function Sidebar() {
  const [isToggledSidebar, setIsToggledSidebar] = useState(true);
  const location = useLocation();
  const logoutMutation = useLogout();
  const handleLogout = () => {
    logoutMutation.mutateAsync();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => setIsToggledSidebar((prevState) => !prevState);

  const links = [
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: <LayoutDashboard size={22} />,
    },
    {
      name: "Restaurants",
      to: "/dashboard/restaurants",
      icon: <ForkKnife size={22} />,
    },
    { name: "Users", to: "/dashboard/users", icon: <User size={22} /> },
    { name: "Orders", to: "/dashboard/orders", icon: <Inbox size={22} /> },
    {
      name: "Blogs",
      to: "/dashboard/blogs",
      icon: <Book size={22} />,
    },
    {
      name: "Reimbursements",
      to: "/dashboard/reimbursements",
      icon: <Receipt size={20} />,
    },
    {
      name: "Accounts",
      to: "/dashboard/accounts",
      icon: <UserCircle size={22} />,
    },
    {
      name: "Settings",
      to: "/dashboard/settings",
      icon: <Settings size={22} />,
    },
  ];

  return (
    <div
      className={`bg-background-main min-h-screen h-full transition-all duration-500 drop-shadow-lg ${
        isToggledSidebar ? "w-72" : "w-20"
      }`}
    >
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b-2 border-gray-200">
          <button
            onClick={toggleSidebar}
            className="flex ml-auto text-gray-400 hover:text-purple transition-colors cursor-pointer"
          >
            <div
              className={`transform transition-transform duration-500 ${
                isToggledSidebar ? "rotate-0" : "rotate-180"
              }`}
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </div>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2 p-3 flex-grow">
          {/* Main Navigation */}
          <div className="space-y-1">
            {links.slice(0, 4).map((link) => (
              <Link
                key={link.to}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-lg duration-200 transition-all
                                ${
                                  isActive(link.to)
                                    ? "bg-purple text-white font-medium"
                                    : "text-gray-500 hover:bg-purple-light hover:text-purple-dark font-medium"
                                } 
                                ${isToggledSidebar ? "" : "justify-center"}`}
                to={link.to}
              >
                <span className="flex-shrink-0">{link.icon}</span>
                {isToggledSidebar && (
                  <span className="truncate">{link.name}</span>
                )}
              </Link>
            ))}
          </div>

          {/* Settings Group - with separator */}
          <div className="mt-8 pt-4 border-t-2 border-gray-200 space-y-1">
            {links.slice(4).map((link) => (
              <Link
                key={link.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg duration-100 transition-colors
                                ${
                                  isActive(link.to)
                                    ? "bg-purple-dark text-white font-medium"
                                    : "text-gray-500 hover:bg-purple-light hover:text-purple-dark"
                                } 
                                ${isToggledSidebar ? "" : "justify-center"}`}
                to={link.to}
              >
                <span className="flex-shrink-0">{link.icon}</span>
                {isToggledSidebar && (
                  <span className="truncate">{link.name}</span>
                )}
              </Link>
            ))}
          </div>

          {/* Additional Links */}
          <div className="mt-8 pt-4 border-t-2 border-gray-200 space-y-1">
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 px-3 py-3 cursor-pointer rounded-lg text-gray-500 hover:bg-purple-light hover:text-purple-dark duration-100 transition-colors w-full ${
                isToggledSidebar ? "" : "justify-center"
              }`}
            >
              <span className="flex-shrink-0">
                <LogOut size={22} />
              </span>
              {isToggledSidebar && <span className="truncate">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
