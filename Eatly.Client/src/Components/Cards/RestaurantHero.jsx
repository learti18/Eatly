import React from "react";
import Badge from "../Badges/Badge";
import { Link } from "react-router-dom";

export default function RestaurantHero({ restaurant }) {
  return (
    <Link
      style={{ boxShadow: "0px 60px 35px rgba(0, 0, 0, 0.08)" }}
      className="bg-white rounded-3xl hover:drop-shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
      to="/menu/1"
    >
      <img
        src={restaurant?.imageUrl}
        alt="restaurant banner image"
        className="max-h-[260px] aspect-[16/7] rounded-t-3xl object-cover w-full"
      />
      <div className="px-5 py-3 pt-5 pb-5 bg-white  rounded-b-3xl object-cover md:flex items-center justify-between ">
        <div className="md:hidden">
          <Badge type={restaurant.type} />
        </div>
        <h1 className="font-semibold text-3xl pt-1">{restaurant.name}</h1>
        <div className="hidden md:flex items-center gap-1 text-text-light">
          <p>25min •</p>
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
    </Link>
  );
}
