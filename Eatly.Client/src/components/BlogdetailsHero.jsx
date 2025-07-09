import React from "react";
import { Calendar, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function BlogdetailsHero({ blogTitle, user, blogImage }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="mb-14"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 cursor-pointer text-text-darker font-medium mb-6 hover:text-purple transition-colors"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={20} />
        Back to Blogs
      </motion.button>

      <motion.div
        className="flex flex-col gap-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h1
          className="text-2xl md:text-3xl font-semibold text-text-darker"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {blogTitle}
        </motion.h1>

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="bg-[#F29DB0] rounded-full w-10 h-10 flex items-center justify-center font-medium text-lg text-white"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
              whileHover={{ rotate: 360 }}
            >
              {user ? user.charAt(0).toUpperCase() : "U"}
            </motion.div>
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="text-xs text-gray-600">Written by</span>
              <span className="text-text-dark">{user}</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 rounded-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
        >
          {blogImage ? (
            <img
              src={blogImage}
              alt={blogTitle}
              className="w-full h-[300px] md:h-[400px] object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              style={{
                contentVisibility: "auto",
                containIntrinsicSize: "1200px 400px",
              }}
            />
          ) : (
            <div className="w-full h-[300px] md:h-[400px] bg-gray-200 flex items-center justify-center text-gray-400">
              No image available
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
