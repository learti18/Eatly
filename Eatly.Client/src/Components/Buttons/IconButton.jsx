import React from "react";

export default function IconButton({ icon, bgColor, textColor, title }) {
  return (
    <button
      className={`${bgColor} flex flex-col items-center justify-center rounded-xl p-3 shadow-sm w-15 h-15 cursor-pointer  hover:-translate-y-0.5 transition-all`}
    >
      <div className="size-10 mb-1 ">{icon}</div>
    </button>
  );
}
