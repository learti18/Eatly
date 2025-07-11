import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Inbox,
  Settings,
  UserCircle,
  ChevronLeft,
  Car,
  LogOut,
  MessageSquareText,
  CircleDollarSign,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useFirebaseUnreadMessages } from "../../Hooks/useFirebaseUnreadMessages";

export default function RestaurantSidebar({ onLogout }) {
  const [isToggledSidebar, setIsToggledSidebar] = useState(true);
  const { totalUnreadCount, loading } = useFirebaseUnreadMessages();
  const location = useLocation();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };
  const toggleSidebar = () => setIsToggledSidebar((prevState) => !prevState);

  const links = [
    {
      name: "Dashboard",
      to: "/restaurant-dashboard",
      icon: <LayoutDashboard size={22} />,
    },
    {
      name: "Foods",
      to: "/restaurant-dashboard/foods",
      icon: <UtensilsCrossed size={22} />,
    },
    {
      name: "Orders",
      to: "/restaurant-dashboard/orders",
      icon: <Inbox size={22} />,
    },
    {
      name: "Drivers",
      to: "/restaurant-dashboard/drivers",
      icon: <Car size={22} />,
    },
    {
      name: "Payments",
      to: "/restaurant-dashboard/payments",
      icon: <CircleDollarSign size={22} />,
    },
    {
      name: "Messages",
      to: "/restaurant-dashboard/chat",
      icon: <MessageSquareText size={20} />,
      hasNotification: !loading && totalUnreadCount > 0,
      notificationCount: totalUnreadCount,
    },
    {
      name: "Account",
      to: "/restaurant-dashboard/account",
      icon: <UserCircle size={22} />,
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg duration-100 transition-colors relative
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

                {/* Notification indicator for messages */}
                {link.hasNotification && (
                  <div className="absolute -top-1 -right-1">
                    <div className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {link.notificationCount > 99
                        ? "99+"
                        : link.notificationCount}
                    </div>
                  </div>
                )}
              </Link>
            ))}

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
    </div>
  );
}
