import React, { useState, useEffect, useCallback, useRef } from "react";
import { Navigation, Layers } from "lucide-react";
import Map, { Marker, NavigationControl, Source, Layer } from "react-map-gl";
import { toast } from "sonner";
import "mapbox-gl/dist/mapbox-gl.css";
import { getDatabase, ref, set } from "firebase/database";

export default function DeliveryMap({ orderData, mapboxToken }) {
  const [viewState, setViewState] = useState({
    longitude: orderData?.longitude || -122.4194,
    latitude: orderData?.latitude || 37.7749,
    zoom: 14,
  });
  const [currentPosition, setCurrentPosition] = useState(null);
  const [directionsData, setDirectionsData] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [routeDistance, setRouteDistance] = useState(null);
  const [routeDuration, setRouteDuration] = useState(null);
  const [isTrackingLocation, setIsTrackingLocation] = useState(false);
  const lastFetchTimeRef = useRef(null);

  useEffect(() => {
    if (orderData?.latitude && orderData?.longitude) {
      setViewState({
        longitude: orderData.longitude,
        latitude: orderData.latitude,
        zoom: 15,
      });
    }
  }, [orderData]);

  const getDirections = useCallback(async () => {
    if (!currentPosition || !orderData?.latitude || !orderData?.longitude)
      return;

    // Throttle requests to prevent infinite loop - only fetch if 5 seconds have passed
    const now = Date.now();
    if (lastFetchTimeRef.current && now - lastFetchTimeRef.current < 5000) {
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${currentPosition.lng},${currentPosition.lat};${orderData.longitude},${orderData.latitude}?steps=true&geometries=geojson&overview=full&access_token=${mapboxToken}`
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        setDirectionsData(data.routes[0].geometry);
        setRouteDistance(data.routes[0].distance);
        setRouteDuration(data.routes[0].duration);
        setShowDirections(true);

        setViewState((prevViewState) => ({
          ...prevViewState,
          zoom: 12,
        }));
        lastFetchTimeRef.current = now;
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
      toast.error("Could not get directions. Please try again.");
    }
  }, [currentPosition, orderData, mapboxToken]);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newPosition = {
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          };
          setCurrentPosition(newPosition);

          if (isTrackingLocation) {
            setViewState({
              longitude: newPosition.lng,
              latitude: newPosition.lat,
              zoom: 16,
            });
          }

          // Update Firebase location
          const db = getDatabase();
          set(ref(db, `drivers/${orderData.driverId}/location`), {
            latitude: newPosition.lat,
            longitude: newPosition.lng,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [isTrackingLocation, orderData?.driverId]); // Removed getDirections from dependencies

  // Separate effect to handle directions updates with throttling
  useEffect(() => {
    if (
      currentPosition &&
      orderData?.latitude &&
      orderData?.longitude &&
      showDirections
    ) {
      getDirections();
    }
  }, [
    currentPosition,
    orderData?.latitude,
    orderData?.longitude,
    showDirections,
    getDirections,
  ]);

  const formatDistance = (meters) => {
    if (!meters) return "";
    const kilometers = meters / 1000;
    return `${kilometers.toFixed(1)} km`;
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "";
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr ${remainingMinutes} min`;
  };

  const toggleLocationTracking = () => {
    setIsTrackingLocation((prev) => !prev);

    if (!isTrackingLocation && currentPosition) {
      setViewState({
        longitude: currentPosition.lng,
        latitude: currentPosition.lat,
        zoom: 16,
      });
    }
  };

  const routeLayer = {
    id: "route",
    type: "line",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#6c5fbc",
      "line-width": 6,
      "line-opacity": 0.85,
      "line-blur": 0.5,
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Delivery Location</h3>

      {orderData?.latitude && orderData?.longitude && (
        <div className="mb-4 flex flex-wrap gap-3">
          <button
            onClick={getDirections}
            disabled={!currentPosition}
            className="py-2 px-4 bg-purple text-white font-medium rounded-lg flex items-center gap-2 hover:bg-purple-dark transition-colors"
          >
            <Navigation size={16} />
            Get Directions
          </button>

          {showDirections && (
            <div className="py-2 px-4 bg-gray-100 rounded-lg flex items-center gap-3 text-sm">
              <span className="font-semibold">ETA:</span>{" "}
              {formatDuration(routeDuration)}
              <span className="font-semibold">Distance:</span>{" "}
              {formatDistance(routeDistance)}
            </div>
          )}
        </div>
      )}

      <div className="relative h-[350px] w-full rounded-lg overflow-hidden border border-gray-300">
        {orderData?.latitude && orderData?.longitude ? (
          <Map
            mapboxAccessToken={mapboxToken}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            style={{ width: "100%", height: "100%" }}
            {...viewState}
            onMove={(evt) => {
              if (!isTrackingLocation) {
                setViewState(evt.viewState);
              }
            }}
          >
            <NavigationControl position="top-right" />

            {/* Destination marker */}
            <Marker
              longitude={orderData.longitude}
              latitude={orderData.latitude}
              anchor="bottom"
            >
              <div className="text-purple">
                <svg
                  width="23"
                  height="29"
                  viewBox="0 0 37 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.2959 19.1442C11.2959 15.2631 14.4422 12.1167 18.3234 12.1167C22.2045 12.1167 25.3509 15.2631 25.3509 19.1442C25.3509 23.0254 22.2045 26.1717 18.3234 26.1717C14.4422 26.1717 11.2959 23.0254 11.2959 19.1442Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.535256 16.7168C1.27831 7.70229 8.81133 0.764648 17.8564 0.764648H18.7904C27.8355 0.764648 35.3685 7.70229 36.1116 16.7168C36.5117 21.5703 35.0124 26.3897 31.9297 30.1597L21.5657 42.8347C19.8899 44.8841 16.7569 44.8841 15.0812 42.8347L4.71712 30.1597C1.63441 26.3897 0.13519 21.5703 0.535256 16.7168ZM18.3234 8.87329C12.6509 8.87329 8.05242 13.4718 8.05242 19.1442C8.05242 24.8167 12.6509 29.4152 18.3234 29.4152C23.9959 29.4152 28.5943 24.8167 28.5943 19.1442C28.5943 13.4718 23.9959 8.87329 18.3234 8.87329Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </Marker>

            {/* Current location marker */}
            {currentPosition && (
              <Marker
                longitude={currentPosition.lng}
                latitude={currentPosition.lat}
                anchor="center"
              >
                <div className="bg-blue-500 w-4 h-4 rounded-full border-2 border-white shadow-md"></div>
              </Marker>
            )}

            {/* Directions route line */}
            {showDirections && directionsData && (
              <Source
                id="route-source"
                type="geojson"
                data={{
                  type: "Feature",
                  properties: {},
                  geometry: directionsData,
                }}
              >
                <Layer {...routeLayer} />
              </Source>
            )}

            {/* Map controls */}
            <div className="absolute top-4 left-4 bg-white p-2 rounded shadow-md flex flex-col gap-2">
              <button
                onClick={() => setShowDirections(!showDirections)}
                className={`p-2 rounded ${
                  showDirections
                    ? "bg-purple text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                title={showDirections ? "Hide route" : "Show route"}
              >
                <Layers size={16} />
              </button>

              {currentPosition && (
                <button
                  onClick={toggleLocationTracking}
                  className={`p-2 rounded ${
                    isTrackingLocation
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  title={
                    isTrackingLocation
                      ? "Stop following my location"
                      : "Follow my location"
                  }
                >
                  <Navigation size={16} />
                </button>
              )}
            </div>
          </Map>
        ) : (
          <div className="bg-gray-100 h-full flex items-center justify-center">
            <p className="text-gray-500">No location information available</p>
          </div>
        )}
      </div>

      {/* Map information */}
      {showDirections && routeDistance && routeDuration && (
        <div className="mt-3 bg-gray-50 p-3 rounded-lg text-sm">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold text-gray-700">
                Estimated arrival:
              </span>
              <span className="ml-2 text-purple font-medium">
                {formatDuration(routeDuration)}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Distance:</span>
              <span className="ml-2 text-purple font-medium">
                {formatDistance(routeDistance)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
