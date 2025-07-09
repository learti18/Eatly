import React from "react";
import { motion } from "framer-motion";
import TypewriterText from "../Shared/TypewriterText";

const AboutMission = () => {
  const missionText =
    "To create a world where great food brings people together, supporting local restaurants while delivering happiness to every doorstep.";

  return (
    <section className="py-20 px-5">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-text-dark mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Our Mission
        </motion.h2>
        <motion.div
          className="bg-purple rounded-3xl p-12 md:p-16 text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-2xl md:text-3xl font-medium leading-relaxed max-w-4xl mx-auto">
            <span className="text-purple-light text-5xl md:text-6xl leading-none">
              "
            </span>
            <TypewriterText
              text={missionText}
              speed={30}
              startDelay={800}
              className="inline"
              cursorClassName="text-purple-light"
            />
            <span className="text-purple-light text-5xl md:text-6xl leading-none">
              "
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMission;
