import { initializeApp, getApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getDatabase, ref, onValue, push, set, serverTimestamp, get } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyB-nSAGhmWg2WAzNw-mK8RbGNFS3SVS6GE",
    authDomain: "eatly-eae0e.firebaseapp.com",
    projectId: "eatly-eae0e",
    storageBucket: "eatly-eae0e.appspot.com",
    messagingSenderId: "808319531419",
    appId: "1:808319531419:web:6aaa83b6e587832194893e",
    databaseURL: "https://eatly-eae0e-default-rtdb.europe-west1.firebasedatabase.app"
  };

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

  // Create a new room
  const roomRef = ref(db, 'chats');
  const newRoomRef = push(roomRef);
  
  // Create participants object with user IDs as keys
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
    return onValue(messagesRef, (snapshot) => {
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