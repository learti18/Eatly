import React, { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

function AnimatedCounter({ target, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      let end;

      if (target.includes("K+")) {
        end = 10000; // 10K+
      } else if (target.includes("M")) {
        end = 4000000; // 4M
      } else if (target.includes("%")) {
        end = 9999; // For 99.99%
      } else {
        end = parseInt(target.replace(/\D/g, ""));
      }

      const increment = end / (duration * 60); // 60 FPS

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [inView, target, duration]);

  const formatCount = (num) => {
    if (target.includes("K+")) {
      return `${(num / 1000).toFixed(0)}K+`;
    } else if (target.includes("M")) {
      return `${(num / 1000000).toFixed(0)}M`;
    } else if (target.includes("%")) {
      return `${(num / 100).toFixed(2)}%`;
    }
    return num.toString();
  };

  return (
    <motion.h2
      ref={ref}
      className="text-white text-5xl font-semibold"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {formatCount(count)}
      {suffix}
    </motion.h2>
  );
}

export default function StatsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row gap-5 justify-center bg-purple-darker py-12 px-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="flex flex-col items-center justify-center p-5 text-center"
        variants={itemVariants}
      >
        <AnimatedCounter target="10K+" />
        <motion.p
          className="text-purple-lighter pt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Satisfied Costumers <br /> All Great Over The World
        </motion.p>
      </motion.div>
      <motion.span
        className="block w-full h-[1.5px] md:h-36 md:w-[1.5px] bg-[#C5C5C5] opacity-15"
        initial={{ scaleX: 0, scaleY: 0 }}
        whileInView={{ scaleX: 1, scaleY: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        viewport={{ once: true }}
      />
      <motion.div
        className="flex flex-col items-center justify-center p-5 text-center"
        variants={itemVariants}
      >
        <AnimatedCounter target="4M" />
        <motion.p
          className="text-purple-lighter pt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Healthy Dishes Sold <br /> Including Milk Shakes Smooth
        </motion.p>
      </motion.div>
      <motion.span
        className="block w-full h-[1.5px] md:h-36 md:w-[1.5px] bg-[#C5C5C5] opacity-15"
        initial={{ scaleX: 0, scaleY: 0 }}
        whileInView={{ scaleX: 1, scaleY: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        viewport={{ once: true }}
      />
      <motion.div
        className="flex flex-col items-center justify-center p-5 text-center"
        variants={itemVariants}
      >
        <AnimatedCounter target="99.99%" />
        <motion.p
          className="text-purple-lighter pt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Reliable Customer Support <br /> We Provide Great Experiences
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
