import { createContext, useContext, useEffect, useState } from "react";
import { useRestaurantByUserId } from "../Queries/Restaurants/useRestaurantByUserId";
import { Outlet } from "react-router-dom";

const RestaurantContext = createContext();

export const RestaurantProvider = () => {
  const { data, isLoading, isError, error } = useRestaurantByUserId();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    console.log("Restaurant data in context:", data);
    if (data) {
      setRestaurant(data);
    }
  }, [data]);

  return (
    <RestaurantContext.Provider
      value={{ restaurant, isLoading, isError, error }}
    >
      <Outlet />
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => useContext(RestaurantContext);
