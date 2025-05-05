import React from "react";

import { restaurants } from "../../restaurants";
import FoodCard from "../../components/Cards/FoodCard";
import { foods } from "../../foods";
import RestaurantHero from "../../components/Cards/RestaurantHero";
import Accordion from "../../components/Accordion";

export default function Menudetails() {
  return (
    <div className=" bg-background-main min-h-screen flex flex-col items-center ">
      <div className="max-w-7xl">
        <div className="px-8 py-15 pb-40  ">
          <RestaurantHero restaurant={restaurants[0]} />
        </div>
        <div className="p-6 bg-gray-50 min-h-screen ">
          <h2 className="text-2xl pl-5 pb-9 font-bold ">
            Popular <span role="img">🔥</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4  ">
            {foods.slice(0, 5).map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>
        <div>
          <div className="p-6 bg-gray-50 min-h-screen ">
            <h2 className="text-2xl pl-5 pb-9 font-bold ">
              Chicken Vegetables
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4   ">
              {foods.slice(0, 2).map((food) => (
                <FoodCard key={food.id} food={food} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="pb-20 ">
        <Accordion />
        </div>
      </div>
    </div>
  );
}
