import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FeatureDownloadSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="bg-background-main px-6 py-16">
      <motion.div
        className="max-w-7xl mx-auto flex items-center justify-center flex-col-reverse md:flex-row gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Phone Image */}
        <motion.div
          className="min-md:w-1/2 flex justify-center max-md:max-w-[320px] ml-10"
          variants={imageVariants}
        >
          <motion.img
            src="Mobile.svg"
            alt="mobile version of app"
            whileHover={{
              scale: 1.05,
              y: -10,
              transition: { duration: 0.3 },
            }}
          />
        </motion.div>

        {/* ✅ Arrow for Mobile: between phone and text */}
        <motion.img
          src="lineArrow.svg"
          alt="line arrow"
          className="block md:hidden h-[60px] rotate-[110deg] mb-5 -mt-2 -ml-65"
          initial={{ opacity: 0, rotate: 0 }}
          whileInView={{
            opacity: 1,
            rotate: 110,
            transition: { delay: 0.5, duration: 0.6 },
          }}
          viewport={{ once: true }}
        />

        {/* Text and Button */}
        <motion.div
          className="min-md:w-1/2 flex flex-col items-center md:items-start justify-center relative"
          variants={textVariants}
        >
          <motion.h2
            className="text-center md:text-left text-4xl md:text-5xl font-bold text-gray-900 mb-4 max-w-md"
            variants={itemVariants}
          >
            Premium <span className="text-purple">Quality </span>
            For Your Health
          </motion.h2>
          <motion.ul
            className="text-gray list-disc pl-5 space-y-4 my-10 text-sm md:text-base"
            variants={itemVariants}
          >
            <motion.li
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Premium quality food is made with ingredients that are packed with
              essential vitamins, minerals.
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              These foods promote overall wellness by supporting digestion and
              boosting immunity
            </motion.li>
          </motion.ul>
          <motion.button
            className="bg-purple text-white rounded-[14px] px-6 py-3.5 cursor-pointer group flex items-center"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            Download
            <motion.div
              className="inline ml-3"
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300 ease-in-out" />
            </motion.div>
          </motion.button>

          {/* arrow for desktop under download button */}
          <motion.img
            src="lineArrow.svg"
            alt="line arrow"
            className="hidden md:block ml-35 h-[55px] -mt-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.6, duration: 0.5 },
            }}
            viewport={{ once: true }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
