import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogdetailsContent({ content, subtitle }) {
  const { id } = useParams();

  return (
    <motion.div
      className="flex flex-col justify-between h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.section
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h2
          className="md:mb-5 text-2xl md:text-3xl font-bold text-text-darker"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {subtitle}
        </motion.h2>
        <motion.div
          className="blog-content text-text-darker leading-7 text-sm md:text-lg pt-5 md:pt-3 pr-0"
          dangerouslySetInnerHTML={{ __html: content }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
      </motion.section>

      <motion.div
        className="flex justify-items-start mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to={`/blogs`}
            className="flex items-center gap-2 cursor-pointer bg-background-link text-white font-medium py-3 px-6 rounded-xl group"
          >
            <span>Back to Articles</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1.5 transition-transform duration-200"
            />
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
