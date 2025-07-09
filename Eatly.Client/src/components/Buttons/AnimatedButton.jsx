import React from "react";
import { motion } from "framer-motion";

const AnimatedButton = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-medium rounded-xl cursor-pointer transition-colors duration-200 ease-in-out";

  const variants = {
    primary:
      "bg-purple text-white hover:bg-purple-dark active:bg-purple-darker",
    secondary:
      "bg-white text-purple border border-2-purple hover:bg-purple-50 active:bg-purple-50 hover:text-purple-darker",
    outline:
      "border-2 border-purple text-purple hover:bg-purple hover:text-white",
  };

  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-8 py-3.5 text-base",
    large: "px-10 py-4 text-lg",
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
    disabled: {
      scale: 1,
      opacity: 0.6,
    },
  };

  const combinedClasses = `${baseClasses} ${variants[variant]} ${
    sizes[size]
  } ${className} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`;

  return (
    <motion.button
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      variants={buttonVariants}
      initial="rest"
      whileHover={disabled ? "disabled" : "hover"}
      whileTap={disabled ? "disabled" : "tap"}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
