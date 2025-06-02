// components/ChatDashboard/Messages.js
import React, { useRef, useEffect } from 'react';
import ChatInput from './ChatInput';
import { getAuth } from 'firebase/auth';

export default function Messages({ messages = [], onSendMessage }) {
  const messagesEndRef = useRef(null);
  const auth = getAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!auth.currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-300">
      <div className="flex items-center space-x-3 border-b border-gray-300 px-4 py-3">
        <img src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png" className="w-10 h-10 rounded-full" />
        <div>
          <div className="text-text-dark  font-bold">Angela Vatiga</div>
          <div className="text-sm text-green-500">Online</div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${
              message.senderId === auth.currentUser.uid ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block rounded-xl p-3 max-w-xs ${
                message.senderId === auth.currentUser.uid
                  ? 'bg-purple text-white'
                  : 'bg-gray-200 text-text-dark'
              }`}
            >
              <div>{message.content}</div>
              <div className="text-xs opacity-75 mt-1">
                {message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : ''}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="py-3">
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
}
