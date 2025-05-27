import React from "react";

export default function ChatInput() {
  return (
    <div className="flex items-center p-3 bg-white w-200 ">
      {/* Microphone Button */}
      <button className="bg-purple p-3 rounded-lg text-white hover:bg-purple-dark focus:outline-none">
        <svg
        className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-mic-icon lucide-mic"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      </button>

      {/* Input Field */}
      <div className="flex-grow mx-3 relative">
        <input
          type="text"
          placeholder="Write now..."
          className="w-full pl-4 pr-10 py-3 rounded-xl bg-gray-100 text-text-dark  focus:outline-none"
        />

        {/* Send Button Inside Input */}
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple hover:text-purple-dark">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
