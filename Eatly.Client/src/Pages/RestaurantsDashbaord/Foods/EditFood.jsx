import { ChevronLeft } from "lucide-react";
import React, { useEffect } from "react";
import DefaultInput from "../../../components/Inputs/DefaultInput";
import { useForm } from "react-hook-form";
import DropdownSelect from "../../../components/Inputs/DropdownSelect";
import TextAreaInput from "../../../components/Inputs/TextAreaInput";
import { useFoodTypes } from "./../../../Queries/Foods/useFoodTypes";
import { useAllIngridients } from "../../../Queries/Ingridients/useAllIngridients";
import ImageUploader from "../../../components/Inputs/ImageUploader";
import { useAddFood } from "../../../Queries/Foods/useAddFood";
import { useFoodById } from "../../../Queries/Foods/useFoodById";
import { useParams } from "react-router-dom";
import CheckboxInput from "../../../components/Inputs/CheckBoxInput";
import { useEditFood } from "../../../Queries/Foods/useEditFood";

export default function EditFood() {
  const { register, handleSubmit, reset, control, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      price: "",
      averagePreparationTime: "",
      imageFile: "",
      type: "",
      ingredients: [],
    },
  });

  const { id } = useParams();
  const { data: foodTypes, isLoading: isTypesLoading } = useFoodTypes();
  const { data: ingridients } = useAllIngridients();
  const { data: food, isLoading: isFoodLoading } = useFoodById(id);
  const { mutate: editFood, isPending } = useEditFood(id);

  useEffect(() => {
    if (food && !isFoodLoading) {
      const ingredientIds = food.ingridients?.map((ing) => ing.id) || [];

      reset({
        name: food.name || "",
        price: food.price || "",
        averagePreparationTime: food.averagePreparationTime || "",
        imageFile: food.imageFile || "",
        type: food.type || "",
        ingredients: ingredientIds,
      });
    }
  }, [food, isFoodLoading, reset]);

  const onSubmit = (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("averagePreparationTime", data.averagePreparationTime);

      if (data.imageFile && data.imageFile[0]) {
        formData.append("imageFile", data.imageFile[0]);
      }
      formData.append("type", data.type);

      if (data.ingredients && Array.isArray(data.ingredients)) {
        const filteredIngredients = data.ingredients.filter((id) => id);

        filteredIngredients.forEach((id) => {
          formData.append("IngridientIds", id);
        });
      }

      editFood(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (isFoodLoading || isTypesLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="py-10 px-10">
      <div className="flex items-center gap-10">
        <button
          onClick={() => window.history.back()}
          className="bg-white drop-shadow-2xl rounded-lg p-2 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
        >
          <ChevronLeft color="#323142" />
        </button>
        <h1 className="text-3xl font-medium text-gray-800">Edit Food</h1>
      </div>
      <div className="bg-white p-8 drop-shadow-xl rounded-lg mt-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="md:order-2">
            <div className="sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Food Image
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                We recommend uploading a high-quality <strong>svg</strong> or{" "}
                <strong>png</strong> image of the food.
              </p>
              {food && food.imageUrl && (
                <ImageUploader
                  register={register}
                  name="imageFile"
                  initialImage={food.imageUrl}
                />
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-gray-800 text-lg font-medium">
                Food Name
              </label>
              <DefaultInput
                placeholder="Enter food name"
                name="name"
                register={register}
                required
              />
            </div>

            <div className="space-y-3">
              <label className="block text-gray-800 text-lg font-medium">
                Price ($)
              </label>
              <DefaultInput
                placeholder="Enter food price"
                name="price"
                register={register}
                required
                type="number"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-gray-800 text-lg font-medium">
                Preparation Time (minutes)
              </label>
              <DefaultInput
                placeholder="Enter preparation time"
                name="averagePreparationTime"
                register={register}
                type="number"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-gray-800 text-lg font-medium">
                Food Type
              </label>
              <DropdownSelect
                options={foodTypes || []}
                placeholder="Select food type"
                name="type"
                control={control}
              />
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="block text-gray-800 text-lg font-medium mb-3">
                Choose Ingredients
              </label>
              {ingridients && ingridients.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {ingridients.map((ingridient) => (
                    <CheckboxInput
                      key={ingridient.id}
                      id={`ingridient-${ingridient.id}`}
                      value={ingridient.id}
                      label={ingridient.name}
                      control={control}
                      name="ingredients"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No ingredients available</p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="bg-purple  text-white py-3 px-8 rounded-lg font-medium hover:bg-purple-dark cursor-pointer transition-colors duration-300"
            >
              {isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Update Food"
              )}
            </button>
            {}
          </div>
        </form>
      </div>
    </div>
  );
}
