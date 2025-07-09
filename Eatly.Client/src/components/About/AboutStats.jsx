import React from "react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "../Shared/AnimatedElements";

const AboutStats = () => {
  const stats = [
    { number: "1000+", label: "Happy Customers" },
    { number: "50+", label: "Partner Restaurants" },
    { number: "15+", label: "Cities Served" },
    { number: "99%", label: "Customer Satisfaction" },
  ];

  return (
    <section className="py-16 bg-purple">
      <div className="max-w-7xl mx-auto px-5">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                <AnimatedCounter
                  end={stat.number}
                  duration={2000 + index * 200}
                />
              </h3>
              <p className="text-purple-light text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStats;
