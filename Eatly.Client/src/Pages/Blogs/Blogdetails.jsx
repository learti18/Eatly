import React from "react";
import { motion } from "framer-motion";
import BlogdetailsHero from "../../components/BlogdetailsHero";
import BlogCard from "../../components/Blogs/BlogCard";
import BlogdetailsContent from "../../components/BlogdetailsContent";
import { useBlogById } from "../../Queries/Blogs/useBlogById";
import { useParams } from "react-router-dom";
import { useAllBlogs } from "../../Queries/Blogs/useAllBlogs";
import PageTransition from "../../components/Shared/PageTransition";

export default function Blogdetails() {
  const { id } = useParams();
  const { data: blog, isLoading, isError } = useBlogById(id);
  const { data: allBlogs } = useAllBlogs();

  // Format username (everything before @)
  const formatUsername = (email) => {
    if (!email) return "";
    return email.split("@")[0];
  };

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

  return (
    <PageTransition>
      <motion.div
        className="bg-background-main min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="py-14 px-4 sm:px-6 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <BlogdetailsHero
              blogTitle={blog.title}
              user={formatUsername(blog.username)}
              blogImage={blog.imageUrl}
            />
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row w-full mt-18"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.div
              className="flex-grow md:pr-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <BlogdetailsContent
                content={blog.content}
                subtitle={blog.subtitle}
              />
            </motion.div>

            <motion.div
              className="hidden md:flex flex-col min-w-[300px] border-l-2 border-gray-300 pl-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.h2
                className="text-2xl font-bold text-text-darker mb-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Top Articles
              </motion.h2>
              <motion.div
                className="flex flex-col gap-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.9,
                  staggerChildren: 0.1,
                }}
              >
                {allBlogs &&
                  allBlogs.slice(0, 3).map((relatedBlog, index) => (
                    <motion.div
                      key={relatedBlog.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 1.0 + index * 0.1,
                      }}
                      whileHover={{
                        y: -3,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <BlogCard
                        id={relatedBlog.id}
                        blogImage={relatedBlog.imageUrl}
                        blogTitle={relatedBlog.title}
                        user={relatedBlog.username}
                        date={relatedBlog.createdAt}
                        size="sm"
                      />
                    </motion.div>
                  ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </PageTransition>
  );
}
