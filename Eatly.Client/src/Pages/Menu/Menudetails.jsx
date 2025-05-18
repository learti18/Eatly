import React, { useEffect, useState } from "react";

import { restaurants } from "../../restaurants";
import FoodCard from "../../components/Cards/FoodCard";
import RestaurantHero from "../../components/Cards/RestaurantHero";
import Accordion from "../../components/Accordion";
import api from "../../Services/Api";

export default function Menudetails() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await api.get("/restaurants/2/foods");

        setFoods(response.data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div className=" bg-background-main ">
      <div className="max-w-7xl mx-auto px-5 py-15">
        <div className="pb-20  ">
          <RestaurantHero restaurant={restaurants[0]} />
        </div>
        <div className="">
          <h2 className="text-3xl pl-5 pb-20 pt-20 font-bold ">
            Popular <span role="img">🔥</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-15 gap-5  pb-20  ">
            {foods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>
        {/* <div className="pb-20 border-b-2 border-b-gray-200 ">
          <h2 className="text-3xl pl-5 pb-20 pt-20 font-bold ">
            Chicken Vegetables
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 pb-25   ">
            {foods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div> */}

        <div className="pb-20 ">
          <Accordion />
        </div>
      </div>
    </div>
  );
}
