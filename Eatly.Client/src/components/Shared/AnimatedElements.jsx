import React, { useEffect, useState, useMemo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const FloatingElement = ({
  children,
  duration = 4, // Increased duration to reduce frequency
  intensity = 5, // Reduced intensity
  className = "",
  disabled = false, // Add ability to disable animations
  ...props
}) => {
  const floatingVariants = useMemo(
    () => ({
      animate: disabled
        ? {}
        : {
            y: [-intensity, intensity, -intensity],
            transition: {
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse",
            },
          },
    }),
    [duration, intensity, disabled]
  );

  return (
    <motion.div
      className={className}
      variants={floatingVariants}
      animate={disabled ? "initial" : "animate"}
      style={{ transform: "translate3d(0, 0, 0)" }} // Force hardware acceleration
      {...props}
    >
      {children}
    </motion.div>
  );
};

const PulseElement = ({
  children,
  duration = 3, // Increased duration
  intensity = 1.05, // Reduced intensity
  className = "",
  disabled = false,
  ...props
}) => {
  const pulseVariants = useMemo(
    () => ({
      animate: disabled
        ? {}
        : {
            scale: [1, intensity, 1],
            transition: {
              duration,
              repeat: Infinity,
              ease: "easeInOut",
            },
          },
    }),
    [duration, intensity, disabled]
  );

  return (
    <motion.div
      className={className}
      variants={pulseVariants}
      animate={disabled ? "initial" : "animate"}
      style={{ transform: "translate3d(0, 0, 0)" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const RotateElement = ({
  children,
  duration = 6, // Increased duration to reduce frequency
  className = "",
  clockwise = true,
  disabled = false,
  ...props
}) => {
  const rotateVariants = useMemo(
    () => ({
      animate: disabled
        ? {}
        : {
            rotate: clockwise ? 360 : -360,
            transition: {
              duration,
              repeat: Infinity,
              ease: "linear",
            },
          },
    }),
    [duration, clockwise, disabled]
  );

  return (
    <motion.div
      className={className}
      variants={rotateVariants}
      animate="animate"
      {...props}
    >
      {children}
    </motion.div>
  );
};

const ShakeElement = ({
  children,
  duration = 0.5,
  intensity = 5,
  className = "",
  ...props
}) => {
  const shakeVariants = {
    animate: {
      x: [-intensity, intensity, -intensity, intensity, 0],
      transition: {
        duration,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={shakeVariants}
      animate="animate"
      {...props}
    >
      {children}
    </motion.div>
  );
};

const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  decimals = 0,
}) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, {
    once: true,
    threshold: 0.5,
    margin: "-100px 0px",
  });

  useEffect(() => {
    if (inView) {
      let startTime;
      let animationFrame;

      let numericEnd = parseFloat(end.toString().replace(/[^\d.-]/g, ""));

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = numericEnd * easeOut;

        setCount(currentCount);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(numericEnd);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [inView, end, duration]);

  // Format the display value
  const formatValue = (value) => {
    if (decimals > 0) {
      return value.toFixed(decimals);
    }
    return Math.floor(value).toString();
  };

  // Add suffix back if it was in the original end value
  const getDisplayValue = () => {
    const formatted = formatValue(count);
    const originalStr = end.toString();

    if (originalStr.includes("K") || originalStr.includes("k")) {
      return formatted + "K";
    } else if (originalStr.includes("M") || originalStr.includes("m")) {
      return formatted + "M";
    } else if (originalStr.includes("%")) {
      return formatted + "%";
    } else if (originalStr.includes("+")) {
      return formatted + "+";
    }

    return formatted;
  };

  return (
    <span ref={ref}>
      {prefix}
      {getDisplayValue()}
      {suffix}
    </span>
  );
};

export {
  FloatingElement,
  PulseElement,
  RotateElement,
  ShakeElement,
  AnimatedCounter,
};
