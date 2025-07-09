import React from "react";
import Badge from "../Badges/Badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function RestaurantCard({ restaurant, index = 0 }) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.1,
      },
    },
  };

  const bookmarkVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <Link
        style={{ boxShadow: "0px 60px 35px rgba(0, 0, 0, 0.08)" }}
        className="bg-white rounded-3xl hover:drop-shadow-xl transition-all duration-300 ease-in-out cursor-pointer block"
        to={`/menu/${restaurant.id}`}
      >
        <div className="overflow-hidden rounded-t-3xl">
          <img
            src={restaurant.imageUrl}
            alt="restaurant banner image"
            className="max-h-[260px] aspect-[16/7] rounded-t-3xl object-cover w-full"
          />
        </div>
        <div className="px-5 py-3 bg-white rounded-b-3xl object-cover">
          <Badge type={restaurant.foodType} />
          <h1 className="font-semibold text-2xl pt-1 capitalize">
            {restaurant.name}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-text-light">
              <p>{Math.ceil(restaurant.averagePreparationTime)}min •</p>
              <img src="/star1.svg" alt="rating logo star" className="w-6" />
              <p>4.5</p>
            </div>
            <motion.div
              className="rounded-full px-[8px] py-[6px] bg-purple-light"
              variants={bookmarkVariants}
              initial="rest"
              whileHover="hover"
            >
              <img src="/BookMark.svg" alt="bookmark logo" className="w-3" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
