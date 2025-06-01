import React, { useState, useEffect } from 'react';
import { useChat } from '../../Hooks/useChat';
import { useAuth } from '../../Hooks/useAuth';
import { getCurrentUser } from '../../Utils/UserStore';
import { STATUS } from '../../Utils/AuthStatus';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRestaurantById } from '../../Queries/Restaurants/useRestaurantById';
import Icon from './Icon';
import { CircleX } from 'lucide-react';

export default function FloatingChat({ restaurantId, restaurantName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [roomId, setRoomId] = useState(null);
  const [isLoadingRoom, setIsLoadingRoom] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  const { status, isAuthenticated } = useAuth();
  const currentUser = getCurrentUser();
  const firebaseAuth = getAuth();
  
  // Fetch restaurant data to get the user ID
  const { data: restaurant, isLoading: isLoadingRestaurant } = useRestaurantById(restaurantId);
  
  const {
    messages,
    loading: messagesLoading,
    error,
    sendMessage: sendNewMessage,
    createChatRoom,
    rooms
  } = useChat(roomId);

  useEffect(() => {
    if (status !== STATUS.PENDING) {
      setAuthChecked(true);
    }
  }, [status]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      console.log('Firebase auth state changed:', user ? 'authenticated' : 'not authenticated');
      setIsFirebaseReady(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Find existing chat room or create new one
    const findOrCreateRoom = async () => {
      if (!isOpen || !restaurant) return;
      
      const currentFirebaseUser = firebaseAuth.currentUser;
      if (!currentFirebaseUser) {
        console.log('Waiting for Firebase authentication...');
        return;
      }
      
      setIsLoadingRoom(true);
      try {
        console.log('Finding/creating room with:', {
          currentUserId: currentFirebaseUser.uid,
          restaurantUserId: restaurant.userId
        });
        
        // Check if room already exists
        const existingRoom = rooms.find(room => 
          room.participants && 
          room.participants[currentFirebaseUser.uid] && 
          room.participants[restaurant.userId]
        );

        if (existingRoom) {
          console.log('Found existing room:', existingRoom.id);
          setRoomId(existingRoom.id);
        } else if (currentFirebaseUser && restaurant.userId) {
          // Create new room if it doesn't exist
          console.log('Creating new room');
          const newRoomId = await createChatRoom(
            [currentFirebaseUser.uid, restaurant.userId],
            `Chat with ${restaurantName}`
          );
          console.log('Created new room:', newRoomId);
          setRoomId(newRoomId);
        }
      } catch (err) {
        console.error('Error setting up chat:', err);
      } finally {
        setIsLoadingRoom(false);
      }
    };

    if (isAuthenticated && authChecked && isFirebaseReady && !isLoadingRestaurant) {
      findOrCreateRoom();
    }
  }, [firebaseAuth.currentUser, restaurant, rooms, isAuthenticated, authChecked, isOpen, isFirebaseReady, isLoadingRestaurant]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !roomId || !firebaseAuth.currentUser) return;

    try {
      await sendNewMessage(message);
      setMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  // Don't show anything while checking authentication or loading restaurant data
  if (status === STATUS.PENDING || !authChecked || !isFirebaseReady || isLoadingRestaurant) {
    return null;
  }

  // Don't show chat if not authenticated
  if (!isAuthenticated || !firebaseAuth.currentUser) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple text-white p-4 rounded-full shadow-lg hover:bg-purple-dark transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-96 h-[500px] flex flex-col">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center bg-purple text-white rounded-t-lg">
            <h3 className="font-semibold">{restaurantName}</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoadingRoom || messagesLoading ? (
              <div className="flex items-center justify-center h-full">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-500">
                No messages yet. Start the conversation!
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

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:border-purple"
                disabled={isLoadingRoom || messagesLoading}
              />
              <button
                type="submit"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isLoadingRoom || messagesLoading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-purple text-white hover:bg-purple-dark'
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
