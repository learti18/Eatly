import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function HeroSection() {
  const navigate = useNavigate();

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
    hidden: { opacity: 0, scale: 0.8, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <section className="bg-background-main min-h-screen w-full flex items-center py-14">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex gap-5 flex-col lg:flex-row">
          <motion.div
            className="w-6/12 max-lg:w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col items-center lg:items-start w-full font-semibold">
              <motion.div
                variants={itemVariants}
                className="flex mx-auto md:mx-0 gap-5 leading-tight text-text-dark md:text-gray-300 tracking-[2px]"
              >
                <motion.div
                  className="shrink-0 my-auto h-px border border-solid border-text-dark md:border-gray-300 w-[54px]"
                  initial={{ width: 0 }}
                  animate={{ width: 54 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                <p>OVER 1000 USERS</p>
              </motion.div>
              <motion.h2
                variants={itemVariants}
                className="self-stretch mt-5 responsive-text tracking-tighter leading-tight  text-center lg:text-left text-stone-900"
              >
                Enjoy Foods All
                <br />
                Over The <span className="text-purple">World</span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="mt-4 font-light text-sm  md:text-lg text-center lg:text-left leading-7 opacity-70 text-stone-500"
              >
                EatLy help you set saving goals, earn cash back offers, Go to
                disclaimer for more details and get paychecks up to two days
                early. Get a{" "}
                <span className="font-medium text-purple">$20 bonus</span>.
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex justify-center gap-5 mt-14 text-base font-medium tracking-normal"
              >
                <motion.button
                  onClick={() => navigate("/menu")}
                  className="px-8 py-3.5 bg-purple rounded-xl cursor-pointer text-white hover:bg-purple-dark active:bg-purple-darker transition-colors duration-200 ease-in-out"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Get Started
                </motion.button>
                <motion.button
                  onClick={() => navigate("/about")}
                  className="px-8 py-3.5 bg-white rounded-xl cursor-pointer text-purple border border-2-purple hover:bg-purple-50 active:bg-purple-50 hover:text-purple-darker transition-colors duration-200 ease-in-out"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  About us
                </motion.button>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex justify-center lg:justify-start items-center gap-2 mt-10"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.2139 8.05296H13.2107L10.747 0.443359L8.26882 8.05296L0.265625 8.03838L6.73816 12.747L4.25993 20.3566L10.7325 15.648L17.205 20.3566L14.7414 12.747L21.2139 8.05296Z"
                    fill="#00B67A"
                  />
                </svg>
                <h2 className="text-text-darker text-xl">Trustpilot</h2>
                <div className="rating pl-3">
                  <div
                    className="mask mask-star bg-amber-400"
                    aria-label="1 star"
                  ></div>
                  <div
                    className="mask mask-star bg-amber-400"
                    aria-label="2 star"
                  ></div>
                  <div className="mask mask-star bg-amber-400"></div>
                  <div
                    className="mask mask-star bg-amber-400"
                    aria-label="4 star"
                  ></div>
                  <div
                    className="mask mask-star bg-amber-400"
                    aria-label="5 star"
                    aria-current="true"
                  ></div>
                </div>
                <p className="text-gray-light">4900+</p>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className="w-6/12 max-md:w-full mx-auto max-md:mt-5 flex justify-center items-center"
            // variants={imageVariants}
            // initial="hidden"
            // animate="visible"
          >
            <motion.img
              src="Hero.webp"
              alt="Hero illustration"
              className="object-contain grow w-full drop-shadow-2xl rounded-none aspect-[1.11] max-w-[350px] md:max-w-lg lg:max-w-xl"
              whileHover={{
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.3 },
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
