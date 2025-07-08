import React, { useState, useEffect, useRef } from "react";
import { useChat } from "../../Hooks/useChat";
import { useAuth } from "../../Hooks/useAuth";
import { getCurrentUser } from "../../Utils/UserStore";
import { STATUS } from "../../Utils/AuthStatus";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRestaurantById } from "../../Queries/Restaurants/useRestaurantById";
import {
  findExistingRoom,
  markRoomAsReadInFirebase,
} from "../../Services/FirebaseService";
import { useFirebaseUnreadMessages } from "../../Hooks/useFirebaseUnreadMessages";
import { useMobileChat } from "../../Contexts/MobileChatContext";

export default function FloatingChat({ restaurantId, restaurantName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [isLoadingRoom, setIsLoadingRoom] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const { setIsMobileChatOpen } = useMobileChat();
  const {
    totalUnreadCount,
    unreadCounts,
    loading: unreadLoading,
  } = useFirebaseUnreadMessages();
  const { status, isAuthenticated, user } = useAuth();
  const currentUser = getCurrentUser();
  const firebaseAuth = getAuth();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const { data: restaurant, isLoading: isLoadingRestaurant } =
    useRestaurantById(restaurantId);
  const {
    messages,
    loading: messagesLoading,
    error,
    sendMessage: sendNewMessage,
    createChatRoom,
    rooms,
  } = useChat(roomId);

  useEffect(() => {
    const markAsRead = async () => {
      if (isOpen && roomId && firebaseAuth.currentUser) {
        try {
          await markRoomAsReadInFirebase(roomId, firebaseAuth.currentUser.uid);
        } catch (error) {
          console.error("FloatingChat: Error marking room as read:", error);
        }
      }
    };
    markAsRead();
  }, [isOpen, roomId, firebaseAuth.currentUser]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      scrollToBottom();
    }
  }, [isOpen]);

  useEffect(() => {
    if (status !== STATUS.PENDING) {
      setAuthChecked(true);
    }
  }, [status]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 768 ||
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isOpen]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setFirebaseUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const findOrCreateRoom = async () => {
      if (!isOpen || !restaurant || !firebaseUser) return;

      setIsLoadingRoom(true);
      try {
        const existingRoomId = await findExistingRoom(
          firebaseUser.uid,
          restaurant.userId
        );
        if (existingRoomId) {
          setRoomId(existingRoomId);
        } else {
          const newRoomId = await createChatRoom(
            [firebaseUser.uid, restaurant.userId],
            `${user?.email || currentUser?.email || "Anonymous User"}`
          );
          setRoomId(newRoomId);
        }
      } catch (err) {
        console.error("Error with chat room:", err);
      } finally {
        setIsLoadingRoom(false);
      }
    };

    if (isAuthenticated && authChecked && !isLoadingRestaurant) {
      findOrCreateRoom();
    }
  }, [
    firebaseUser,
    restaurant,
    isAuthenticated,
    authChecked,
    isOpen,
    isLoadingRestaurant,
  ]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !roomId || !firebaseAuth.currentUser) return;

    const inputElement = inputRef.current;

    try {
      await sendNewMessage(message);
      setMessage("");

      // Keep keyboard open on mobile by maintaining focus
      if (isMobile && inputElement) {
        setTimeout(() => {
          inputElement.focus();
        }, 100);
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleInputFocus = () => {
    setTimeout(() => {
      scrollToBottom();
    }, 300);
  };

  useEffect(() => {
    setIsMobileChatOpen(isMobile && isOpen);
  }, [isMobile, isOpen, setIsMobileChatOpen]);

  if (
    status === STATUS.PENDING ||
    !authChecked ||
    !firebaseUser ||
    isLoadingRestaurant ||
    !isAuthenticated ||
    !firebaseAuth.currentUser
  )
    return null;

  return (
    <div
      className={`${
        isMobile && isOpen
          ? "fixed inset-0 z-50 bg-white"
          : "fixed z-50 bottom-4 right-4 sm:max-w-sm max-w-[calc(100vw-2rem)]"
      }`}
    >
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={`bg-purple text-white p-4 rounded-full shadow-lg hover:bg-purple-dark transition-colors relative ${
            isMobile ? "fixed bottom-4 right-4" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>

          {/* Unread message indicator */}
          {!unreadLoading && totalUnreadCount > 0 && (
            <div className="absolute -top-2 -right-2">
              <div className="bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                {totalUnreadCount > 99 ? "99+" : totalUnreadCount}
              </div>
            </div>
          )}
        </button>
      ) : (
        <div
          className={`bg-white shadow-xl flex flex-col ${
            isMobile
              ? "h-full w-full"
              : "rounded-lg sm:w-80 w-full max-h-[60vh] sm:max-h-[400px]"
          }`}
        >
          {/* Header */}
          <div
            className={`p-4 border-b flex justify-between items-center bg-purple text-white ${
              isMobile ? "pt-safe-top" : "rounded-t-lg"
            }`}
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base truncate">
                {restaurantName}
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 ml-2 flex-shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 scrollbar-hide min-h-0">
            {isLoadingRoom || messagesLoading ? (
              <div className="flex items-center justify-center h-full min-h-[200px]">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center text-sm">{error}</div>
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-500 text-sm">
                No messages yet. Start the conversation!
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.senderId === firebaseAuth.currentUser?.uid
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-xs rounded-xl p-2 sm:p-3 ${
                        msg.senderId === firebaseAuth.currentUser?.uid
                          ? "bg-purple text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      <p className="break-words text-sm sm:text-base">
                        {msg.content}
                      </p>
                      <span className="text-xs opacity-75 mt-1 block">
                        {msg.timestamp
                          ? new Date(msg.timestamp).toLocaleTimeString()
                          : ""}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 sm:p-4 border-t border-gray-300 bg-white flex-shrink-0"
          >
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={handleInputFocus}
                placeholder="Type a message..."
                className="flex-1 rounded-lg px-3 py-2 text-sm focus:outline-none border-2 focus:border-purple border-gray-300"
                disabled={isLoadingRoom || messagesLoading}
                autoComplete="off"
                inputMode="text"
                enterKeyHint="send"
              />
              <button
                type="submit"
                className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                  isLoadingRoom || messagesLoading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-purple text-white hover:bg-purple-dark"
                }`}
                disabled={isLoadingRoom || messagesLoading || !message.trim()}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
