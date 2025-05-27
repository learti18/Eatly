// components/ChatDashboard/Messages.js
import React from 'react';
import ChatInput from './ChatInput';

export default function Messages() {
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
        <div className="text-right">
          <div className="inline-block bg-gray-200 text-text-dark rounded-xl p-3 max-w-xs">Hi, My Order Is Not Delivered Yet. How Much Time I Wait For The Order.</div>
          <div className="text-xs text-gray-400 mt-1">10:52</div>
        </div>
        <div className="text-left">
          <div className="inline-block bg-purple text-white rounded-xl p-3 max-w-xs">Order Is On The Way Matt.</div>
          <div className="text-xs text-gray-400 mt-1">10:53</div>
        </div>
        <div className="text-right">
          <div className="inline-block bg-gray-200 text-text-dark rounded-xl p-3 max-w-xs">OKay, I’m Waiting….</div>
          <div className="text-xs text-gray-400 mt-1">10:53</div>
        </div>
      </div>

      <div className=" flex justify-center  py-3   ">
        <ChatInput />
      </div>
    </div>
  );
}
