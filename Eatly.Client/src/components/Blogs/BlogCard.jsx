import React from "react";
import { Link } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({
  id,
  blogImage,
  blogTitle,
  user,
  date,
  userImg,
  size = "default", // Add size prop with default value
}) {
  // Different styling based on size
  const isSm = size === "sm";

  return (
    <Link
      to={`/blogs/${id}`}
      className={`bg-white rounded-xl shadow-xl w-full ${
        isSm
          ? "max-w-[280px] pt-4 pb-5 pl-4 pr-4"
          : "max-w-xs pt-5 pb-7 pl-5 pr-5"
      }`}
    >
      <div className="overflow-hidden rounded-xl">
        <img
          src={blogImage}
          className={`w-full ${isSm ? "h-52" : "h-60"} object-cover rounded-lg`}
        />
      </div>

      <h2
        className={`${
          isSm ? "pt-3 pb-2 text-base" : "pt-4 pb-2 text-lg"
        } font-semibold text-text-darker`}
      >
        {blogTitle}
      </h2>

      <div className={`flex flex-col justify-center ${isSm ? "pt-2" : "pt-2"}`}>
        <div className="flex items-center gap-3">
          <img
            src={userImg}
            alt={user}
            className={`${
              isSm ? "w-9 h-9" : "w-10 h-10"
            } rounded-full object-cover`}
          />
          <div className="flex flex-col flex-1">
            <p className="text-xs text-gray-600">written by</p>
            <div className="flex justify-between w-full">
              <p
                className={`${
                  isSm ? "text-sm" : "text-base"
                } font-semibold text-black`}
              >
                {user}
              </p>
              <span className="text-xs text-gray-400">{date}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
