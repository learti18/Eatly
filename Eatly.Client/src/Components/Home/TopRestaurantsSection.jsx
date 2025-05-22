import React from "react";
import RestaurantCard from "../Cards/RestaurantCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAllRestaurants } from "../../Queries/Restaurants/useAllRestaurants";

export default function TopRestaurantsSection() {
  const { data: restaurants, isLoading, isError } = useAllRestaurants();
  return (
    <section className="bg-background-main w-full">
      <div className="max-w-7xl mx-auto py-16 flex flex-col border-y-2 border-y-gray-200 px-6">
        <h1 className="text-5xl text-gray-900 font-bold text-center">
          Our Top <span className="text-purple">Restaurants</span>
        </h1>
        <div className="grid grid-cols-1 max-md:max-w-2xl max-md:self-center md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-20">
          {isLoading ? (
            <span className="loading loading-spinner loading-xl"></span>
          ) : isError ? (
            <p>{isError?.message}</p>
          ) : (
            restaurants
              .slice(0, 3)
              .map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))
          )}
        </div>
        <Link
          to="/menu"
          className="flex items-center justify-end mt-16 text-lg text-text-lighter group hover:text-text-light transition-colors duration-300 ease-in-out"
        >
          view all
          <ArrowRight
            className="inline-block ml-2 group-hover:translate-x-1.5 transition-all duration-300 ease-in-out"
            size={16}
          />
        </Link>
      </div>
    </section>
  );
}
