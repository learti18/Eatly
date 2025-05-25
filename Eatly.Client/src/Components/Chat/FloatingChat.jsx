import React, { useState } from 'react'
import Icon from './Icon';
import { CircleX } from 'lucide-react';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="rounded-3xl w-80 overflow-hidden shadow-xl bg-white">
          {/* Header */}
          <div className="bg-purple text-white flex justify-between items-center px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-2">
                <Icon className="text-purple w-6 h-6" />
              </div>
              <h2 className="font-semibold text-lg">Chatbot</h2>
            </div>
            <button 
              className="text-white text-2xl cursor-pointer hover:bg-purple-dark rounded-full p-1 transition-colors"
              onClick={toggleChat}
            >
              <CircleX />
            </button>
          </div>
  
          {/* Body */}
          <div className="p-4 space-y-4 bg-white h-64 overflow-y-auto">
            {/* Message from bot */}
            <div className="flex items-start gap-2">
              <div className="bg-purple rounded-full p-2 flex-shrink-0">
                <Icon className="text-white" />
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-xl text-sm max-w-xs">
                Hey there 👋
                <br />
                How can I help you today?
              </div>
            </div>
  
            {/* Message from user */}
            <div className="flex justify-end">
              <div className="bg-purple text-white px-4 py-2 rounded-xl text-sm max-w-xs">
                Lorem ipsum dolor, sit amet consectetur adipisicing.
              </div>
            </div>
          </div>
  
          {/* Footer */}
          <div className="border-t px-4 py-3 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Message..."
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              />
              <button
                type="button"
                className="text-white bg-white p-2 rounded-full cursor-pointer transition-colors flex items-center justify-center"
              >
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.02271 1.19434C1.02254 1.17298 1.02825 1.15195 1.03833 1.13379C1.04842 1.11577 1.06273 1.10089 1.07935 1.09082C1.0959 1.08086 1.1144 1.07565 1.13306 1.0752L1.18774 1.08887L1.19263 1.09082L23.2659 12.9053L23.2708 12.9082C23.2893 12.9179 23.3054 12.9329 23.3167 12.9521C23.3279 12.9713 23.3337 12.9937 23.3333 13.0166C23.3327 13.0397 23.3259 13.0624 23.3137 13.0811C23.3076 13.0903 23.3003 13.0985 23.2922 13.1055L23.2659 13.1221L23.262 13.124L1.18774 23.5479L1.18286 23.5508C1.16597 23.5589 1.1474 23.5616 1.12915 23.5605C1.11082 23.5594 1.09248 23.5542 1.07642 23.5439C1.06037 23.5336 1.04698 23.5188 1.03735 23.501C1.03255 23.4921 1.02908 23.4825 1.02661 23.4727L1.02271 23.4414V15.2422C1.02261 15.2111 1.03421 15.1819 1.05396 15.1602C1.06386 15.1493 1.07566 15.1408 1.08813 15.1348L1.1272 15.124L1.13013 15.123L18.7551 13.6455L18.7795 12.4688L1.12524 10.2451H1.12231C1.09604 10.2418 1.07075 10.2285 1.052 10.207C1.04261 10.1962 1.03555 10.1835 1.03052 10.1699L1.02271 10.127V1.19434Z" fill="#6C5FBC" stroke="#6C5FBC" stroke-width="1.18333"/>
</svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-purple hover:bg-purple-dark text-white p-3 rounded-full shadow-lg flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}
    </div>
  );
}
