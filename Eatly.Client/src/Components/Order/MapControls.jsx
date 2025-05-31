import React from "react";
import { MapPin } from "lucide-react";

export default function MapControls({
  useCurrentLocation,
  searchAddressOnMap,
  getCurrentLocation,
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      <button
        type="button"
        onClick={searchAddressOnMap}
        className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      >
        {useCurrentLocation ? (
          <span className="flex items-center">
            <span className="h-4 w-4 mr-2 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></span>
            Searching...
          </span>
        ) : (
          <>
            <MapPin size={16} className="mr-1" /> Find Address on Map
          </>
        )}
      </button>
      <button
        type="button"
        onClick={getCurrentLocation}
        className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        disabled={useCurrentLocation}
      >
        {useCurrentLocation ? (
          <span className="flex items-center">
            <span className="h-4 w-4 mr-2 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></span>
            Getting Location...
          </span>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Use My Current Location
          </>
        )}
      </button>
    </div>
  );
}
