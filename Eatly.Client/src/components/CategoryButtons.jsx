import React from "react";

export default function CategoryButtons({
  icon,
  className,
  title,
  onClick,
  isActive = false,
  value,
  activeClassName,
}) {
  return (
    <button
      onClick={() => onClick?.(value)}
      className={`${className} flex flex-col shadow-xm justify-between items-center rounded-2xl py-2.5 transition-all duration-200 ${
        isActive
          ? `border-4 ${activeClassName}`
          : "border-4 border-transparent hover:transform hover:scale-105"
      }`}
    >
      <img className="size-10 md:size-12" src={icon} />
      <h3 className="text-sm font-medium mt-3.5 text-center">{title}</h3>
    </button>
  );
}
