import React from "react";
import Badge from "../Badges/Badge";
import { Link, useNavigate } from "react-router-dom";

export default function RestaurantHero({ restaurant }) {
  const navigate = useNavigate();
  return (
    <div
      style={{ boxShadow: "0px 60px 35px rgba(0, 0, 0, 0.08)" }}
      className="bg-white rounded-3xl hover:drop-shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
      onClick={() => navigate(`/menu/${restaurant.id}`)}
    >
      <img
        src={restaurant?.imageUrl}
        alt="restaurant banner image"
        className="max-h-60 md:max-h-80 aspect-[16/7] rounded-t-3xl object-cover w-full"
      />
      <div className="px-5 py-3.5 md:py-5 md:px-8 bg-white  rounded-b-3xl object-cover md:flex items-center justify-between ">
        <div className="md:hidden">
          <Badge type={restaurant.foodType} />
        </div>
        <h1 className="font-semibold text-2xl md:text-3xl">
          {restaurant.name}
        </h1>
        <div className="hidden md:flex items-center gap-1 text-text-light">
          <p>{Math.round(restaurant.averagePreparationTime)}min •</p>
          <img src="/star1.svg" alt="rating logo star" className="w-6" />
          <p>4.5</p>
        </div>
        <div className="hidden md:block bg-purple-light px-2.5 py-2 rounded-full">
          <img src="/BookMark.svg" alt="bookmark logo" className="w-4" />
        </div>
        <div className="flex md:hidden items-center justify-between">
          <div className="flex items-center gap-1 text-text-light">
            <p>25min •</p>
            <img src="/star1.svg" alt="rating logo star" className="w-6" />
            <p>4.5</p>
          </div>
          <div className="rounded-full px-2.5 py-2 bg-purple-light">
            <img src="/BookMark.svg" alt="bookmark logo" className="w-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
