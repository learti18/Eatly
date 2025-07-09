import React, { useMemo } from "react";
import { motion } from "framer-motion";
import BlogCard from "../../components/Blogs/BlogCard";
import Accordion from "../../components/Accordion";
import { useAllBlogs } from "../../Queries/Blogs/useAllBlogs";
import PageTransition from "../../components/Shared/PageTransition";
import BlogCardSkeleton from "../../components/Cards/BlogCardSkeleton";

export default function Blogs() {
  const { data: blogs, isLoading, isError } = useAllBlogs();
  // Animation variants
  const animationVariants = useMemo(
    () => ({
      containerVariants: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: 0.1,
            staggerChildren: 0.05, // Reduced stagger time
          },
        },
      },
      itemVariants: {
        hidden: { opacity: 0, y: 20 }, // Reduced y movement
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4, // Reduced duration
            ease: "easeOut",
          },
        },
      },
    }),
    []
  );

  if (isLoading) {
    return (
      <PageTransition>
        <div className="bg-background-main min-h-screen">
          <div className="py-16 px-6 md:mb-24 md:px-20 max-w-7xl mx-auto flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-text-dark">
              Latest <span className="text-purple">Articles</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14 md:gap-y-18 pb-20 w-full">
              <BlogCardSkeleton count={6} />
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="bg-background-main min-h-screen">
        <div className="py-16 px-6 md:mb-24 md:px-20 max-w-7xl mx-auto flex flex-col items-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-text-dark"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Latest <span className="text-purple">Articles</span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14 md:gap-y-18 pb-20"
            variants={animationVariants.containerVariants}
            initial="hidden"
            animate="visible"
          >
            {blogs && blogs.length === 0 ? (
              <motion.p
                className="text-center text-gray-500 col-span-full"
                variants={animationVariants.itemVariants}
              >
                No blogs available at the moment.
              </motion.p>
            ) : isError ? (
              <motion.p
                className="text-center text-red-500 col-span-full"
                variants={animationVariants.itemVariants}
              >
                Error loading blogs. Please try again later.
              </motion.p>
            ) : (
              blogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  variants={animationVariants.itemVariants}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Accordion />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
