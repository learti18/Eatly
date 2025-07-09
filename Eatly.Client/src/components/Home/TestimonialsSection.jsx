import { useState, useEffect } from "react";
import { testimonials } from "../../testimonials";
import TestimonialCard from "../Cards/TestimonialCard";
import TestimonialSecondaryCard from "../Cards/TestimonialSecondaryCard";
import ProgressBar from "../ProgressBars/ProgressBar";
import { motion, AnimatePresence } from "framer-motion";

export default function TestimonialSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const progressPercentage = ((currentSlide + 1) / testimonials.length) * 100;

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

  const slideVariants = {
    enter: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    center: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="bg-background-main"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-7xl mx-auto pt-16 min-md:pb-20 pl-6">
        <motion.h2
          className="text-5xl font-bold text-center text-purple mb-20 -ml-6"
          variants={titleVariants}
        >
          Customer <span className="text-gray-900">Say</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <ProgressBar
            percentage={progressPercentage}
            className="md:hidden mb-8 max-w-xl mx-auto pr-6"
          />
        </motion.div>

        <div className="relative ">
          <div className="flex flex-col md:flex-row max-md:gap-7 max-w-full">
            <div className="max-sm:pr-6 w-full md:w-[40%]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <TestimonialCard testimonial={testimonials[currentSlide]} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col w-full md:w-[60%] overflow-hidden pb-14 pr-10 pl-6 -mr-10">
              <div className="flex gap-6 pb-4 md:pb-0">
                <div className="flex gap-6 py-2">
                  {testimonials.map((testimonial, index) => {
                    if (index === currentSlide) return null;
                    const nextIndex1 = (currentSlide + 1) % testimonials.length;
                    const nextIndex2 = (currentSlide + 2) % testimonials.length;
                    if (index !== nextIndex1 && index !== nextIndex2)
                      return null;

                    return (
                      <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <TestimonialSecondaryCard
                          testimonial={testimonial}
                          onClick={() => setCurrentSlide(index)}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <ProgressBar
                  percentage={progressPercentage}
                  className="hidden md:block mt-16 max-w-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
