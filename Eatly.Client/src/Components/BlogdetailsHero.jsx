import React from "react";
import { Calendar, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BlogdetailsHero({ blogTitle, user, blogImage }) {
  const navigate = useNavigate();

  return (
    <div className="mb-14">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 cursor-pointer text-text-darker font-medium mb-6 hover:text-purple transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Blogs
      </button>

      <div className="flex flex-col gap-5">
        <h1 className="text-2xl md:text-3xl font-semibold text-text-darker">
          {blogTitle}
        </h1>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-[#F29DB0] rounded-full w-10 h-10 flex items-center justify-center font-medium text-lg text-white">
              {user ? user.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-600">Written by</span>
              <span className="text-text-dark">{user}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl overflow-hidden">
          {blogImage ? (
            <img
              src={blogImage}
              alt={blogTitle}
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
          ) : (
            <div className="w-full h-[300px] md:h-[400px] bg-gray-200 flex items-center justify-center text-gray-400">
              No image available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
