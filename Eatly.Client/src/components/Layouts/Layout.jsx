import React, { useEffect, useState } from "react";
import Navbar from "../Navigation/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useAuth } from "../../Hooks/useAuth";
import { STATUS } from "../../Utils/AuthStatus";
import { useMobileChat } from "../../Contexts/MobileChatContext";
import ScrollToTopButton from "../Buttons/ScrollToTopButton";

function Layout() {
  const location = useLocation().pathname;
  const [isAuthPage, setIsAuthPage] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { status } = useAuth();
  const { isMobileChatOpen } = useMobileChat();

  useEffect(() => {
    const isSignIn = location.includes("sign-in");
    const isSignUp =
      location.includes("sign-up") || location.includes("restaurant-signup");
    const isForgetPassword = location.includes("forget-password");

    setIsAuthPage(isSignIn || isSignUp || isForgetPassword);
    setMounted(true);
  }, [location]);

  if (!mounted || status === STATUS.PENDING) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hide navbar when mobile chat is open */}
      {!isMobileChatOpen && (
        <div className={`${isAuthPage ? "block md:hidden" : "block"}`}>
          <Navbar />
        </div>
      )}
      <main
        className={`flex-1 z-10 ${
          isMobileChatOpen ? "pt-0" : isAuthPage ? "pt-10 md:pt-0" : "pt-20"
        } `}
      >
        <Outlet />
      </main>
      {/* Hide footer when mobile chat is open */}
      {!isMobileChatOpen && (
        <div className={`${isAuthPage ? "block md:hidden" : ""}`}>
          <Footer />
        </div>
      )}

      {/* Scroll to top button - context aware */}
      <ScrollToTopButton />
    </div>
  );
}

export default Layout;
