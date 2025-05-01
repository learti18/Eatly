import React from "react";
import RestaurantCard from "../Cards/RestaurantCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { restaurants } from "../../restaurants";

export default function TopRestaurantsSection() {
  return (
    <section className="bg-background-main px-5">
      <div className="max-w-7xl mx-auto py-16 flex flex-col border-y-2 border-y-gray-200">
        <h1 className="text-5xl text-gray-900 font-bold text-center">
          Our Top <span className="text-purple">Restaurants</span>
        </h1>
        <div className="flex flex-row flex-wrap justify-center gap-x-8 gap-y-8 mt-20">
          {restaurants.slice(0, 3).map((restaurant) => (
            <RestaurantCard restaurant={restaurant} />
          ))}
        </div>
        <Link
          to="/restaurants"
          className="flex items-center justify-end min-md:pr-16 mt-16 text-lg text-text-lighter group hover:text-text-light transition-colors duration-300 ease-in-out"
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
