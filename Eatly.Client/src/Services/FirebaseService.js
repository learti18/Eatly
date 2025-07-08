import { initializeApp, getApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getDatabase, ref, onValue, push, set, serverTimestamp, get } from 'firebase/database';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
  };

const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_FIREBASE_DATABASE_URL'
];

const missingEnvVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('Missing required Firebase environment variables:', missingEnvVars);
  throw new Error(`Missing required Firebase environment variables: ${missingEnvVars.join(', ')}`);
}

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  if (error.code !== 'app/duplicate-app') {
    throw error;
  }
  app = getApp(); 
}

const auth = getAuth(app);
const db = getDatabase(app);

export const initializeFirebaseAuth = async (customToken) => {
  try {
    const userCredential = await signInWithCustomToken(auth, customToken);
    console.log('Firebase auth initialized successfully', userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error('Error initializing Firebase auth:', error);
    throw error;
  }
};

const checkAuth = () => {
  const user = auth.currentUser;
  console.log('Checking Firebase auth:', user ? 'authenticated' : 'not authenticated');
  if (!user) {
    return null;
  }
  return user;
};

export const createChatRoom = async (participantIds, roomName = '') => {
  console.log('Creating chat room with participants:', participantIds);
  const user = checkAuth();
  if (!user) {
    console.log('Waiting for authentication...');
    return null;
  }

  const roomRef = ref(db, 'chats');
  const newRoomRef = push(roomRef);
  
  const participants = {};
  participantIds.forEach(id => {
    participants[id] = true;
  });

  const roomData = {
    createdAt: serverTimestamp(),
    createdBy: user.uid,
    name: roomName,
    participants,
    lastMessage: null,
    clientId: user.uid
  };

  console.log('Setting room data:', roomData);
  await set(newRoomRef, roomData);
  return newRoomRef.key;
};

export const findExistingRoom = async (clientId, restaurantId) => {
  const roomsRef = ref(db, 'chats');
  const snapshot = await get(roomsRef);
  
  if (snapshot.exists()) {
    let existingRoom = null;
    snapshot.forEach((childSnapshot) => {
      const room = childSnapshot.val();
      if (room.clientId === clientId && 
          room.participants && 
          room.participants[clientId] && 
          room.participants[restaurantId]) {
        existingRoom = { id: childSnapshot.key, ...room };
      }
    });
    
    if (existingRoom) {
      console.log('Found existing room for client:', existingRoom.id);
      return existingRoom.id;
    }
  }
  
  return null;
};

export const sendMessage = async (roomId, messageContent) => {
  const user = checkAuth();
  if (!user) {
    console.log('Waiting for authentication...');
    return null;
  }
  console.log('Sending message to room:', roomId);

  const messagesRef = ref(db, `chats/${roomId}/messages`);
  const newMessageRef = push(messagesRef);
  
  const messageData = {
    content: messageContent.trim(),
    senderId: user.uid,
    senderName: user.displayName || 'Anonymous',
    timestamp: serverTimestamp()
  };

  try {
    console.log('Sending message data:', messageData);
    await set(newMessageRef, messageData);
    
    // Update last message in room
    const lastMessageRef = ref(db, `chats/${roomId}/lastMessage`);
    await set(lastMessageRef, messageData);
    
    return newMessageRef.key;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const subscribeToMessages = (roomId, callback) => {
  const user = checkAuth();
  if (!user) {
    console.log('Waiting for authentication...');
    return () => {};
  }
  console.log('Subscribing to messages for room:', roomId, 'user:', user.uid);
  
  let unsubscribeFunction = () => {};
  
  // First verify the user has access to this room
  const roomRef = ref(db, `chats/${roomId}`);
  get(roomRef).then((roomSnapshot) => {
    if (!roomSnapshot.exists()) {
      console.error('Room does not exist:', roomId);
      callback([]);
      return;
    }
    
    const room = roomSnapshot.val();
    if (!room.participants || !room.participants[user.uid]) {
      console.error('User does not have access to room:', roomId);
      callback([]);
      return;
    }
    
    // User has access, proceed with subscription
    const messagesRef = ref(db, `chats/${roomId}/messages`);
    unsubscribeFunction = onValue(messagesRef, (snapshot) => {
      const messages = [];
      if (snapshot.exists()) {
        console.log('Processing messages for room:', roomId);
        snapshot.forEach((childSnapshot) => {
          const message = childSnapshot.val();
          // Additional security: only include messages from valid participants
          if (room.participants[message.senderId]) {
            messages.push({
              id: childSnapshot.key,
              ...message,
              timestamp: message.timestamp || Date.now()
            });
          }
        });
        messages.sort((a, b) => a.timestamp - b.timestamp);
        console.log(`Found ${messages.length} messages for room:`, roomId);
      }
      callback(messages);
    }, (error) => {
      console.error('Error subscribing to messages:', error);
      callback([]);
    });
  }).catch((error) => {
    console.error('Error checking room access:', error);
    callback([]);
  });
  
  // Return a function that will call the actual unsubscribe when it's available
  return () => {
    if (typeof unsubscribeFunction === 'function') {
      unsubscribeFunction();
    }
  };
};

export const subscribeToUserRooms = (callback) => {
  const user = checkAuth();
  if (!user) {
    console.log('Waiting for authentication...');
    return () => {};
  }
  console.log('Subscribing to rooms for user:', user.uid);

  const roomsRef = ref(db, 'chats');
  return onValue(roomsRef, (snapshot) => {
    const rooms = [];
    if (snapshot.exists()) {
      console.log('Processing rooms data');
      snapshot.forEach((childSnapshot) => {
        const room = childSnapshot.val();
        if (room.participants && room.participants[user.uid]) {
          // Additional validation: ensure the room belongs to this restaurant user
          const isRestaurantRoom = room.createdBy === user.uid || 
                                  (room.participants && Object.keys(room.participants).includes(user.uid));
          
          if (isRestaurantRoom) {
            const processedRoom = {
              id: childSnapshot.key,
              ...room,
              createdAt: room.createdAt || Date.now(),
              lastMessage: room.lastMessage ? {
                ...room.lastMessage,
                timestamp: room.lastMessage.timestamp || Date.now()
              } : null,
              // Add restaurant context for additional security
              restaurantUserId: user.uid
            };
            console.log('Found room for restaurant user:', processedRoom.id);
            rooms.push(processedRoom);
          }
        }
      });
      
      // Sort rooms by last message timestamp
      rooms.sort((a, b) => {
        const timeA = a.lastMessage?.timestamp || a.createdAt || 0;
        const timeB = b.lastMessage?.timestamp || b.createdAt || 0;
        return timeB - timeA;
      });
    }
    console.log('Final processed rooms:', rooms);
    callback(rooms);
  }, (error) => {
    console.error('Error subscribing to rooms:', error);
    callback([]);
  });
}; 

// Unread message tracking functions
export const markRoomAsReadInFirebase = async (roomId, userId) => {
  const user = checkAuth();
  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    // Use current timestamp instead of serverTimestamp for immediate consistency
    const currentTimestamp = Date.now();
    const readTimestampRef = ref(db, `userReadTimestamps/${userId}/${roomId}`);
    await set(readTimestampRef, currentTimestamp);
    console.log('Marked room as read in Firebase:', roomId, 'timestamp:', currentTimestamp);
  } catch (error) {
    console.error('Error marking room as read:', error);
    throw error;
  }
};

export const subscribeToUnreadCounts = (userId, callback) => {
  const user = checkAuth();
  if (!user) {
    console.log('Waiting for authentication...');
    return () => {};
  }

  console.log('Subscribing to unread counts for user:', userId);
  
  // Subscribe to both user's read timestamps and all rooms
  const readTimestampsRef = ref(db, `userReadTimestamps/${userId}`);
  const roomsRef = ref(db, 'chats');
  
  let readTimestamps = {};
  let rooms = {};
  
  const calculateUnreadCounts = () => {
    const unreadCounts = {};
    
    console.log('Calculating unread counts...');
    console.log('Current readTimestamps:', readTimestamps);
    console.log('Current rooms count:', Object.keys(rooms).length);
    
    Object.entries(rooms).forEach(([roomId, room]) => {
      if (room.participants && room.participants[userId]) {
        const lastRead = readTimestamps[roomId] || 0;
        const lastMessageTime = room.lastMessage?.timestamp || 0;
        const lastMessageSender = room.lastMessage?.senderId;
        
        console.log(`Room ${roomId}:`, {
          lastRead,
          lastMessageTime,
          lastMessageSender,
          userId,
          isFromOtherUser: lastMessageSender !== userId,
          isNewer: lastMessageTime > lastRead
        });
        
        // Count unread messages from other users
        if (lastMessageTime > lastRead && lastMessageSender !== userId) {
          unreadCounts[roomId] = 1; // For simplicity, we'll just mark as 1 unread
          console.log(`Room ${roomId} has unread messages`);
        } else {
          unreadCounts[roomId] = 0;
          console.log(`Room ${roomId} is read or no messages from others`);
        }
      } else {
        console.log(`User ${userId} not a participant in room ${roomId}`);
      }
    });
    
    console.log('Final calculated unread counts:', unreadCounts);
    callback(unreadCounts);
  };
  
  const unsubscribeTimestamps = onValue(readTimestampsRef, (snapshot) => {
    readTimestamps = snapshot.val() || {};
    console.log('Read timestamps updated:', readTimestamps);
    calculateUnreadCounts();
  });
  
  const unsubscribeRooms = onValue(roomsRef, (snapshot) => {
    if (snapshot.exists()) {
      rooms = snapshot.val();
      console.log('Rooms updated for unread calculation');
      calculateUnreadCounts();
    }
  });
  
  return () => {
    unsubscribeTimestamps();
    unsubscribeRooms();
  };
};

export const getUnreadCountForRoom = async (roomId, userId) => {
  const user = checkAuth();
  if (!user) {
    return 0;
  }

  try {
    const readTimestampRef = ref(db, `userReadTimestamps/${userId}/${roomId}`);
    const readSnapshot = await get(readTimestampRef);
    const lastRead = readSnapshot.val() || 0;
    
    const roomRef = ref(db, `chats/${roomId}`);
    const roomSnapshot = await get(roomRef);
    
    if (!roomSnapshot.exists()) {
      return 0;
    }
    
    const room = roomSnapshot.val();
    const lastMessageTime = room.lastMessage?.timestamp || 0;
    
    if (lastMessageTime > lastRead && room.lastMessage?.senderId !== userId) {
      return 1;
    }
    
    return 0;
  } catch (error) {
    console.error('Error getting unread count for room:', error);
    return 0;
  }
};
