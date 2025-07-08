import React, { createContext, useContext, useState } from "react";

const MobileChatContext = createContext();

export const MobileChatProvider = ({ children }) => {
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const openMobileChat = () => setIsMobileChatOpen(true);
  const closeMobileChat = () => setIsMobileChatOpen(false);

  return (
    <MobileChatContext.Provider
      value={{
        isMobileChatOpen,
        openMobileChat,
        closeMobileChat,
        setIsMobileChatOpen,
      }}
    >
      {children}
    </MobileChatContext.Provider>
  );
};

export const useMobileChat = () => {
  const context = useContext(MobileChatContext);
  if (!context) {
    throw new Error("useMobileChat must be used within a MobileChatProvider");
  }
  return context;
};
