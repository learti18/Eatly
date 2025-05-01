import React from "react";
import Badge from "../Badges/Badge";
import { Link } from "react-router-dom";

export default function FoodCard({ food }) {
  const [dollars, cents] = food.price.toFixed(2).split(".");

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    console.log("Added to favorites!");
  };
  const handleAddToCart = (e) => {
    e.preventDefault();
    console.log("Added to cart!");
  };

  return (
    <Link
      to="/restaurants/1/dishes/1"
      style={{ boxShadow: "0px 25px 30px rgba(0, 0, 0, 0.08)" }}
      className="relative bg-white rounded-[34.58px] py-2 px-5"
    >
      <div
        className="absolute top-6 right-6 p-2.5 -m-2.5 hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer group"
        onClick={handleFavoriteClick}
      >
        <svg
          width="28"
          height="25"
          viewBox="0 0 23 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.363281 6.66277C0.363281 3.27527 3.33513 0.666992 6.82344 0.666992C8.62159 0.666992 10.2039 1.51012 11.3393 2.60107C12.4747 1.51012 14.057 0.666992 15.8551 0.666992C19.3434 0.666992 22.3153 3.27527 22.3153 6.66277C22.3153 8.98325 21.3257 11.0239 19.9547 12.7488C18.5861 14.4707 16.7959 15.9322 15.0818 17.1197C14.427 17.5732 13.7647 17.9917 13.1585 18.3004C12.5893 18.5903 11.9348 18.8558 11.3393 18.8558C10.7438 18.8558 10.0893 18.5903 9.52007 18.3004C8.91388 17.9917 8.25153 17.5732 7.59682 17.1197C5.88271 15.9322 4.09245 14.4707 2.72384 12.7488C1.35285 11.0239 0.363281 8.98325 0.363281 6.66277ZM6.82344 2.54859C4.21523 2.54859 2.24488 4.4667 2.24488 6.66277C2.24488 8.42332 2.99224 10.0625 4.19684 11.578C5.40382 13.0966 7.02782 14.4365 8.66835 15.573C9.28912 16.003 9.87382 16.369 10.374 16.6237C10.9111 16.8972 11.2222 16.9742 11.3393 16.9742C11.4564 16.9742 11.7675 16.8972 12.3046 16.6237C12.8048 16.369 13.3895 16.003 14.0102 15.573C15.6508 14.4365 17.2748 13.0966 18.4817 11.578C19.6863 10.0625 20.4337 8.42332 20.4337 6.66277C20.4337 4.4667 18.4633 2.54859 15.8551 2.54859C14.3572 2.54859 12.9585 3.44351 12.0851 4.57937C11.907 4.81098 11.6314 4.94671 11.3393 4.94671C11.0471 4.94671 10.7715 4.81098 10.5935 4.57937C9.72011 3.44351 8.32139 2.54859 6.82344 2.54859Z"
            fill="#111827"
            className="transition-colors duration-300 group-hover:fill-purple"
          />
        </svg>
      </div>
      <div className="max-w-[250px] pt-8 flex justify-center items-center mx-auto">
        <img src={food.image} alt="food" className="rounded-lg" />
      </div>
      <Badge type={food.type} />
      <h1 className="font-semibold text-2xl pt-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {food.name}
      </h1>
      <div className="flex items-center gap-1.5 text-text-light">
        <p>{food.deliveryTime}min •</p>
        <img src="star1.svg" alt="rating logo star" className="w-6" />
        <p>{food.rating}</p>
      </div>
      <div className="flex items-center justify-between mt-4 pb-6">
        <p className="text-gray-900 text-2xl font-semibold pt-2">
          ${dollars}
          <span className="text-text-light text-lg">.{cents}</span>
        </p>
        <button
          onClick={handleAddToCart}
          className="cursor-pointer bg-text-dark text-white text-4xl px-2 rounded-[9px] hover:bg-gray-900 transition-colors duration-300 ease-in-out"
        >
          +
        </button>
      </div>
    </Link>
  );
}
