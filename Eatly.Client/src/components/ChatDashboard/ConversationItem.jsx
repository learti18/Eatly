import React from 'react';

const ConversationItem = ({ active, time, name, message, unread }) => {


  return (
    <div className={`conversation-item p-1 bg-white  m-1 rounded-md `}>
      <div className="flex items-center p-2 cursor-pointer hover:bg-gray-200  ">
      
        <div className="w-10 h-10 mr-3">
          <img
            className="rounded-full w-full h-full object-cover"
            src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
            alt="avatar"
          />
        </div>

       
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm font-medium text-text-dark">{name}</div>
            <div className="text-xs text-gray-400 ">{time}</div>
          </div>
          <div className="text-sm text-gray-500 truncate w-44">
            {message}
          </div>
        </div>

        
        {unread > 0 && (
          <div className="ml-2 bg-purple text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {unread}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationItem;
