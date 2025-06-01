import React, { useState, useEffect } from "react";
import { useAuth } from "../../../Hooks/useAuth";
import { getCurrentUser } from "../../../Utils/UserStore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { STATUS } from "../../../Utils/AuthStatus";
import { subscribeToMessages, subscribeToUserRooms, sendMessage } from "../../../Services/FirebaseService";

export default function RestaurantChat() {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageLoading, setMessageLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { status, isAuthenticated } = useAuth();
  const currentUser = getCurrentUser();
  const firebaseAuth = getAuth();

  useEffect(() => {
    if (status !== STATUS.PENDING) {
      setAuthChecked(true);
    }
  }, [status]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      console.log('Firebase auth state changed:', user ? 'authenticated' : 'not authenticated');
      if (user) {
        console.log('Restaurant user ID:', user.uid);
      }
      setIsFirebaseReady(!!user);
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to messages when a room is selected
  useEffect(() => {
    if (!selectedRoomId || !isFirebaseReady || !firebaseAuth.currentUser) return;

    console.log('Setting up message subscription for room:', selectedRoomId);
    setMessageLoading(true);
    setMessages([]); // Clear messages when changing rooms
    
    try {
      const unsubscribe = subscribeToMessages(selectedRoomId, (updatedMessages) => {
        console.log('Received messages for room:', selectedRoomId, 'count:', updatedMessages.length);
        setMessages(updatedMessages);
        setMessageLoading(false);
      });

      return () => {
        console.log('Cleaning up message subscription for room:', selectedRoomId);
        unsubscribe();
        setMessages([]);
      };
    } catch (err) {
      console.error('Error subscribing to messages:', err);
      setError(err.message);
      setMessageLoading(false);
    }
  }, [selectedRoomId, isFirebaseReady]);

  // Subscribe to rooms
  useEffect(() => {
    if (!isFirebaseReady || !firebaseAuth.currentUser) return;

    console.log('Setting up rooms subscription');
    setLoading(true);
    
    try {
      const unsubscribe = subscribeToUserRooms((updatedRooms) => {
        console.log('Received rooms update, count:', updatedRooms.length);
        setRooms(updatedRooms);
        setLoading(false);
      });

      return () => {
        console.log('Cleaning up rooms subscription');
        unsubscribe();
      };
    } catch (err) {
      console.error('Error subscribing to rooms:', err);
      setError(err.message);
      setLoading(false);
    }
  }, [isFirebaseReady]);

  const handleSendMessage = async (content) => {
    if (!selectedRoomId || !content.trim() || !firebaseAuth.currentUser) return;
    
    try {
      console.log('Sending message to room:', selectedRoomId);
      await sendMessage(selectedRoomId, content);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
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
            <div className="text-xl font-semibold text-text-dark p-3">
              Messages
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
                <div className="text-center text-gray-500 p-4">No chats available</div>
              ) : (
                rooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`p-3 cursor-pointer rounded-lg transition-colors ${
                      selectedRoomId === room.id
                        ? 'bg-purple text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-semibold">
                      {room.name}
                      {room.createdBy === firebaseAuth.currentUser?.uid ? ' (You)' : ''}
                    </div>
                    {room.lastMessage && (
                      <div className={`text-sm ${
                        selectedRoomId === room.id ? 'text-white opacity-75' : 'text-gray-600'
                      } truncate`}>
                        {room.lastMessage.senderId === firebaseAuth.currentUser?.uid ? 'You: ' : ''}
                        {room.lastMessage.content}
                      </div>
                    )}
                    {room.lastMessage && room.lastMessage.timestamp && (
                      <div className={`text-xs ${
                        selectedRoomId === room.id ? 'text-white opacity-60' : 'text-gray-500'
                      }`}>
                        {new Date(room.lastMessage.timestamp).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        <div className="flex-grow h-screen p-2 rounded-md">
          {selectedRoomId ? (
            <div className="flex flex-col h-full bg-white border-l border-gray-300">
              <div className="flex-grow overflow-y-auto px-4 py-6 space-y-4">
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
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderId === firebaseAuth.currentUser?.uid ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs rounded-xl p-3 ${
                          msg.senderId === firebaseAuth.currentUser?.uid
                            ? 'bg-purple text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        <p className="break-words">{msg.content}</p>
                        <span className="text-xs opacity-75 mt-1 block">
                          {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : ''}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="p-4 border-t">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const input = e.target.elements.message;
                  handleSendMessage(input.value);
                  input.value = '';
                }}>
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
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-purple text-white hover:bg-purple-dark'
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
