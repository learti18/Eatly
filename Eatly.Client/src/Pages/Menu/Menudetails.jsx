import React from "react";

import { restaurants } from "../../restaurants";
import FoodCard from "../../components/Cards/FoodCard";
import { foods } from "../../foods";
import RestaurantHero from "../../components/Cards/RestaurantHero";
import Accordion from "../../components/Accordion";

export default function Menudetails() {
  return (
    <div className=" bg-background-main flex flex-col items-center ">
      <div className="max-w-7xl px-5 py-15">
        <div className="pb-20  ">
          <RestaurantHero restaurant={restaurants[0]} />
        </div>
        <div className="">
          <h2 className="text-3xl pl-5 pb-20 pt-20 font-bold ">
            Popular <span role="img">🔥</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-15 gap-5  pb-20  ">
            {foods.slice(0, 5).map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>
        <div className="pb-20 border-b-2 border-b-gray-200 ">
          <h2 className="text-3xl pl-5 pb-20 pt-20 font-bold ">Chicken Vegetables</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 pb-25   ">
            {foods.slice(0, 2).map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>

        <div className="pb-20 ">
          <Accordion />
        </div>
      </div>
    </div>
  );
}
