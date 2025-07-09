import React from "react";
import RestaurantCard from "../Cards/RestaurantCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAllRestaurants } from "../../Queries/Restaurants/useAllRestaurants";
import { motion } from "framer-motion";

export default function TopRestaurantsSection() {
  const { data: restaurants, isLoading, isError } = useAllRestaurants();

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="bg-background-main w-full">
      <div className="max-w-7xl mx-auto py-16 flex flex-col border-y-2 border-y-gray-200 px-6">
        <motion.h1
          className="text-5xl text-gray-900 font-bold text-center"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Our Top <span className="text-purple">Restaurants</span>
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 max-md:max-w-2xl max-md:self-center md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {isLoading ? (
            <motion.span
              className="loading loading-spinner loading-xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            ></motion.span>
          ) : isError ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {isError?.message}
            </motion.p>
          ) : (
            restaurants.items
              .slice(0, 3)
              .map((restaurant, index) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  index={index}
                />
              ))
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            to="/menu"
            className="flex items-center justify-end mt-16 text-lg text-text-lighter group hover:text-text-light transition-colors duration-300 ease-in-out"
          >
            view all
            <ArrowRight
              className="inline-block ml-2 group-hover:translate-x-1.5 transition-all duration-300 ease-in-out"
              size={16}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
