import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({
  id,
  blogImage,
  blogTitle,
  user,
  date,
  userImg,
}) {
  return (
    <Link
      to={`/blogs/${id}`}
      className="bg-white rounded-xl [box-shadow:0_25px_50px_-12px_rgba(0,0,0,0.35)]  w-full max-w-xs pt-5 pb-7 pl-5 pr-5 transition-shadow duration-300 hover:[box-shadow:0_35px_60px_-15px_rgba(0,0,0,0.5)]"
    >
      <div className="overflow-hidden rounded-xl">
        <img src={blogImage} className="w-full h-60 object-cover rounded-lg" />
      </div>

      <h2 className=" pt-4 pb-2 text-lg font-semibold text-text-darker">
        {blogTitle}
      </h2>

      <div className="flex flex-col justify-center pt-2">
        <div className="flex items-center gap-3">
          <img
            src={userImg}
            alt={user}
            className=" w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col flex-1 ">
            <p className="text-xs text-gray-600 ">written by</p>
            <div className="flex justify-between w-full">
              <p className="text-base font-semibold text-black">{user}</p>
              <span className="text-xs text-gray-400">{date}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
