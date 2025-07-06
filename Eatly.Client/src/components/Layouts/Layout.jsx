import React, { useEffect, useState } from "react";
import Navbar from "../Navigation/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";

function Layout() {
  const location = useLocation().pathname;
  const [isAuthPage, setIsAuthPage] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isSignIn = location.includes("sign-in");
    const isSignUp =
      location.includes("sign-up") || location.includes("restaurant-signup");
    const isForgetPassword = location.includes("forget-password");

    setIsAuthPage(isSignIn || isSignUp || isForgetPassword);
    setMounted(true);
  }, [location]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <div className={`${isAuthPage ? "block md:hidden" : "block"}`}>
        <Navbar />
      </div>
      <main
        className={`flex-1 z-10 ${isAuthPage ? "pt-10 md:pt-0" : "pt-20"} `}
      >
        <Outlet />
      </main>
      <div className={`${isAuthPage ? "block md:hidden" : ""}`}>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
