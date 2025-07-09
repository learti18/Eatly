import { useState } from "react";
import { motion } from "framer-motion";

export const EmailSubscribeInput = ({
  onSubscribe = () => {},
  buttonText = "SUBSCRIBE",
  placeholder = "Enter Your Email",
  backgroundColor = "bg-purple",
  buttonTextColor = "text-purple-light",
  inputBackgroundColor = "bg-purple-light",
}) => {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (email.trim()) {
      onSubscribe(email);
      setEmail("");
    }
  };

  const containerVariants = {
    rest: { scale: 1 },
    focus: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    rest: { scale: 1, x: 0 },
    hover: {
      scale: 1.05,
      x: 2,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className={`${backgroundColor} `}>
      <motion.div
        className={`relative flex min-w-[300px] max-w-sm rounded-2xl overflow-hidden`}
        variants={containerVariants}
        initial="rest"
        animate={isFocused ? "focus" : "rest"}
        whileHover="focus"
      >
        <motion.input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full py-4.5 px-5 ${inputBackgroundColor} outline-none text-gray-600 rounded-2xl transition-colors duration-200`}
          whileFocus={{
            boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.3)",
            transition: { duration: 0.2 },
          }}
        />
        <motion.button
          onClick={handleSubmit}
          className={`absolute right-1.5 top-1.5 bottom-1.5 px-6 ${backgroundColor} ${buttonTextColor} font-medium rounded-xl transition-all hover:bg-[#4b3c6] hover:text-white cursor-pointer`}
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          {buttonText}
        </motion.button>
      </motion.div>
    </div>
  );
};
