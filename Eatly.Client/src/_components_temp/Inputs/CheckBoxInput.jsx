import React from "react";
import { Controller } from "react-hook-form";

export default function CheckboxInput({ control, name, value, label, id }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        // Ensure we have an array for selectedValues
        const { value: fieldValue = [], onChange } = field;
        const selectedValues = Array.isArray(fieldValue) ? fieldValue : [];

        // Check if the current value is in the selectedValues array
        const isChecked = selectedValues.includes(value);

        const handleCheckboxChange = (e) => {
          if (e.target.checked) {
            // Only add the value if it's not already present
            if (!selectedValues.includes(value)) {
              onChange([...selectedValues, value]);
            }
          } else {
            // Remove the value if unchecked
            onChange(selectedValues.filter((val) => val !== value));
          }
        };

        return (
          <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <input
              type="checkbox"
              id={id}
              value={value}
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="w-5 h-5 text-purple border-gray-300 rounded-sm focus:ring-purple accent-purple"
            />
            <label
              htmlFor={id}
              className="ml-3 text-gray-700 text-md font-medium cursor-pointer flex-1"
            >
              {label}
            </label>
          </div>
        );
      }}
    />
  );
}
