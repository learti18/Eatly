import React, { useState, useEffect } from "react";
import { useMobileChat } from "../../Contexts/MobileChatContext";
import { ArrowUp, ChevronUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isMobileChatOpen } = useMobileChat();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible || isMobileChatOpen) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-7 md:bottom-4 left-4 z-40 bg-purple hover:bg-purple-dark text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple focus:ring-opacity-50"
      aria-label="Scroll to top"
    >
      <ArrowUp />
    </button>
  );
};

export default ScrollToTopButton;
