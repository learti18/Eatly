import React, { useState, useEffect } from "react";
import { Clock, MapPin } from "lucide-react";
import Map, { Marker, NavigationControl, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getDatabase, ref, onValue } from "firebase/database";

export default function UserDeliveryMap({ orderData, mapboxToken }) {
  const [viewState, setViewState] = useState({
    longitude: -122.4194, // Default to San Francisco if no coordinates are available
    latitude: 37.7749,
    zoom: 13,
  });
  const [driverPosition, setDriverPosition] = useState(null);
  const [directionsData, setDirectionsData] = useState(null);
  const [routeDistance, setRouteDistance] = useState(null);
  const [routeDuration, setRouteDuration] = useState(null);
  const [mapError, setMapError] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map to delivery location
  useEffect(() => {
    if (orderData?.latitude && orderData?.longitude) {
      setViewState({
        longitude: parseFloat(orderData.longitude),
        latitude: parseFloat(orderData.latitude),
        zoom: 13,
      });
    }
  }, [orderData]);

  // Listen to driver location updates from Firebase
  useEffect(() => {
    if (!orderData?.driverId) return;

    const db = getDatabase();
    const driverLocationRef = ref(db, `drivers/${orderData.driverId}/location`);

    try {
      const unsubscribe = onValue(
        driverLocationRef,
        (snapshot) => {
          const locationData = snapshot.val();
          if (locationData && locationData.latitude && locationData.longitude) {
            setDriverPosition({
              lat: parseFloat(locationData.latitude),
              lng: parseFloat(locationData.longitude),
            });

            // Only fetch directions if we have valid coordinates
            fetchDirections(locationData.longitude, locationData.latitude);
          }
        },
        (error) => {
          console.error("Firebase error:", error);
          setMapError("Unable to track driver location");
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error("Firebase setup error:", error);
      setMapError("Unable to connect to driver tracking service");
    }
  }, [orderData?.driverId]);

  const fetchDirections = async (driverLng, driverLat) => {
    if (!orderData?.latitude || !orderData?.longitude) return;
    if (!driverLng || !driverLat) return;

    try {
      driverLng = parseFloat(driverLng);
      driverLat = parseFloat(driverLat);
      const destinationLng = parseFloat(orderData.longitude);
      const destinationLat = parseFloat(orderData.latitude);

      // Validate coordinates
      if (
        isNaN(driverLng) ||
        isNaN(driverLat) ||
        isNaN(destinationLng) ||
        isNaN(destinationLat)
      ) {
        console.error("Invalid coordinates for directions");
        return;
      }

      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${driverLng},${driverLat};${destinationLng},${destinationLat}?steps=true&geometries=geojson&access_token=${mapboxToken}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        setDirectionsData(data.routes[0].geometry);
        setRouteDistance(data.routes[0].distance);
        setRouteDuration(data.routes[0].duration);
      } else {
        console.warn("No routes found in directions response");
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
      setMapError("Unable to calculate route to your location");
    }
  };

  const handleMapError = (event) => {
    console.error("Map error:", event);
    setMapError("Error loading map");
  };

  const formatDistance = (meters) => {
    if (!meters) return "Unknown";
    const kilometers = meters / 1000;
    return `${kilometers.toFixed(1)} km away`;
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "Unknown";
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr ${remainingMinutes} min`;
  };

  // Route style for the directions line
  const routeLayer = {
    id: "route",
    type: "line",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#6c5fbc",
      "line-width": 5,
      "line-opacity": 0.8,
    },
  };

  // Check if we have valid coordinates
  const hasValidDeliveryCoordinates =
    orderData?.latitude &&
    orderData?.longitude &&
    !isNaN(parseFloat(orderData.latitude)) &&
    !isNaN(parseFloat(orderData.longitude));

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <MapPin size={18} className="mr-2 text-purple" />
        Delivery Tracking
      </h3>

      {/* {driverPosition ? (
        <div className="mb-4 flex items-center gap-2 px-4 py-3 bg-purple bg-opacity-10 rounded-lg">
          <Clock size={18} className="text-purple" />
          <div>
            <p className="text-gray-700">
              <span className="font-medium">Estimated arrival:</span>{" "}
              <span className="text-purple font-semibold">
                {formatDuration(routeDuration)}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Your driver is {formatDistance(routeDistance)}
            </p>
          </div>
        </div>
      ) : orderData?.orderStatus === "OutForDelivery" ? (
        <div className="mb-4 px-4 py-3 bg-yellow-50 rounded-lg text-sm text-yellow-700">
          Driver is preparing to deliver your order. Please wait...
        </div>
      ) : null} */}

      <div className="relative h-[350px] w-full rounded-lg overflow-hidden border border-gray-200">
        {mapError ? (
          <div className="bg-red-50 h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="text-red-500 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <p className="text-red-800 font-medium">{mapError}</p>
            <p className="text-red-600 mt-2 text-sm">
              Please check your connection or try again later.
            </p>
          </div>
        ) : hasValidDeliveryCoordinates ? (
          <Map
            mapboxAccessToken={mapboxToken}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            style={{ width: "100%", height: "100%" }}
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            onLoad={() => setMapLoaded(true)}
            onError={handleMapError}
          >
            <NavigationControl position="top-right" />

            {/* Delivery destination marker - only render if map is loaded */}
            {mapLoaded && (
              <Marker
                longitude={parseFloat(orderData.longitude)}
                latitude={parseFloat(orderData.latitude)}
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
                  <div className="absolute -mt-10 -ml-2 bg-white px-2 py-1 rounded-lg shadow-md text-xs whitespace-nowrap">
                    Your location
                  </div>
                </div>
              </Marker>
            )}

            {/* Driver location marker - only render if map is loaded and driver position exists */}
            {mapLoaded && driverPosition && (
              <Marker
                longitude={parseFloat(driverPosition.lng)}
                latitude={parseFloat(driverPosition.lat)}
                anchor="center"
              >
                <div className="bg-purple p-2 rounded-full flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="absolute -mt-1 ml-6 bg-white px-2 py-1 rounded-lg shadow-md text-xs whitespace-nowrap">
                  Driver
                </div>
              </Marker>
            )}

            {/* Route between driver and destination */}
            {mapLoaded && directionsData && (
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
          </Map>
        ) : (
          <div className="bg-gray-50 h-full flex items-center justify-center">
            <p className="text-gray-500">No location information available</p>
          </div>
        )}
      </div>

      {driverPosition && (
        <div className="mt-3 px-4 py-2 bg-gray-50 rounded-lg text-sm text-center">
          <p className="text-gray-700">
            Your order is on the way! The driver's location is updated in
            real-time.
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl flex flex-col justify-center p-2 shadow-md">
        <div className="bg-text-dark text-white text-center px-4 py-2 rounded-t-xl">
          <h2>driver@gmail.com</h2>
          <p>+383920982</p>
        </div>
        {driverPosition ? (
          <div className="mb-4 flex items-center gap-2 px-4 py-3 bg-white bg-opacity-10 rounded-lg">
            <div className="flex flex-col">
              <div className="bg-purple-light p-1 rounded-full">
                <Clock size={24} className=" text-purple-dark" />
              </div>
              <div className="h-10 flex flex-col items-center justify-center">
                <div className="w-1 h-1 bg-purple-light rounded-full my-0.5"></div>
                <div className="w-1 h-1 bg-purple-light rounded-full my-0.5"></div>
                <div className="w-1 h-1 bg-purple-light rounded-full my-0.5"></div>
              </div>
              <div className="bg-purple-light p-1 rounded-full">
                <MapPin size={24} className="text-purple-dark" />
              </div>
            </div>
            <div>
              <p className="text-gray-800">
                <span className="font-medium">Estimated arrival:</span>{" "}
                <span className="text-gray-800 font-semibold">
                  {formatDuration(routeDuration)}
                </span>
              </p>
              <p className="text-sm text-gray-800">
                Your driver is {formatDistance(routeDistance)}
              </p>
            </div>
          </div>
        ) : orderData?.orderStatus === "OutForDelivery" ? (
          <div className="mb-4 px-4 py-3 bg-yellow-50 rounded-lg text-sm text-yellow-700">
            Driver is preparing to deliver your order. Please wait...
          </div>
        ) : null}
      </div>
    </div>
  );
}
