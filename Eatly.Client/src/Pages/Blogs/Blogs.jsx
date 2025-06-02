import React from "react";
import BlogCard from "../../components/Blogs/BlogCard";
import Accordion from "../../components/Accordion";
import { useAllBlogs } from "../../Queries/Blogs/useAllBlogs";

export default function Blogs() {
  const { data: blogs, isLoading, isError } = useAllBlogs();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }
  return (
    <div className=" bg-background-main">
      <div className=" py-16 px-6 mb-14  md:mb-24 md:px-20 max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-text-dark">
          Latest <span className="text-purple">Articles</span>
        </h2>

        <div className=" grid grid-cols-1  md:grid-cols-2  lg:grid-cols-3  gap-x-12 gap-y-14 md:gap-y-18 ">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              key={blog.id}
              blogImage={blog.imageUrl}
              blogTitle={blog.title}
              user={blog.username}
              date={blog.createdAt}
            />
          ))}
        </div>
        <Accordion />
      </div>
    </div>
  );
}
