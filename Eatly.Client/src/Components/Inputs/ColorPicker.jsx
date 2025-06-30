import React, { useState, useEffect } from "react";

const predefinedColors = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#96CEB4", // Green
  "#FFEAA7", // Yellow
  "#DDA0DD", // Plum
  "#98D8C8", // Mint
  "#F7DC6F", // Light Yellow
  "#BB8FCE", // Light Purple
  "#85C1E9", // Light Blue
  "#F8C471", // Orange
  "#82E0AA", // Light Green
];

function ColorPicker({
  register,
  name,
  label,
  error,
  defaultValue = "#FF6B6B",
  setValue,
}) {
  const [selectedColor, setSelectedColor] = useState(defaultValue);
  const [customColor, setCustomColor] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  // Update form value when selectedColor changes
  useEffect(() => {
    if (setValue) {
      setValue(name, selectedColor);
    }
  }, [selectedColor, setValue, name]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setUseCustom(false);
    setCustomColor("");
  };

  const handleCustomColorChange = (e) => {
    const color = e.target.value;
    setCustomColor(color);
    setSelectedColor(color);
    setUseCustom(true);
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* Hidden input for form registration */}
      <input type="hidden" {...register(name, { value: selectedColor })} />

      {/* Color Preview */}
      <div className="mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg border-2 border-gray-300"
            style={{ backgroundColor: selectedColor }}
          ></div>
          <span className="text-sm text-gray-600 font-medium">
            {selectedColor}
          </span>
        </div>
      </div>

      {/* Predefined Colors */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Choose a color:</p>
        <div className="grid grid-cols-6 gap-2">
          {predefinedColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleColorSelect(color)}
              className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                selectedColor === color && !useCustom
                  ? "border-gray-800 shadow-lg"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Custom Color Input */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Or pick a custom color:</p>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={customColor || selectedColor}
            onChange={handleCustomColorChange}
            className="w-10 h-8 rounded border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={useCustom ? customColor : selectedColor}
            onChange={(e) => {
              const color = e.target.value;
              if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
                setCustomColor(color);
                setSelectedColor(color);
                setUseCustom(true);
              }
            }}
            placeholder="#FFFFFF"
            className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}

export default ColorPicker;
