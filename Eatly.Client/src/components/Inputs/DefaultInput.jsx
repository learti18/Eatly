import React from "react";

export default function DefaultInput({ register, error, name, placeholder }) {
  return (
    <div className="form-control w-full">
      <div
        className="rounded-xl focus-within:border-primary focus-within:ring-2 
                        focus-within:ring-primary flex items-center gap-2 px-4 py-4 w-full bg-background-input-dark"
      >
        <input
          type="text"
          className="grow text-primary outline-none bg-transparent placeholder:text-text-lighter"
          placeholder={placeholder}
          {...register(name)}
        />
      </div>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error.message}</span>
        </label>
      )}
    </div>
  );
}
