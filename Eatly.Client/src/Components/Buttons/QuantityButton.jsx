import React from "react";

export default function QuantityButton({ text, onClick }) {
  const isNumber = typeof text === "number";

  return (
    <button
      onClick={onClick}
      disabled={isNumber}
      className={`w-14 h-14 rounded-[16px] flex items-center justify-center 
        text-3xl shadow-xl transition-all duration-200 
        ${
          isNumber
            ? "bg-gray-100 text-gray-400 shadow-none cursor-default"
            : "bg-background-link text-white hover:bg-[#6453d0] cursor-pointer  hover:-translate-y-0.5 transition-all"
        }`}
    >
      {text}
    </button>
  );
}
