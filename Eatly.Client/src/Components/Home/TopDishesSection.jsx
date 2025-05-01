import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import FoodCard from "../Cards/FoodCard";
import { foods } from "./../../foods";

export default function TopDishesSection() {
  return (
    <section className="bg-background-main px-5">
      <div className="max-w-7xl mx-auto py-16 flex flex-col border-b-2 border-b-gray-200">
        <h1 className="text-5xl text-gray-900 font-bold text-center">
          Our Top <span className="text-purple">Dishes</span>
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-5 justify-center gap-x-7 gap-y-8 mt-20">
          {foods.slice(0, 5).map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
        <Link
          to="/restaruants/{id}/dishes"
          className="flex items-center justify-end min-md:pr-12 mt-16 text-lg text-text-lighter group hover:text-text-light transition-colors duration-300 ease-in-out"
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
