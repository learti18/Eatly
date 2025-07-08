import { useState, useEffect, useCallback } from 'react';
import {
  createChatRoom,
  sendMessage,
  subscribeToMessages,
  subscribeToUserRooms
} from '../Services/FirebaseService';

export const useChat = (roomId = null) => {
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roomId) return;

    setLoading(true);
    try {
      const unsubscribe = subscribeToMessages(roomId, (newMessages) => {
        setMessages(newMessages.sort((a, b) => a.timestamp - b.timestamp));
        setLoading(false);
      });

      return () => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      };
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    try {
      const unsubscribe = subscribeToUserRooms((newRooms) => {
        setRooms(newRooms.sort((a, b) => {
          const aTime = a.lastMessage?.timestamp || a.createdAt;
          const bTime = b.lastMessage?.timestamp || b.createdAt;
          return bTime - aTime;
        }));
      });

      return () => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      };
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const sendNewMessage = useCallback(async (content) => {
    if (!roomId) {
      throw new Error('Room ID is required to send a message');
    }

    try {
      await sendMessage(roomId, content);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [roomId]);

  const createNewChatRoom = useCallback(async (participantIds, roomName) => {
    try {
      const newRoomId = await createChatRoom(participantIds, roomName);
      return newRoomId;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    messages,
    rooms,
    loading,
    error,
    sendMessage: sendNewMessage,
    createChatRoom: createNewChatRoom
  };
}; 