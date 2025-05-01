import React from "react";
import Badge from "../Badges/Badge";

export default function RestaurantCard({ restaurant }) {
  return (
    <div
      style={{ boxShadow: "0px 25px 30px rgba(0, 0, 0, 0.08)" }}
      className="bg-white rounded-3xl hover:drop-shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
    >
      <img
        src={restaurant.image}
        alt="restaurant banner image"
        className="max-h-[160px] aspect-[16/7] rounded-t-3xl object-cover w-full"
      />
      <div className="px-5 py-3">
        <Badge type={restaurant.type} />
        <h1 className="font-semibold text-2xl pt-1">{restaurant.name}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-text-light">
            <p>{restaurant.deliveryTime}min •</p>
            <img src="star1.svg" alt="rating logo star" className="w-6" />
            <p>{restaurant.rating}</p>
          </div>
          <div className="rounded-full px-[8px] py-[6px] bg-purple-light">
            <img src="BookMark.svg" alt="bookmark logo" className="w-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
