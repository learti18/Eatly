import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({
  id,
  blogImage,
  blogTitle,
  user,
  date,
  userImg,
  size = "default",
}) {
  const isSm = size === "sm";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatUsername = (email) => {
    if (!email) return "";
    return email.split("@")[0];
  };

  const formattedDate = formatDate(date);
  const formattedUsername = formatUsername(user);

  return (
    <Link
      to={`/blogs/${id}`}
      className={`bg-white rounded-xl w-full shadow-[0_8px_25px_-5px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_35px_-5px_rgba(0,0,0,0.18)] transition-shadow duration-200 ${
        isSm ? "max-w-[280px] px-4 py-5" : "max-w-xs px-4 py-5"
      }`}
    >
      <div className="overflow-hidden rounded-xl">
        <img
          src={blogImage}
          className={`w-full ${isSm ? "h-54" : "h-64"} object-cover rounded-lg`}
        />
      </div>

      <h2
        className={`leading-tight font-semibold text-text-darker overflow-hidden text-ellipsis whitespace-nowrap ${
          isSm ? "pt-3 pb-2 text-base" : "pt-4 pb-2 text-lg"
        } font-semibold text-text-darker`}
      >
        {blogTitle}
      </h2>

      <div className={`flex flex-col justify-center ${isSm ? "pt-2" : "pt-4"}`}>
        <div className="flex items-center gap-3">
          <div className="bg-[#F29DB0] rounded-full w-10 h-10 flex items-center justify-center font-medium text-lg text-white">
            {user ? user.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="flex flex-col flex-1">
            <p className="text-xs text-[#8D8D8D]">Written By</p>
            <div className="flex justify-between w-full">
              <p
                className={`${
                  isSm ? "text-sm" : "text-base"
                } font-medium text-black`}
              >
                {formattedUsername}
              </p>
              <span className="text-sm text-gray-400 uppercase">
                {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
