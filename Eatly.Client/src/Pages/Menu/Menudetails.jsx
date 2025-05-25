import React, { useEffect, useState } from "react";
import FoodCard from "../../components/Cards/FoodCard";
import RestaurantHero from "../../components/Cards/RestaurantHero";
import Accordion from "../../components/Accordion";
import { useParams } from "react-router-dom";
import { useRestaurantById } from "../../Queries/Restaurants/useRestaurantById";
import { useAllFoodsById } from "../../Queries/Foods/useAllFoodsById";

export default function Menudetails() {
  const { id } = useParams();
  const {
    data: restaurant,
    isLoading: restaurantLoading,
    isError: isRestaurantError,
  } = useRestaurantById(id);
  const { data: foods, isLoading, isError } = useAllFoodsById(id);

  return (
    <div className=" bg-background-main ">
      <div className="max-w-7xl mx-auto px-5 py-20">
        <div className="pb-10  ">
          {restaurantLoading ? (
            <span className="loading loading-spinner loading-xl"></span>
          ) : isRestaurantError ? (
            <p>{isError.message}</p>
          ) : (
            <RestaurantHero restaurant={restaurant} />
          )}
        </div>
        <div className="">
          <h2 className="text-3xl pb-10 pt-20 font-semibold ">
            Popular <span role="img">🔥</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-15 gap-5  pb-20  ">
            {isLoading ? (
              <span className="loading loading-spinner loading-xl"></span>
            ) : isError ? (
              <p>{isError.message}</p>
            ) : (
              foods.map((food) => <FoodCard key={food.id} food={food} />)
            )}
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
