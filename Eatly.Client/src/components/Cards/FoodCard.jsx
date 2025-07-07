import React, { useState, useEffect } from "react";
import Badge from "../Badges/Badge";
import { Link } from "react-router-dom";
import { useAddToCart } from "../../Queries/Cart/useAddToCart";
import { useAddToFavorites } from "../../Queries/Favorites/useAddToFavorites";
import { useRemoveFromFavorites } from "../../Queries/Favorites/useRemoveFromFavorites";
import { useAuth } from "../../Hooks/useAuth";
import { toast } from "sonner";
import { Heart } from "phosphor-react";

export default function FoodCard({ food, restaurantId }) {
  const [dollars, cents] = food.price.toFixed(2).split(".");
  const [isFavorite, setIsFavorite] = useState(food.isFavorite || false);
  const { mutate: addToCart, isPending } = useAddToCart();
  const { mutate: addToFavorites, isPending: isAddingFavorite } =
    useAddToFavorites();
  const { mutate: removeFromFavorites, isPending: isRemovingFavorite } =
    useRemoveFromFavorites();
  const { isAuthenticated } = useAuth();

  const isFavoriteLoading = isAddingFavorite || isRemovingFavorite;

  useEffect(() => {
    setIsFavorite(food.isFavorite || false);
  }, [food.isFavorite]);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please sign in to add favorites");
      return;
    }

    if (isFavorite) {
      removeFromFavorites({ foodId: food.id });
    } else {
      addToFavorites({ foodId: food.id });
    }

    setIsFavorite(!isFavorite);
  };
  const handleAddToCart = (e) => {
    e.preventDefault();
    const foodId = food.id;
    addToCart({ foodId, quantity: 1 });
  };

  return (
    <Link
      to={`/menu/${restaurantId || food.restaurantId}/food/${food.id}`}
      style={{ boxShadow: "0px 60px 35px rgba(0, 0, 0, 0.08)" }}
      className="relative bg-white rounded-4xl py-2 px-4 md:px-5 hover:drop-shadow-xl transition-all duration-300 ease-in-out cursor-pointer border border-gray-100"
    >
      <div
        onClick={handleFavoriteClick}
        className={`absolute top-6 right-6 p-2.5 -m-2.5 hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer group ${
          isFavoriteLoading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <Heart
          size={30}
          className={` ${
            isFavorite
              ? "text-purple fill-purple"
              : "text-gray-700 group-hover:text-purple"
          }`}
          weight={isFavorite ? "fill" : "regular"}
        />
      </div>
      <div className="mt-8 max-w-[300px] flex justify-center items-center mx-auto">
        <img
          src={food.imageUrl}
          alt="food"
          className="w-40 md:w-44 aspect-square rounded-full object-contain"
        />
      </div>
      <Badge type={food.type} />
      <h1 className="capitalize font-semibold text-2xl pt-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {food.name}
      </h1>
      <div className="flex items-center gap-1.5 text-text-light">
        <p>{Math.ceil(food.averagePreparationTime)}min •</p>
        <img src="/star1.svg" alt="rating logo star" className="w-6" />
        <p>4.5</p>
      </div>
      <div className="flex items-center justify-between mt-3 pb-4">
        <p className="text-gray-900 text-xl md:text-2xl font-semibold">
          ${dollars}
          <span className="text-text-light text-base md:text-lg">.{cents}</span>
        </p>
        <button
          onClick={handleAddToCart}
          className="cursor-pointer bg-text-dark text-white text-2xl md:text-3xl px-2 rounded-lg hover:bg-gray-900 transition-colors duration-300 ease-in-out"
        >
          +
        </button>
      </div>
    </Link>
  );
}
