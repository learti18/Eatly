import React from "react";

export default function TextAreaInput({ name, register, error, placeholder }) {
  return (
    <div>
      <textarea
        {...register(name)}
        rows={4}
        className="w-full p-2 bg-background-input rounded-md shadow-sm focus:ring-purple focus:border-purple placeholder:text-text-lighter"
        placeholder={placeholder}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error.message}</span>
        </label>
      )}
    </div>
  );
}
