import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const TypewriterText = ({
  text,
  speed = 50,
  className = "",
  startDelay = 0,
  showCursor = true,
  cursorClassName = "text-purple-light",
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const ref = React.useRef(null);
  const inView = useInView(ref, {
    once: true,
    threshold: 0.3,
    margin: "-50px 0px",
  });

  useEffect(() => {
    if (!inView) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(
        () => {
          setDisplayText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        },
        currentIndex === 0 ? startDelay : speed
      );

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed, startDelay, inView]);

  return (
    <div ref={ref} className={className}>
      <span>{displayText}</span>
      {showCursor && (
        <motion.span
          className={`inline-block ml-1 ${cursorClassName}`}
          animate={{ opacity: isComplete ? 0 : [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: isComplete ? 0 : Infinity,
            repeatType: "reverse",
          }}
        >
          |
        </motion.span>
      )}
    </div>
  );
};

export default TypewriterText;
