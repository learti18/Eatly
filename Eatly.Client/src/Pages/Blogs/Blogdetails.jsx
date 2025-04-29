import React from "react";
import BlogdetailsHero from "../../components/BlogdetailsHero";
import blogs from "../../blogs";
import BlogCard from "../../components/Blogs/BlogCard";
import BlogdetailsContent from "../../components/BlogdetailsContent";

export default function Blogdetails() {
  return (
    <div className="bg-background-main min-h-screen">
      <div className="py-16 px-4 sm:px-6 md:px-20 max-w-7xl mx-auto">
        <BlogdetailsHero
          blogTitle="How To Order Food ?"
          userImg="https://images.unsplash.com/photo-1742626157103-76367e3798bc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          user="Perperzon"
          blogImage="https://images.unsplash.com/photo-1729274642275-c5abcb52183d?q=80&w=2998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />

        <div className="flex flex-col md:flex-row w-full mt-18">
          <div className="flex-grow pr-8">
            <BlogdetailsContent />
          </div>

          <div className="hidden  md:flex flex-col min-w-[300px] border-l-2 border-gray-300 pl-8">
            <h2 className="text-2xl font-bold text-text-darker mb-10">
              Top Articles
            </h2>
            <div className="flex flex-col gap-10">
              {blogs.slice(0, 3).map((blog) => (
                <BlogCard
                  id={blog.id}
                  key={blog.id}
                  blogImage={blog.blogImage}
                  blogTitle={blog.blogTitle}
                  user={blog.user}
                  date={blog.date}
                  userImg={blog.userImg}
                  size="sm"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
