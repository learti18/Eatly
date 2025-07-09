import React from "react";
import { motion } from "framer-motion";

export default function Accordion() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="bg-transparent w-full pt-24 border-t-2 border-t-gray-200"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="max-w-7xl mx-auto flex flex-col items-center relative"
        variants={itemVariants}
      >
        <motion.h2
          className="relative text-3xl md:text-4xl font-semibold text-center mb-16 text-text-dark"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked <br />
          <span className="text-purple">Questions</span>
          <motion.img
            className="absolute -right-10 -top-6"
            src="/icon.svg"
            initial={{ opacity: 0, rotate: -180, scale: 0 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />
        </motion.h2>
      </motion.div>

      {/* FAQ Items with animations */}
      <motion.div
        className="collapse collapse-plus custom-collapse border-b border-b-gray-300 rounded-none"
        variants={itemVariants}
        whileHover={{
          scale: 1.01,
        }}
        transition={{ duration: 0.2 }}
      >
        <input type="radio" name="faq-accordion" className="text-pr" />
        <div className="collapse-title  font-semibold text-text-dark text-base">
          How long does delivery take?
        </div>
        <div className="collapse-content text-gray-600 text-sm">
          You Can Get Information By Contacting Our Support Team Have 24/7
          Service. What’s The Difference Between Free And Paid Plan ?
        </div>
      </motion.div>

      <motion.div
        className="collapse collapse-plus custom-collapse border-b border-b-gray-300 rounded-none"
        variants={itemVariants}
        whileHover={{
          scale: 1.01,
        }}
        transition={{ duration: 0.2 }}
      >
        <input type="radio" name="faq-accordion" className="text-pr" />
        <div className="collapse-title  font-semibold text-text-dark text-base">
          How Does It Work ?
        </div>
        <div className="collapse-content text-gray-600 text-sm">
          You place an order through our app or website, and we deliver it to
          your door.
        </div>
      </motion.div>

      <motion.div
        className="collapse collapse-plus custom-collapse border-b border-b-gray-300 rounded-none"
        variants={itemVariants}
        whileHover={{
          scale: 1.01,
        }}
        transition={{ duration: 0.2 }}
      >
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title  font-semibold  text-text-dark text-base">
          How does your food delivery service work?
        </div>
        <div className="collapse-content text-gray-600 text-sm">
          Our service connects local restaurants with delivery drivers to bring
          food to you quickly and safely.
        </div>
      </motion.div>

      <motion.div
        className="collapse collapse-plus custom-collapse border-b border-b-gray-300 rounded-none"
        variants={itemVariants}
        whileHover={{
          scale: 1.01,
        }}
        transition={{ duration: 0.2 }}
      >
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title  font-semibold text-gray-800 text-base">
          What payment options do you accept?
        </div>
        <div className="collapse-content text-gray-600 text-sm">
          We accept all major credit cards, debit cards, and digital wallets.
        </div>
      </motion.div>

      <motion.div
        className="collapse collapse-plus custom-collapse border-b border-b-gray-300 rounded-none"
        variants={itemVariants}
        whileHover={{
          scale: 1.01,
        }}
        transition={{ duration: 0.2 }}
      >
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title  font-semibold text-gray-800 text-base">
          Do you offer discounts or promotions?
        </div>
        <div className="collapse-content text-gray-600 text-sm">
          Yes! Check our homepage or sign up for our newsletter for the latest
          offers.
        </div>
      </motion.div>
    </motion.div>
  );
}
