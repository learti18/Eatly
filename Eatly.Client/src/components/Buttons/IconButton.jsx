import React from "react";

export default function IconButton({ icon, bgColor, title }) {
  return (
    <div
      className="tooltip tooltip-info flex flex-col items-center justify-center rounded-2xl shadow-sm w-13 h-12 md:w-16 md:h-15"
      data-tip={title || "Icon Button"}
      style={{
        backgroundColor: bgColor || "#F3F4F6",
      }}
    >
      <div>{icon}</div>
    </div>
  );
}
