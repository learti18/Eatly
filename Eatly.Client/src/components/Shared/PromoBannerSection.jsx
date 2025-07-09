import React from "react";
import { EmailSubscribeInput } from "../Inputs/EmailSubscribeInput";
import { motion } from "framer-motion";

export default function PromoBannerSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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

  const imageVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-background-main w-full">
      <div className="max-w-7xl mx-auto px-5 pt-16 pb-44">
        <motion.div
          className="flex flex-col justify-center w-full max-md:items-center max-md:text-center relative md:pl-10 gap-5 bg-purple rounded-4xl p-6 min-h-[350px] md:min-h-[280px] md:bg-[url('/foodicons.svg')] bg-no-repeat bg-cover bg-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="space-y-5 max-md:pb-14"
            variants={itemVariants}
          >
            <motion.h1
              className="text-6xl md:text-7xl text-purple-light font-bold"
              variants={textVariants}
              animate={{
                textShadow: [
                  "0 0 0px rgba(219, 217, 238, 0.8)",
                  "0 0 20px rgba(219, 217, 238, 0.8)",
                  "0 0 0px rgba(219, 217, 238, 0.8)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              GET 50%
            </motion.h1>
            <motion.div variants={itemVariants}>
              <EmailSubscribeInput />
            </motion.div>
          </motion.div>
          <motion.img
            src="/FoodImage1.svg"
            alt="Food Icons"
            className="absolute w-52 md:w-64 -bottom-32 md:-bottom-12 max-md:right-0 max-md:left-0 right-20 mx-auto"
            variants={imageVariants}
            animate={{
              y: [0, -10, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
