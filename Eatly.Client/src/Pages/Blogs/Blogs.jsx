import React from 'react';
import BlogCard from '../../components/Blogs/BlogCard';
import blogs from '../../blogs'; 

export default function Blogs() {
  return (
    <div className=' bg-gray-100'>
    <div className=" py-16 px-6 md:px-20 max-w-7xl mx-auto flex flex-col items-center" >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
        Latest <span className="text-purple-500">Articles</span>
      </h2>

      <div className=" grid grid-cols-1  md:grid-cols-3  gap-x-12 gap-y-14 ">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blogImage={blog.blogImage}
            blogTitle={blog.blogTitle}
            user={blog.user}
            date={blog.date}
            userImg={blog.userImg}
          />
        ))}
      </div>
    </div>
    </div>
  );
}
