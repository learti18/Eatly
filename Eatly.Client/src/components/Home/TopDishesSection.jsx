import { ArrowRight } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FoodCard from "../Cards/FoodCard";
import { useAllFoodsById } from "../../Queries/Foods/useAllFoodsById";
import { motion } from "framer-motion";

export default function TopDishesSection() {
  const [itemCount, setItemCount] = useState(4);
  const restaurantId = 4;
  const { data: foods, foodsLoading, foodsError } = useAllFoodsById(4);

  useEffect(() => {
    const handleResize = () => {
      setItemCount(window.innerWidth >= 1024 ? 5 : 4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-background-main">
      <div className="max-w-7xl mx-auto py-16 px-6 flex flex-col border-b-2 border-b-gray-200">
        <motion.h1
          className="text-5xl text-gray-900 font-bold text-center"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Our Top <span className="text-purple">Dishes</span>
        </motion.h1>
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-5 mx-auto gap-x-5  md:gap-x-7 gap-y-10 mt-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {foodsLoading ? (
            <motion.div
              className="col-span-full text-center text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.span
                className="animate-pulse"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Loading dishes...
              </motion.span>
            </motion.div>
          ) : foodsError ? (
            <motion.div
              className="col-span-full text-center text-red-500"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              Error loading dishes
            </motion.div>
          ) : foods?.length > 0 ? (
            foods.slice(0, itemCount).map((food, index) => (
              <motion.div key={food.id} variants={cardVariants} custom={index}>
                <FoodCard food={food} restaurantId={restaurantId} />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No dishes available
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
