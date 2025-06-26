import React from "react";

export default function CategoryButtons({ 
  icon, 
  className, 
  title, 
  onClick, 
  isActive = false,
  value,
  activeClassName
}) {
  return (
    <button
      onClick={() => onClick?.(value)}
      className={`${className} flex flex-col justify-between items-center rounded-xl p-3 transition-all duration-200 ${
        isActive ? `border-3 ${activeClassName}` : 'border-2 border-transparent hover:transform hover:scale-105 hover:shadow-md'
      }`}
    >
      <img className="size-10 md:size-15" src={icon} />
      <h3 className="text-sm font-medium">{title}</h3>
    </button>
  );
}
