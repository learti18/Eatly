import React, { useState, useEffect } from "react";
import Badge from "../Badges/Badge";
import { Link } from "react-router-dom";
import { useAddToCart } from "../../Queries/Cart/useAddToCart";
import { useAddToFavorites } from "../../Queries/Favorites/useAddToFavorites";
import { useRemoveFromFavorites } from "../../Queries/Favorites/useRemoveFromFavorites";
import { useAuth } from "../../Hooks/useAuth";
import { toast } from "sonner";
import { Heart } from "phosphor-react";
import { motion } from "framer-motion";

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const heartVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.2 },
    tap: { scale: 0.9 },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: { scale: 0.9 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div whileHover="hover" whileTap="tap" initial="rest">
        <Link
          to={`/menu/${restaurantId || food.restaurantId}/food/${food.id}`}
          style={{ boxShadow: "0px 60px 35px rgba(0, 0, 0, 0.08)" }}
          className="relative bg-white rounded-4xl py-2 px-4 md:px-5 hover:drop-shadow-xl active:scale-95 transition-all duration-300 ease-in-out cursor-pointer border border-gray-100 block"
        >
          <motion.div
            onClick={handleFavoriteClick}
            className={`absolute top-6 right-6 p-2.5 -m-2.5 hover:scale-110 active:scale-95 transition-transform duration-200 ease-in-out cursor-pointer group ${
              isFavoriteLoading
                ? "opacity-50 pointer-events-none animate-pulse"
                : ""
            }`}
            variants={heartVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Heart
              size={30}
              className={`transition-colors duration-200 ${
                isFavorite
                  ? "text-purple fill-purple"
                  : "text-gray-700 group-hover:text-purple group-active:text-purple"
              }`}
              weight={isFavorite ? "fill" : "regular"}
            />
          </motion.div>
          <motion.div className="mt-8 max-w-[300px] flex justify-center items-center mx-auto">
            <img
              src={food.imageUrl}
              alt="food"
              className="w-40 md:w-44 aspect-square rounded-full object-contain"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            viewport={{ once: true }}
          >
            <Badge type={food.type} />
          </motion.div>
          <motion.h1
            className="capitalize font-semibold text-2xl pt-1 overflow-hidden text-ellipsis whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            viewport={{ once: true }}
          >
            {food.name}
          </motion.h1>
          <motion.div
            className="flex items-center gap-1.5 text-text-light"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            viewport={{ once: true }}
          >
            <p>{Math.ceil(food.averagePreparationTime)}min •</p>
            <img src="/star1.svg" alt="rating logo star" className="w-6" />
            <p>4.5</p>
          </motion.div>
          <motion.div
            className="flex items-center justify-between mt-3 pb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-900 text-xl md:text-2xl font-semibold">
              ${dollars}
              <span className="text-text-light text-base md:text-lg">
                .{cents}
              </span>
            </p>
            <button
              onClick={handleAddToCart}
              disabled={isPending}
              className={`cursor-pointer bg-text-dark text-white text-2xl md:text-3xl px-2 rounded-lg hover:bg-gray-900 active:scale-90 transition-all duration-200 ease-in-out ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isPending ? (
                <div className="flex items-center justify-center px-1 py-2.5">
                  <motion.span
                    className="loading loading-spinner loading-xs"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  ></motion.span>
                </div>
              ) : (
                "+"
              )}
            </button>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
