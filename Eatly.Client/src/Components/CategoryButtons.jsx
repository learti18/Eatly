import React from "react";

export default function CategoryButtons({ icon, className, title }) {
  return (
    <button
      className={`${className} flex flex-col justify-between items-center rounded-xl p-3`}
    >
      <img className="size-10 md:size-15" src={icon} />
      <h3>{title}</h3>
    </button>
  );
}
