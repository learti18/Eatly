import React from "react";
import Conversation from "../../../components/ChatDashboard/Conversation";
import Messages from "../../../components/ChatDashboard/Messages";
import ChatInput from "../../../components/ChatDashboard/ChatInput";

export default function RestaurantChat() {
  return (
    <div className="">
      <div className="flex bg-white   ">
        <div className="w-80 h-screen  bg-white p-2 hidden md:block">
          <div className="h-full overflow-y-auto">
            <div className="text-xl font-semibold text-text-dark  p-3">
              Messages
            </div>
            <div className="search-chat flex p-3">
              <input
                type="text"
                placeholder="Messages"
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-gray-100 text-text-dark  focus:outline-none"
              />
            </div>
            <div className="text-lg font-semibol text-text-dark p-3 ">
              Recent
            </div>
            <Conversation />
          </div>
        </div>
        <div className="flex-grow  h-screen p-2 rounded-md">
          <Messages />
        </div>
      </div>
    </div>
  );
}
