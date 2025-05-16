import React from "react";

function DropdownSelect({
  register,
  name,
  label,
  options,
  placeholder = "Select an option",
  error,
  className = "",
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 placeholder-gray-200 mb-1">
          {label}
        </label>
      )}
      <select
        {...register(name)}
        className={`w-full py-4 px-2 bg-background-input placeholder:text-text-lighter rounded-xl shadow-sm focus:ring-purple focus:border-purple ${className}`}
        defaultValue=""
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}

export default DropdownSelect;
