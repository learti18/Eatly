import React from "react";
import { motion } from "framer-motion";
import BlogCard from "../../components/Blogs/BlogCard";
import Accordion from "../../components/Accordion";
import { useAllBlogs } from "../../Queries/Blogs/useAllBlogs";
import PageTransition from "../../components/Shared/PageTransition";

export default function Blogs() {
  const { data: blogs, isLoading, isError } = useAllBlogs();

  if (isLoading) {
    return (
      <PageTransition>
        <div className="bg-background-main min-h-screen">
          <motion.div
            className="flex items-center justify-center h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <span className="loading loading-spinner loading-xl"></span>
            </motion.div>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
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
    <PageTransition>
      <motion.div
        className="bg-background-main min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="py-16 px-6 md:mb-24 md:px-20 max-w-7xl mx-auto flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-text-dark"
            variants={itemVariants}
          >
            Latest <span className="text-purple">Articles</span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14 md:gap-y-18 pb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {blogs && blogs.length === 0 ? (
              <motion.p
                className="text-center text-gray-500 col-span-full"
                variants={itemVariants}
              >
                No blogs available at the moment.
              </motion.p>
            ) : isError ? (
              <motion.p
                className="text-center text-red-500 col-span-full"
                variants={itemVariants}
              >
                Error loading blogs. Please try again later.
              </motion.p>
            ) : (
              blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  custom={index}
                >
                  <BlogCard
                    id={blog.id}
                    blogImage={blog.imageUrl}
                    blogTitle={blog.title}
                    user={blog.username}
                    date={blog.createdAt}
                  />
                </motion.div>
              ))
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion />
          </motion.div>
        </motion.div>
      </motion.div>
    </PageTransition>
  );
}
