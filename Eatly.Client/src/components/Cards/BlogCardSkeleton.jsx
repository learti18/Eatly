import React from "react";

export default function BlogCardSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl w-full shadow-[0_8px_25px_-5px_rgba(0,0,0,0.12)] px-4 py-5 animate-pulse"
        >
          {/* Image skeleton */}
          <div className="overflow-hidden rounded-xl">
            <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Title skeleton */}
          <div className="pt-4 pb-2">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>

          {/* Author info skeleton */}
          <div className="flex flex-col justify-center pt-4">
            <div className="flex items-center gap-3">
              <div className="bg-gray-200 rounded-full w-10 h-10"></div>
              <div className="flex flex-col flex-1 gap-2">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="flex justify-between w-full">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
