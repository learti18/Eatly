import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronLeft } from "lucide-react";
import DefaultInput from "../../../components/Inputs/DefaultInput";
import ImageUploader from "../../../components/Inputs/ImageUploader";
import { useParams } from "react-router-dom";
import { useEditBlogs } from "../../../Queries/Blogs/useEditBlogs";
import { useBlogById } from "../../../Queries/Blogs/useBlogById";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

export default function EditBlogs() {
  const [content, setContent] = useState("");
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      title: "",
      subtitle: "",
      imageFile: "",
    },
  });

  const { id } = useParams();
  const { data: blog, isLoading: isBlogLoading } = useBlogById(id);
  const { mutate: editBlogs, isPending } = useEditBlogs();

  useEffect(() => {
    if (blog && !isBlogLoading) {
      reset({
        title: blog.title || "",
        subtitle: blog.subtitle || "",
        imageFile: blog.imageFile || "",
      });
      setContent(blog.content || "");
    }
  }, [blog, isBlogLoading, reset]);

  const onSubmit = (data) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", data.title);
      formData.append("subtitle", data.subtitle);
      formData.append("content", content);

      if (data.imageFile && data.imageFile[0]) {
        formData.append("imageFile", data.imageFile[0]);
      }

      editBlogs(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (isBlogLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="flex items-center gap-10">
        <button
          onClick={() => window.history.back()}
          className="bg-white drop-shadow-2xl rounded-lg p-2 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
        >
          <ChevronLeft color="#323142" />
        </button>
        <h1 className="text-3xl font-medium text-gray-800">Edit Blog</h1>
      </div>
      <div className="bg-white p-8 drop-shadow-xl rounded-lg mt-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="md:order-2">
            <div className="sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Blog Featured Image
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Upload a high-quality image for your blog post.
              </p>
              {blog && blog.imageUrl && (
                <ImageUploader
                  register={register}
                  name="imageFile"
                  initialImage={blog.imageUrl}
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-gray-800 text-lg font-medium">
                Blog Title
              </label>
              <DefaultInput
                placeholder="Enter blog title"
                name="title"
                register={register}
                required
              />
            </div>

            <div className="space-y-3">
              <label className="block text-gray-800 text-lg font-medium">
                Subtitle
              </label>
              <DefaultInput
                placeholder="Enter blog subtitle"
                name="subtitle"
                register={register}
                required
              />
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="block text-gray-800 text-lg font-medium">
                Blog Content
              </label>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder="Write your blog content here..."
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "bold",
                  "italic",
                  "underline",
                  "list",
                  "bullet",
                  "link",
                  "image",
                ]}
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="bg-purple text-white py-3 px-8 rounded-lg font-medium hover:bg-purple-dark cursor-pointer transition-colors duration-300"
            >
              {isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Update Blog"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
