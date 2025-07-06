import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import DefaultInput from "../../../components/Inputs/DefaultInput";
import { AddRestaurantProfileSchema } from "../../../Schemas/Restaurant/RestaurantProfileSchema";
import Logo from "../../../components/Shared/Logo";
import ImageUploader from "../../../components/Inputs/ImageUploader";
import DropdownSelect from "../../../components/Inputs/DropdownSelect";
import { useRestaurantCategories } from "../../../Queries/Restaurants/useRestaurantCategories";
import TextAreaInput from "../../../components/Inputs/TextAreaInput";
import { useAddRestaurant } from "../../../Queries/Restaurants/useAddRestaurant";
import useLogout from "../../../Queries/Auth/useLogout";

function RestaurantProfile() {
  const navigate = useNavigate(); // Add this
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(AddRestaurantProfileSchema),
    defaultValues: {
      name: "",
      description: "",
      imageFile: null,
      address: "",
      category: "",
    },
  });

  const { data: categoryOptions, isLoading } = useRestaurantCategories();
  const { mutate: addRestaurant, isPending, isError } = useAddRestaurant();
  const logoutMutation = useLogout();
  const handleLogout = () => {
    logoutMutation.mutateAsync();
  };

  const onSubmit = async (data) => {
    try {
      if (!data.imageFile?.[0]) return;

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("address", data.address);
      formData.append("imageFile", data.imageFile[0]);
      formData.append("category", data.category);

      await addRestaurant(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center mb-8">
        <Logo />
      </div>

      {/* Add debug statement to verify component is rendering */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Let's Create Your Restaurant
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join the Eatly platform and connect with hungry customers in your
            area.
          </p>
        </div>

        {/* Ensure the content has proper styling and is visible */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Progress indicator */}
          <div className="bg-purple-light px-8 py-4">
            <div className="flex items-center justify-between max-w-md mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-purple text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <span className="text-xs mt-1 font-medium">Profile</span>
              </div>
              <div className="h-1 flex-1 mx-2 bg-purple"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-white text-gray-600 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <span className="text-xs mt-1">Verification</span>
              </div>
              <div className="h-1 flex-1 mx-2 bg-white"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-white text-gray-600 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <span className="text-xs mt-1">Dashboard</span>
              </div>
            </div>
          </div>

          <form
            className="py-8 px-6 sm:px-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Basic Information
              </h2>
              <p className="text-gray-600">Tell us about your restaurant</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:order-1 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  <DropdownSelect
                    control={control}
                    name="category"
                    label="Restaurant Category*"
                    options={categoryOptions || []}
                    placeholder="Select a category"
                    error={errors.category}
                    isLoading={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address*
                  </label>
                  <DefaultInput
                    register={register}
                    name="address"
                    placeholder="Full restaurant address"
                    error={errors.address}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <TextAreaInput
                    register={register}
                    name="description"
                    error={errors.description}
                    placeholder="Tell customers about your restaurant, cuisine, and what makes it special..."
                    rows={5}
                  />
                </div>
              </div>

              <div className="md:order-2">
                <div className="sticky top-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Restaurant Image
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Upload a high-quality image hero of your restaurant. This
                    will be displayed on your restaurant profile and in search
                    results.
                  </p>
                  <ImageUploader
                    register={register}
                    name="imageFile"
                    error={errors.imageFile}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex flex-row justify-end gap-4 items-center">
                <button
                  type="submit"
                  className="bg-purple hover:bg-purple-dark cursor-pointer text-white font-bold py-3 px-8 rounded-xl shadow-md transition duration-300 ease-in-out flex items-center gap-2 disabled:opacity-70"
                >
                  {isPending ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <span>Create Restaurant</span>
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-purple text-white rounded-xl px-8 text-lg py-2.5 cursor-pointer hover:bg-purple-dark mb-4"
                >
                  Logout
                </button>
                <div>
                  {isError && (
                    <p className="text-red-500 text-sm">
                      {isError.message ||
                        "An error occurred. Please try again."}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Additional help section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need help setting up your restaurant profile?{" "}
            <a
              href="/contact"
              className="text-purple font-medium hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RestaurantProfile;
