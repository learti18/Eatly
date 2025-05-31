import { useState, useRef } from "react";

export default function useAddressSuggestions(setValue) {
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [addressInput, setAddressInput] = useState("");
  const debounceTimerRef = useRef(null);

  const handleAddressInputChange = (e) => {
    const value = e.target.value;
    setAddressInput(value);
    setValue("streetAddress", value); 

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!value || value.length < 3) {
      setAddressSuggestions([]);
      return;
    }

    setIsSearching(true);
    debounceTimerRef.current = setTimeout(() => {
      fetchAddressSuggestions(value);
    }, 500);
  };

  const fetchAddressSuggestions = (query) => {
    const mapboxToken = import.meta.env.VITE_APP_MAPBOX_TOKEN;

    if (!mapboxToken) {
      console.error("Mapbox token not found. Please check your configuration.");
      setIsSearching(false);
      return;
    }

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?access_token=${mapboxToken}&types=address&limit=5`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Transform Mapbox results to match our expected format
        const suggestions = data.features.map((feature) => ({
          place_id: feature.id,
          display_name: feature.place_name,
          lat: feature.center[1],
          lon: feature.center[0],
          address: extractAddressComponents(feature),
        }));

        setAddressSuggestions(suggestions);
      })
      .catch((error) => {
        console.error("Error fetching address suggestions:", error);
        setAddressSuggestions([]);
      })
      .finally(() => {
        // Always reset loading state, even on error
        setIsSearching(false);
      });
  };

  // Helper function to extract address components from Mapbox feature
  const extractAddressComponents = (feature) => {
    const addressComponents = {};

    // Extract street address from the text property
    const nameParts = feature.text.split(" ");
    if (nameParts.length > 0) {
      // First part might be the house number
      if (/^\d+$/.test(nameParts[0])) {
        addressComponents.house_number = nameParts[0];
        addressComponents.road = nameParts.slice(1).join(" ");
      } else {
        addressComponents.road = feature.text;
      }
    }

    // Extract other components from context
    if (feature.context) {
      feature.context.forEach((contextItem) => {
        const id = contextItem.id.split(".")[0];

        switch (id) {
          case "place":
            addressComponents.city = contextItem.text;
            break;
          case "region":
            addressComponents.state = contextItem.text;
            break;
          case "postcode":
            addressComponents.postcode = contextItem.text;
            break;
          case "country":
            addressComponents.country = contextItem.text;
            break;
          default:
            break;
        }
      });
    }

    return addressComponents;
  };

  return {
    addressSuggestions,
    isSearching,
    addressInput,
    setAddressInput,
    handleAddressInputChange,
    setAddressSuggestions,
  };
}
