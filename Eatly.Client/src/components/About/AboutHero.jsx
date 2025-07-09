import React from "react";
import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <section className="py-20 px-5">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-text-dark mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          About <span className="text-purple">Eatly</span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-text-medium max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          We're passionate about connecting food lovers with amazing restaurants
          and creating memorable dining experiences, one delivery at a time.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutHero;
