import React from "react";

export default function FormActions({ position, setIsAddingNewAddress }) {
  return (
    <div className="flex space-x-3">
      <button
        type="button"
        onClick={() => setIsAddingNewAddress(false)}
        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={!position}
        className={`px-4 py-2 rounded-lg ${
          !position
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-purple text-white hover:bg-purple-dark"
        }`}
      >
        Save Address
      </button>
    </div>
  );
}
