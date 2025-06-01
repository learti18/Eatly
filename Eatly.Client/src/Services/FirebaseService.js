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
  app = getApp(); // Get the existing app if it was already initialized
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
    throw new Error('User not authenticated with Firebase');
  }
  return user;
};

export const createChatRoom = async (participantIds, roomName = '') => {
  console.log('Creating chat room with participants:', participantIds);
  const user = checkAuth();

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
    lastMessage: null
  };

  console.log('Setting room data:', roomData);
  await set(newRoomRef, roomData);
  return newRoomRef.key;
};

export const sendMessage = async (roomId, messageContent) => {
  const user = checkAuth();
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
  console.log('Subscribing to messages for room:', roomId);

  const messagesRef = ref(db, `chats/${roomId}/messages`);
  return onValue(messagesRef, (snapshot) => {
    const messages = [];
    if (snapshot.exists()) {
      console.log('Processing messages for room:', roomId);
      snapshot.forEach((childSnapshot) => {
        const message = childSnapshot.val();
        messages.push({
          id: childSnapshot.key,
          ...message,
          timestamp: message.timestamp || Date.now()
        });
      });
      messages.sort((a, b) => a.timestamp - b.timestamp);
      console.log(`Found ${messages.length} messages for room:`, roomId);
    }
    callback(messages);
  }, (error) => {
    console.error('Error subscribing to messages:', error);
    callback([]);
  });
};

export const subscribeToUserRooms = (callback) => {
  const user = checkAuth();
  console.log('Subscribing to rooms for user:', user.uid);

  const roomsRef = ref(db, 'chats');
  return onValue(roomsRef, (snapshot) => {
    const rooms = [];
    if (snapshot.exists()) {
      console.log('Processing rooms data');
      snapshot.forEach((childSnapshot) => {
        const room = childSnapshot.val();
        // Only include rooms where the current user is a participant
        if (room.participants && room.participants[user.uid]) {
          const processedRoom = {
            id: childSnapshot.key,
            ...room,
            createdAt: room.createdAt || Date.now(),
            lastMessage: room.lastMessage ? {
              ...room.lastMessage,
              timestamp: room.lastMessage.timestamp || Date.now()
            } : null
          };
          console.log('Found room for user:', processedRoom.id);
          rooms.push(processedRoom);
        }
      });

      // Sort rooms by last message timestamp or creation time
      rooms.sort((a, b) => {
        const aTime = a.lastMessage?.timestamp || a.createdAt;
        const bTime = b.lastMessage?.timestamp || b.createdAt;
        return bTime - aTime;
      });
    }
    console.log('Final processed rooms:', rooms);
    callback(rooms);
  }, (error) => {
    console.error('Error subscribing to rooms:', error);
    callback([]);
  });
}; 