import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const AboutStory = () => {
  return (
    <section className="py-20 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-text-medium leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Founded with a simple mission: to make great food accessible to
                everyone, everywhere. Eatly started as a small idea to bridge
                the gap between amazing local restaurants and hungry customers.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Today, we're proud to serve thousands of customers across
                multiple cities, partnering with the best restaurants to deliver
                not just food, but experiences that bring joy to your table.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                We believe food is more than sustenance—it's a way to connect,
                celebrate, and create lasting memories with the people we care
                about.
              </motion.p>
            </div>
          </motion.div>
          <motion.div
            className="relative h-96"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="/restaurant3.jpg"
              alt="Restaurant interior"
              className="w-full h-full object-cover rounded-2xl shadow-xl"
            />
            <motion.div
              className="absolute bottom-4 left-4 px-3.5 py-3 bg-purple rounded-2xl flex items-center justify-center shadow-xl"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.1 }}
            >
              <Heart className="size-9 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
