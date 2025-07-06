import React from "react";

export default function AddressAutocomplete({
  addressInput,
  setAddressInput,
  register,
  errors,
  addressSuggestions,
  selectSuggestion,
  handleAddressInputChange,
  isSearching,
}) {
  return (
    <div className="col-span-1 md:col-span-2 relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Street Address
        {errors.streetAddress && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        className={`mt-1 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple p-2  ${
          errors.streetAddress ? "border-red-500" : ""
        }`}
        placeholder="Start typing for suggestions..."
        value={addressInput}
        onChange={handleAddressInputChange}
      />
      <input
        type="hidden"
        {...register("streetAddress", { required: true })}
        value={addressInput}
      />

      {errors.streetAddress && (
        <p className="mt-1 text-sm text-red-500">Street address is required</p>
      )}

      {/* Suggestions dropdown */}
      {addressSuggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
          {addressSuggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.place_id}-${index}`}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => selectSuggestion(suggestion)}
            >
              {suggestion.display_name}
            </div>
          ))}
        </div>
      )}

      {isSearching && (
        <div className="absolute right-3 top-9">
          <span className="h-4 w-4 block border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></span>
        </div>
      )}
    </div>
  );
}
