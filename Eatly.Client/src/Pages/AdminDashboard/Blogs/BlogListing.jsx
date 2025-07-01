import React from "react";
import { useAllBlogs } from "../../../Queries/Blogs/useAllBlogs";
import Table from "../../../components/Table/Table";
import { Link } from "react-router-dom";
import BlogTableRow from "../../../components/Table/BlogTableRow";
import { Plus } from "lucide-react";

export default function BlogListing() {
  const { data: blogs, isLoading, isError } = useAllBlogs();

  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-800">Blog Posts</h1>
          <p>Add blogs to keep users updated</p>
        </div>
        <Link to="add">
          <button className="flex items-center gap-2 bg-purple text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-dark transition-colors w-fit">
            <Plus size={20} />
            Add Blog Post
          </button>
        </Link>
      </div>
      <Table
        columns={[
          { key: "image", label: "Image", width: "120px" },
          { key: "title", label: "Title" },
          { key: "subtitle", label: "Subtitle" },
          { key: "author", label: "Author" },
          { key: "date", label: "Date" },
          { key: "actions", label: "Actions", width: "120px" },
        ]}
        isLoading={isLoading}
      >
        {!isLoading && blogs && blogs.length > 0
          ? blogs.map((blog) => <BlogTableRow key={blog.id} blog={blog} />)
          : !isLoading && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No blog posts found
                </td>
              </tr>
            )}
      </Table>
    </div>
  );
}
