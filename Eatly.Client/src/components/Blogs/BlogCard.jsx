import React from 'react';

export default function BlogCard({ blogImage, blogTitle, user, date, userImg }) {
  return (
    <div className="bg-white rounded-xl shadow-2xl  w-full max-w-xs pt-5 pb-7 pl-5 pr-5">
      <div className="overflow-hidden rounded-xl">
        <img
          src={blogImage}
          className="w-full h-60 object-cover rounded-lg"
        />
      </div>

      
        <h2 className=" pt-4 pb-2 text-lg font-semibold text-gray-800">{blogTitle}</h2>
      

        <div className="flex flex-col justify-center">
        <div className="flex items-center gap-3">
          <img
            src={userImg}
            alt={user}
            className=" w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col flex-1">
            <p className="text-xs text-gray-600 mb-1">written by</p>
            <div className="flex justify-between w-full">
              <p className="text-sm font-semibold text-black">{user}</p>
              <span className="text-xs text-gray-400">{date}</span>
            </div>
          </div>
        </div>
      </div>
       
      
    </div>
  );
}
