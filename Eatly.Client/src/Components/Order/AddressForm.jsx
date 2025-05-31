import React, { useState, useEffect, useRef } from "react";
import FormInput from "../Forms/FormInput";
import { toast } from "sonner";

// Import the separated components
import AddressAutocomplete from "./AddressAutocomplete";
import MapControls from "./MapControls";
import AddressMap from "./AddressMap";
import FormActions from "./FormActions";
import useAddressSuggestions from "../../hooks/useAddressSuggestions";

export default function AddressForm({
  register,
  errors,
  handleSubmit,
  onAddressSubmit,
  setIsAddingNewAddress,
  setValue,
  getValues,
}) {
  const [position, setPosition] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const mapRef = useRef(null);

  // Use custom hook for address autocomplete
  const {
    addressSuggestions,
    isSearching,
    addressInput,
    setAddressInput,
    handleAddressInputChange,
    setAddressSuggestions,
  } = useAddressSuggestions(setValue);

  // Update hidden form fields when the position changes
  useEffect(() => {
    if (position) {
      setValue("latitude", position.lat);
      setValue("longitude", position.lng);
    }
  }, [position, setValue]);

  // Select suggestion from dropdown
  const selectSuggestion = (suggestion) => {
    if (suggestion.address) {
      // For street address, combine house number and road if available
      const houseNumber = suggestion.address.house_number || "";
      const road = suggestion.address.road || "";
      const streetAddress = `${houseNumber} ${road}`.trim();
      setValue(
        "streetAddress",
        streetAddress || suggestion.display_name.split(",")[0]
      );

      // Set city, state, zip if available
      setValue(
        "city",
        suggestion.address.city ||
          suggestion.address.town ||
          suggestion.address.village ||
          ""
      );
      setValue("state", suggestion.address.state || "");
      setValue("zipCode", suggestion.address.postcode || "");
    }

    // Update position and map view
    setPosition({
      lat: parseFloat(suggestion.lat),
      lng: parseFloat(suggestion.lon),
    });

    // Clear suggestions and update input field
    setAddressInput(suggestion.display_name.split(",")[0]);
    setAddressSuggestions([]);
  };

  // Get user's current location
  const getCurrentLocation = () => {
    setUseCurrentLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition({ lat: latitude, lng: longitude });

          // Use Mapbox reverse geocoding API to get address from coordinates
          const mapboxToken = import.meta.env.VITE_APP_MAPBOX_TOKEN;
          if (mapboxToken && isMapLoaded) {
            fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxToken}&types=address&limit=1`
            )
              .then((response) => response.json())
              .then((data) => {
                if (data.features && data.features.length > 0) {
                  const address = data.features[0];
                  const addressParts = address.place_name
                    .split(",")
                    .map((part) => part.trim());

                  if (addressParts.length >= 1) {
                    setAddressInput(addressParts[0]);
                    setValue("streetAddress", addressParts[0]);
                  }

                  // Extract additional address components if available
                  if (address.context) {
                    // Try to extract city, state, zip from context
                    address.context.forEach((item) => {
                      const id = item.id.split(".")[0];
                      if (id === "place") setValue("city", item.text);
                      else if (id === "region") setValue("state", item.text);
                      else if (id === "postcode")
                        setValue("zipCode", item.text);
                    });
                  }
                }
              })
              .catch((err) => console.error("Error in reverse geocoding:", err))
              .finally(() => {
                setUseCurrentLocation(false);
              });
          } else {
            // Make sure to reset loading state even if no geocoding is done
            setUseCurrentLocation(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Could not get your location. Please enter it manually.");
          setUseCurrentLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setUseCurrentLocation(false);
    }
  };

  // Try to get approximate location from address fields
  const searchAddressOnMap = () => {
    const { streetAddress, city, state, zipCode } = getValues();

    if (!streetAddress || !city || !state) {
      toast.warning(
        "Please fill in at least the street address, city, and state fields"
      );
      return;
    }

    setUseCurrentLocation(true);
    const searchQuery = `${streetAddress}, ${city}, ${state} ${zipCode}`;
    const mapboxToken = import.meta.env.VITE_APP_MAPBOX_TOKEN;

    if (mapboxToken) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery
        )}.json?access_token=${mapboxToken}&limit=1`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.features && data.features.length > 0) {
            const feature = data.features[0];
            const [lng, lat] = feature.center;
            setPosition({
              lng,
              lat,
            });
            toast.success("Address found on map!");
          } else {
            toast.error(
              "No location found for this address. Try being more specific or select manually on the map."
            );
          }
        })
        .catch((error) => {
          console.error("Error searching for address:", error);
          toast.error("Error finding address: " + error.message);
        })
        .finally(() => {
          // Always reset loading state
          setUseCurrentLocation(false);
        });
    } else {
      toast.error("Mapbox token not found. Please check your configuration.");
      setUseCurrentLocation(false);
    }
  };

  // Add hidden fields for coordinates
  const additionalFormFields = (
    <>
      <input type="hidden" {...register("latitude")} />
      <input type="hidden" {...register("longitude")} />
    </>
  );

  return (
    <div className="shadow-sm bg-white rounded-b-xl border-t border-gray-100 p-6 mb-8">
      <h4 className="font-medium mb-4 text-lg">Add New Address</h4>
      <form onSubmit={handleSubmit(onAddressSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <AddressAutocomplete
            addressInput={addressInput}
            setAddressInput={setAddressInput}
            register={register}
            errors={errors}
            addressSuggestions={addressSuggestions}
            selectSuggestion={selectSuggestion}
            handleAddressInputChange={handleAddressInputChange}
            isSearching={isSearching}
          />

          <FormInput
            label="City"
            name="city"
            register={register}
            errors={errors}
            required={true}
          />
          <FormInput
            label="State"
            name="state"
            register={register}
            errors={errors}
            required={true}
          />
          <FormInput
            label="ZIP Code"
            name="zipCode"
            register={register}
            errors={errors}
            required={true}
          />
          <FormInput
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            register={register}
            errors={errors}
            required={true}
          />
          {additionalFormFields}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Location on Map
          </label>

          <MapControls
            useCurrentLocation={useCurrentLocation}
            searchAddressOnMap={searchAddressOnMap}
            getCurrentLocation={getCurrentLocation}
          />

          <AddressMap
            position={position}
            setPosition={setPosition}
            setIsMapLoaded={setIsMapLoaded}
            mapRef={mapRef}
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-purple focus:ring-purple border-gray-300 rounded"
              {...register("isDefault")}
            />
            <span className="ml-2 text-sm text-gray-700">
              Set as default address
            </span>
          </label>
        </div>

        <FormActions
          position={position}
          setIsAddingNewAddress={setIsAddingNewAddress}
        />
      </form>
    </div>
  );
}
