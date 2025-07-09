import React from "react";
import { motion } from "framer-motion";

const AnimatedInput = ({
  label,
  error,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  ...props
}) => {
  const inputVariants = {
    initial: { scale: 1, borderColor: "#e5e5e5" },
    focus: {
      scale: 1.02,
      borderColor: "#6c5fbc",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    error: {
      borderColor: "#ef4444",
      x: [-10, 10, -10, 10, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const labelVariants = {
    initial: { y: 0, scale: 1, color: "#6b7280" },
    focus: {
      y: -20,
      scale: 0.85,
      color: "#6c5fbc",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className={`relative mb-4 ${className}`}
      initial="initial"
      whileHover="hover"
      whileFocus="focus"
    >
      {label && (
        <motion.label
          className="absolute left-3 top-3 text-gray-500 pointer-events-none"
          variants={labelVariants}
          animate={value ? "focus" : "initial"}
        >
          {label}
        </motion.label>
      )}
      <motion.input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-3 border-2 rounded-lg outline-none transition-all duration-200 ${
          error ? "border-red-500" : "border-gray-200 focus:border-purple"
        } ${label ? "pt-6" : ""}`}
        variants={inputVariants}
        animate={error ? "error" : "initial"}
        whileFocus="focus"
        {...props}
      />
      {error && (
        <motion.span
          className="text-red-500 text-sm mt-1 block"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.span>
      )}
    </motion.div>
  );
};

export default AnimatedInput;
