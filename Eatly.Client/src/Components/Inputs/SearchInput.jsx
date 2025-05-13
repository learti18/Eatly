import React from "react";

export default function SearchInput() {
  return (
    <div className="form-control w-full py-3">
      <div
        className="rounded-xl focus-within:border-primary focus-within:ring-2 
                        focus-within:ring-primary flex items-center gap-2 px-4 py-4 w-full bg-background-input-dark"
      >
        <img src="search.svg" />
        <input
          type="text"
          className="grow text-primary outline-none bg-transparent placeholder:text-text-lighter"
          placeholder="Search"
        />
      </div>
    </div>
  );
}
