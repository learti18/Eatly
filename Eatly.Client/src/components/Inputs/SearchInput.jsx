import React from "react";
import { Search } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search",
  className = "",
}) {
  return (
    <div className={`form-control w-full ${className}`}>
      <div
        className="rounded-xl focus-within:border-primary focus-within:ring-2 
                        focus-within:ring-primary flex items-center gap-2 px-4 py-5 w-full bg-background-input-dark"
      >
        <Search className="h-5 w-5 text-text-lighter" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="grow text-primary outline-none bg-transparent placeholder:text-text-lighter"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
