import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDeleteBlogs } from "../../Queries/Blogs/useDeleteBlogs";

export default function BlogTableRow({ blog }) {
  const { mutate: deleteBlog } = useDeleteBlogs();

  // Format the date using built-in JavaScript Date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Extract username from email (everything before @)
  const formatUsername = (email) => {
    if (!email) return "";
    return email.split("@")[0];
  };

  const formattedDate = formatDate(blog.createdAt);
  const formattedUsername = formatUsername(blog.username);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      deleteBlog(blog.id);
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-3 px-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden">
          {blog.imageUrl ? (
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
              No image
            </div>
          )}
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="font-medium text-gray-900">{blog.title}</div>
      </td>
      <td className="py-3 px-4 text-gray-700">{blog.subtitle}</td>
      <td className="py-3 px-4 text-gray-700">{formattedUsername}</td>
      <td className="py-3 px-4 text-gray-700">{formattedDate}</td>
      <td className="py-3 px-4">
        <div className="flex gap-2">
          <Link
            to={`edit/${blog.id}`}
            className="p-1.5 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors duration-200"
          >
            <Edit size={18} />
          </Link>
          <button
            onClick={handleDelete}
            className="p-1.5 bg-red-50 rounded-lg text-red-600 hover:bg-red-100 transition-colors duration-200"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
