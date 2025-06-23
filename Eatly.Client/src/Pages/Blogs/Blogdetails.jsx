import React from "react";
import BlogdetailsHero from "../../components/BlogdetailsHero";
import BlogCard from "../../components/Blogs/BlogCard";
import BlogdetailsContent from "../../components/BlogdetailsContent";
import { useBlogById } from "../../Queries/Blogs/useBlogById";
import { useParams } from "react-router-dom";
import { useAllBlogs } from "../../Queries/Blogs/useAllBlogs";

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
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="bg-background-main min-h-screen">
      <div className="py-16 px-4 sm:px-6 md:px-20 max-w-7xl mx-auto">
        <BlogdetailsHero
          blogTitle={blog.title}
          user={formatUsername(blog.username)}
          blogImage={blog.imageUrl}
        />

        <div className="flex flex-col md:flex-row w-full mt-18">
          <div className="flex-grow pr-8">
            <BlogdetailsContent
              content={blog.content}
              subtitle={blog.subtitle}
            />
          </div>

          <div className="hidden md:flex flex-col min-w-[300px] border-l-2 border-gray-300 pl-8">
            <h2 className="text-2xl font-bold text-text-darker mb-10">
              Top Articles
            </h2>
            <div className="flex flex-col gap-10">
              {allBlogs &&
                allBlogs
                  .slice(0, 3)
                  .map((relatedBlog) => (
                    <BlogCard
                      id={relatedBlog.id}
                      key={relatedBlog.id}
                      blogImage={relatedBlog.imageUrl}
                      blogTitle={relatedBlog.title}
                      user={relatedBlog.username}
                      date={relatedBlog.createdAt}
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
