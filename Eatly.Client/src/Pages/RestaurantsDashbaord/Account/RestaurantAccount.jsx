import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DefaultInput from "../../../components/Inputs/DefaultInput";
import TextAreaInput from "../../../components/Inputs/TextAreaInput";
import DropdownSelect from "../../../components/Inputs/DropdownSelect";
import ImageUploader from "../../../components/Inputs/ImageUploader";
import { useRestaurantCategories } from "../../../Queries/Restaurants/useRestaurantCategories";
import { useRestaurantByUserId } from "../../../Queries/Restaurants/useRestaurantByUserId";
import { Check, Edit2 } from "lucide-react";
import { EditRestaurantProfileSchema } from "./../../../Schemas/Restaurant/RestaurantProfileSchema";
import { useEditRestaurant } from "../../../Queries/Restaurants/useEditRestaurant";

export default function RestaurantAccount() {
  const { data: restaurant, isLoading } = useRestaurantByUserId();
  const { data: categoryOptions } = useRestaurantCategories();
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: editRestaurant, isPending } = useEditRestaurant();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(EditRestaurantProfileSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      category: "",
    },
  });

  useEffect(() => {
    if (restaurant && categoryOptions) {
      // Find the category ID that matches the restaurant's category name
      const categoryId =
        categoryOptions.find((cat) => cat.label === restaurant.category)
          ?.value || "";

      reset({
        name: restaurant.name || "",
        description: restaurant.description || "",
        address: restaurant.address || "",
        category: categoryId, // Use the numeric ID instead of the string label
      });
    }
  }, [restaurant, categoryOptions, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("address", data.address);
      formData.append("category", data.category); // This should now be a number

      if (data.bannerImage && data.bannerImage[0]) {
        formData.append("imageFile", data.bannerImage[0]);
      }

      await editRestaurant(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="py-10 px-10">
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden ">
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Banner Image with ImageUploader */}
          <div className="relative h-64">
            <ImageUploader
              register={register}
              name="bannerImage"
              error={errors.imageFile}
              className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-700"
              initialImage={restaurant?.imageUrl}
              previewClassName="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-8">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {restaurant?.name}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="bg-purple/10 text-purple px-3 py-1 rounded-full text-sm font-medium">
                    {restaurant?.category}
                  </span>
                  {restaurant?.isVerified && (
                    <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Check size={14} />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Edit Mode */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Edit Restaurant Information
                </h2>
                <button
                  type="button" // Changed to type="button" to prevent form submission
                  onClick={() => setIsEditing(false)}
                  className="text-gray-500 hover:text-gray-700 font-medium py-2 px-6 rounded-xl transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xl font-medium text-gray-700 mb-1">
                      Restaurant Name*
                    </label>
                    <DefaultInput
                      register={register}
                      name="name"
                      placeholder="Enter restaurant name"
                      error={errors.name}
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-1">
                      Category*
                    </label>
                    <DropdownSelect
                      control={control}
                      name="category"
                      options={categoryOptions || []}
                      placeholder="Select a category"
                      error={errors.category}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-lg font-medium text-gray-700 mb-1">
                      Address*
                    </label>
                    <DefaultInput
                      register={register}
                      name="address"
                      placeholder="Full restaurant address"
                      error={errors.address}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-lg font-medium text-gray-700 mb-1">
                      Description*
                    </label>
                    <TextAreaInput
                      register={register}
                      name="description"
                      error={errors.description}
                      placeholder="Tell customers about your restaurant, cuisine, and what makes it special..."
                      rows={4}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="bg-purple cursor-pointer hover:bg-purple-dark text-white font-medium py-2.5 px-8 rounded-xl transition-colors duration-300"
                  >
                    {isPending ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <>
          {/* Banner Image - Read Only Mode */}
          <div className="relative h-64">
            <img
              src={restaurant?.imageUrl}
              alt="Restaurant banner"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-8">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {restaurant?.name}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="bg-purple/10 text-purple px-3 py-1 rounded-full text-sm font-medium">
                    {restaurant?.category}
                  </span>
                  {restaurant?.isVerified && (
                    <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Check size={14} />
                      Verified
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-purple/10 text-purple hover:bg-purple/20 font-medium py-2 px-6 rounded-xl transition-colors duration-300 flex items-center gap-2"
              >
                <Edit2 size={16} />
                Edit Profile
              </button>
            </div>

            {/* Read-only View */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-1">
                    Restaurant Name
                  </label>
                  <div className="bg-gray-50 rounded-xl p-3 text-gray-700">
                    {restaurant?.name}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <div className="bg-gray-50 rounded-xl p-3 text-gray-700">
                    {restaurant?.category}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <div className="bg-gray-50 rounded-xl p-3 text-gray-700">
                    {restaurant?.address}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <div className="bg-gray-50 rounded-xl p-3 text-gray-700 whitespace-pre-line">
                    {restaurant?.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    </div>
  );
}
