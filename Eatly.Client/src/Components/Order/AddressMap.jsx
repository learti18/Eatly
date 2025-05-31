import React, { useState, useEffect } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";

const MAPBOX_TOKEN =
  import.meta.env.VITE_APP_MAPBOX_TOKEN || "your_mapbox_token_here";

export default function AddressMap({ position, setPosition, setIsMapLoaded }) {
  const [viewState, setViewState] = useState({
    longitude: position?.lng || -122.4194,
    latitude: position?.lat || 37.7749,
    zoom: 13,
  });

  // Update the view when the position prop changes
  useEffect(() => {
    if (position) {
      setViewState((prev) => ({
        ...prev,
        longitude: position.lng,
        latitude: position.lat,
        zoom: 16,
      }));
    }
  }, [position]);

  return (
    <div className="relative h-[300px] w-full rounded-lg overflow-hidden border border-gray-300">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={{ width: "100%", height: "100%" }}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onClick={(e) => {
          const lngLat = e.lngLat;
          setPosition({ lng: lngLat.lng, lat: lngLat.lat });
        }}
        onLoad={() => setIsMapLoaded(true)}
      >
        <NavigationControl position="top-right" />

        {position && (
          <Marker
            longitude={position.lng}
            latitude={position.lat}
            anchor="bottom"
          >
            <svg
              width="23"
              height="29"
              viewBox="0 0 37 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2959 19.1442C11.2959 15.2631 14.4422 12.1167 18.3234 12.1167C22.2045 12.1167 25.3509 15.2631 25.3509 19.1442C25.3509 23.0254 22.2045 26.1717 18.3234 26.1717C14.4422 26.1717 11.2959 23.0254 11.2959 19.1442Z"
                fill="#323142"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.535256 16.7168C1.27831 7.70229 8.81133 0.764648 17.8564 0.764648H18.7904C27.8355 0.764648 35.3685 7.70229 36.1116 16.7168C36.5117 21.5703 35.0124 26.3897 31.9297 30.1597L21.5657 42.8347C19.8899 44.8841 16.7569 44.8841 15.0812 42.8347L4.71712 30.1597C1.63441 26.3897 0.13519 21.5703 0.535256 16.7168ZM18.3234 8.87329C12.6509 8.87329 8.05242 13.4718 8.05242 19.1442C8.05242 24.8167 12.6509 29.4152 18.3234 29.4152C23.9959 29.4152 28.5943 24.8167 28.5943 19.1442C28.5943 13.4718 23.9959 8.87329 18.3234 8.87329Z"
                fill="#323142"
              />
            </svg>
          </Marker>
        )}
      </Map>

      {!position && (
        <p className="absolute bottom-0 left-0 right-0 text-center bg-orange-100 text-orange-600 p-2 m-2 rounded">
          Please select a location on the map by clicking, or use one of the
          location buttons above.
        </p>
      )}
    </div>
  );
}
