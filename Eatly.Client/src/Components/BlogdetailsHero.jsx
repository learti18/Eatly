import React from 'react';

export default function BlogdetailsHero({ blogImage, blogTitle, user, date, userImg }) {

    return (
        <div className="flex flex-col">
          <h1 className="text-text-darker pb-2 pt-4 text-xl font-semibold leading-tight sm:text-2xl">
            {blogTitle}
          </h1>
    
          <div className="mb-4 flex items-center gap-4">
            <img
              src={userImg}
              alt={user}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-xs text-gray-600">Written By</p>
              <p className="text-base font-semibold text-black">{user}</p>
            </div>
          </div>
    
          <div className="hidden overflow-hidden rounded-xl shadow-lg sm:block">
            <img
              src={blogImage}
              alt="Blog visual"
              className="h-60 w-full object-cover md:h-80"
            />
          </div>
          <span className="w-full border-b-2 border-gray-500 pt-5 sm:hidden"></span>
        </div>
      );
}
