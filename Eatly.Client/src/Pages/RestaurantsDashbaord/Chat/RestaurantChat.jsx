import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../Hooks/useAuth";
import { getCurrentUser } from "../../../Utils/UserStore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { STATUS } from "../../../Utils/AuthStatus";
import {
  subscribeToMessages,
  subscribeToUserRooms,
  sendMessage,
  markRoomAsReadInFirebase,
  subscribeToUnreadCounts,
} from "../../../Services/FirebaseService";

export default function RestaurantChat() {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageLoading, setMessageLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState({});
  const messagesEndRef = useRef(null);

  const { status, isAuthenticated } = useAuth();
  const currentUser = getCurrentUser();
  const firebaseAuth = getAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const selectRoom = (roomId) => {
    setSelectedRoomId(roomId);

    setUnreadMessages((prev) => ({
      ...prev,
      [roomId]: 0,
    }));

    if (firebaseAuth.currentUser) {
      markRoomAsReadInFirebase(roomId, firebaseAuth.currentUser.uid).catch(
        (err) => {
          console.error("Error marking room as read:", err);
          setUnreadMessages((prev) => ({
            ...prev,
            [roomId]: 1,
          }));
        }
      );
    }
  };

  const getUnreadCount = (roomId) => {
    return unreadMessages[roomId] || 0;
  };

  const showNewMessageNotification = (roomName, messageContent) => {
    const totalUnread =
      Object.values(unreadMessages).reduce((total, count) => total + count, 0) +
      1;
    document.title = `(${totalUnread}) Restaurant Chat - Eatly`;

    try {
      const audio = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMUAy6Ny+nOciMFeL7CfnoVCiWS4+yYQQoNUan0vzlNJCR9/1sdF"
      );
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (error) {}

    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        const notification = new Notification(`New message from ${roomName}`, {
          body:
            messageContent.length > 50
              ? messageContent.substring(0, 50) + "..."
              : messageContent,
          icon: "/Logo.svg",
          tag: "restaurant-chat",
          requireInteraction: false,
        });

        setTimeout(() => {
          notification.close();
        }, 5000);
      } else if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            setTimeout(
              () => showNewMessageNotification(roomName, messageContent),
              100
            );
          }
        });
      }
    }
  };

  useEffect(() => {
    if (!firebaseAuth.currentUser) return;

    const unsubscribe = subscribeToUnreadCounts(
      firebaseAuth.currentUser.uid,
      (unreadCounts) => {
        setUnreadMessages(unreadCounts);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [firebaseAuth.currentUser]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const totalUnread = Object.values(unreadMessages).reduce(
      (total, count) => total + count,
      0
    );
    if (totalUnread === 0) {
      document.title = "Restaurant Chat - Eatly";
    }
  }, [unreadMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (status !== STATUS.PENDING) {
      setAuthChecked(true);
    }
  }, [status]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setIsFirebaseReady(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!selectedRoomId || !isFirebaseReady || !firebaseAuth.currentUser)
      return;

    setMessageLoading(true);
    setMessages([]);

    let unsubscribe;

    try {
      unsubscribe = subscribeToMessages(selectedRoomId, (updatedMessages) => {
        setMessages(updatedMessages);
        setMessageLoading(false);
      });
    } catch (err) {
      console.error("Error subscribing to messages:", err);
      setError(err.message);
      setMessageLoading(false);
    }

    return () => {
      if (unsubscribe && typeof unsubscribe === "function") {
        unsubscribe();
      }
      setMessages([]);
    };
  }, [selectedRoomId, isFirebaseReady]);

  useEffect(() => {
    if (!isFirebaseReady || !firebaseAuth.currentUser) return;

    setLoading(true);

    let unsubscribe;
    let previousRooms = {};

    try {
      unsubscribe = subscribeToUserRooms((updatedRooms) => {
        updatedRooms.forEach((room) => {
          if (
            room.lastMessage &&
            room.id !== selectedRoomId &&
            room.lastMessage.senderId !== firebaseAuth.currentUser?.uid
          ) {
            const previousRoom = previousRooms[room.id];
            const isNewMessage =
              !previousRoom ||
              !previousRoom.lastMessage ||
              previousRoom.lastMessage.timestamp < room.lastMessage.timestamp;

            if (isNewMessage && Object.keys(previousRooms).length > 0) {
              showNewMessageNotification(room.name, room.lastMessage.content);
            }
          }
        });

        previousRooms = updatedRooms.reduce((acc, room) => {
          acc[room.id] = room;
          return acc;
        }, {});

        setRooms(updatedRooms);
        setLoading(false);
      });
    } catch (err) {
      console.error("Error subscribing to rooms:", err);
      setError(err.message);
      setLoading(false);
    }

    return () => {
      if (unsubscribe && typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [isFirebaseReady, selectedRoomId, firebaseAuth.currentUser]);

  const handleSendMessage = async (content) => {
    if (!selectedRoomId || !content.trim() || !firebaseAuth.currentUser) return;

    try {
      await sendMessage(selectedRoomId, content);
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message");
    }
  };

  // Don't show anything while checking authentication
  if (status === STATUS.PENDING || !authChecked || !isFirebaseReady) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Don't show chat if not authenticated
  if (!isAuthenticated || !firebaseAuth.currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Please log in to access the chat.</p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex bg-white">
        <div className="w-80 h-screen bg-white p-2 hidden md:block">
          <div className="h-full overflow-y-auto">
            <div className="text-xl font-semibold text-text-dark p-3 flex items-center justify-between">
              <span>Messages</span>
              <div className="flex items-center gap-2">
                {Object.values(unreadMessages).reduce(
                  (total, count) => total + count,
                  0
                ) > 0 && (
                  <div className="bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                    {Object.values(unreadMessages).reduce(
                      (total, count) => total + count,
                      0
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="search-chat flex p-3">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-gray-100 text-text-dark focus:outline-none"
              />
            </div>
            <div className="text-lg font-semibold text-text-dark p-3">
              Recent Chats ({rooms.length})
            </div>
            <div className="space-y-2">
              {loading ? (
                <div className="text-center p-4">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : error ? (
                <div className="text-red-500 text-center p-4">{error}</div>
              ) : rooms.length === 0 ? (
                <div className="text-center text-gray-500 p-4">
                  No chats available
                </div>
              ) : (
                rooms.map((room) => {
                  const unreadCount = getUnreadCount(room.id);
                  const hasUnread = unreadCount > 0;

                  return (
                    <div
                      key={room.id}
                      onClick={() => selectRoom(room.id)}
                      className={`p-3 cursor-pointer rounded-lg transition-colors relative ${
                        selectedRoomId === room.id
                          ? "bg-purple text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <div
                            className={`font-semibold ${
                              hasUnread && selectedRoomId !== room.id
                                ? "font-bold"
                                : ""
                            }`}
                          >
                            {room.name}
                            {room.createdBy === firebaseAuth.currentUser?.uid
                              ? " (You)"
                              : ""}
                          </div>
                          {room.lastMessage && (
                            <div
                              className={`text-sm ${
                                selectedRoomId === room.id
                                  ? "text-white opacity-75"
                                  : hasUnread
                                  ? "text-gray-800 font-medium"
                                  : "text-gray-600"
                              } truncate`}
                            >
                              {room.lastMessage.senderId ===
                              firebaseAuth.currentUser?.uid
                                ? "You: "
                                : ""}
                              {room.lastMessage.content}
                            </div>
                          )}
                          {room.lastMessage && room.lastMessage.timestamp && (
                            <div
                              className={`text-xs ${
                                selectedRoomId === room.id
                                  ? "text-white opacity-60"
                                  : "text-gray-500"
                              }`}
                            >
                              {new Date(
                                room.lastMessage.timestamp
                              ).toLocaleTimeString()}
                            </div>
                          )}
                        </div>

                        {/* Unread message indicator */}
                        {hasUnread && selectedRoomId !== room.id && (
                          <div className="flex items-center ml-2">
                            <div className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                              {unreadCount > 99 ? "99+" : unreadCount}
                            </div>
                          </div>
                        )}

                        {/* New message dot indicator */}
                        {hasUnread && selectedRoomId !== room.id && (
                          <div className="absolute top-2 right-2">
                            <div className="bg-red-500 rounded-full h-3 w-3 animate-pulse"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="flex-grow h-screen p-2 rounded-md">
          {selectedRoomId ? (
            <div className="flex flex-col h-full bg-white border-l border-gray-300">
              <div className="flex-grow overflow-y-auto px-4 py-6 space-y-4 scrollbar-hide">
                {messageLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <span className="loading loading-spinner loading-lg"></span>
                  </div>
                ) : error ? (
                  <div className="text-red-500 text-center">{error}</div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-gray-500">
                    No messages yet in this conversation.
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
                          className={`max-w-xs rounded-xl p-3 ${
                            msg.senderId === firebaseAuth.currentUser?.uid
                              ? "bg-purple text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          <p className="break-words">{msg.content}</p>
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

              <div className="p-4 border-t">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.target.elements.message;
                    handleSendMessage(input.value);
                    input.value = "";
                  }}
                >
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      name="message"
                      placeholder="Type a message..."
                      className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:border-purple"
                      disabled={messageLoading}
                    />
                    <button
                      type="submit"
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        messageLoading
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-purple text-white hover:bg-purple-dark"
                      }`}
                      disabled={messageLoading}
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
