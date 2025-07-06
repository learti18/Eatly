import { Controller } from "react-hook-form";

function DropdownSelect({
  name,
  label,
  options,
  placeholder = "Select an option",
  error,
  control,
  className = "",
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 placeholder-gray-200 mb-1">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            className={`w-full py-4 text-purple px-2 bg-background-input placeholder:text-text-lighter rounded-xl shadow-sm focus:ring-purple focus:border-purple ${className}`}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option
                className="text-gray-500"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        )}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}

export default DropdownSelect;
