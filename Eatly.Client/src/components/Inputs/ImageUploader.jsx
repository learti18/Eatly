import React, { useState } from "react";

function ImageUploader({ register, name, label, error }) {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div
        className={`mt-1 flex flex-col justify-center items-center px-6 pt-5 pb-6 border-2 ${
          imagePreview ? "border-purple border-solid" : "border-dashed border-gray-300"
        } rounded-md h-56 relative overflow-hidden`}
      >
        {imagePreview ? (
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            <img
              src={imagePreview}
              alt="Image preview"
              className="object-contain max-h-36 max-w-full mb-2"
            />
            <p className="text-sm text-gray-600 mt-2">Image selected</p>
            <button
              type="button"
              onClick={() => {
                setImagePreview(null);
                const input = document.getElementById(`file-upload-${name}`);
                if (input) input.value = '';
              }}
              className="mt-2 text-xs text-purple hover:text-purple-dark underline"
            >
              Remove image
            </button>
          </div>
        ) : (
          <div className="space-y-2 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex justify-center text-sm text-gray-600">
              <label
                htmlFor={`file-upload-${name}`}
                className="relative cursor-pointer bg-white rounded-md font-medium text-purple hover:text-purple-dark focus-within:outline-none"
              >
                <span>Upload a file</span>
                <input
                  id={`file-upload-${name}`}
                  type="file"
                  accept="image/*"
                  {...register(name, {
                    required: "Image is required",
                    onChange: handleImageChange
                  })}
                  className="sr-only"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}

        {error && (
          <p className="text-red-500 text-sm absolute bottom-1">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
