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
      className={`${className} flex flex-col flex-1 w-16 md:w-20 max-w-24 justify-between items-center rounded-xl py-4 px-3 transition-all duration-200 ${
        isActive
          ? `border-3 ${activeClassName}`
          : "border-3 border-transparent hover:transform hover:scale-105 hover:shadow-md"
      }`}
    >
      <img className="w-full" src={icon} />
      <h3 className="text-sm font-medium px-1 text-center">{title}</h3>
    </button>
  );
}
