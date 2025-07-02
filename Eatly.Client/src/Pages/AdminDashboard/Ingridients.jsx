import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useAllIngridients } from "../../Queries/Ingridients/useAllIngridients";
import { useAddIngredient } from "../../Queries/Ingridients/useAddIngredient";
import { useEditIngredient } from "../../Queries/Ingridients/useEditIngredient";
import { useDeleteIngredient } from "../../Queries/Ingridients/useDeleteIngredient";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AddIngredientSchema,
  EditIngredientSchema,
} from "../../Schemas/Admin/IngredientSchema";
import DefaultInput from "../../components/Inputs/DefaultInput";
import ImageUploader from "../../components/Inputs/ImageUploader";
import ColorPicker from "../../components/Inputs/ColorPicker";
import Table from "../../components/Table/Table";
import IngredientTableRow from "../../components/Table/IngredientTableRow";

export default function Ingridients() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const { data: ingredients = [], isLoading, isError } = useAllIngridients();
  const { mutate: addIngredient, isPending } = useAddIngredient();
  const { mutate: editIngredient, isPending: isEditing } = useEditIngredient();
  const { mutate: deleteIngredient, isPending: isDeleting } =
    useDeleteIngredient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddIngredientSchema),
    defaultValues: {
      name: "",
      imageFile: "",
      backgroundColor: "#FF6B6B",
    },
  });

  // Separate form for editing
  const {
    register: editRegister,
    handleSubmit: editHandleSubmit,
    reset: editReset,
    setValue: editSetValue,
    formState: { errors: editErrors },
  } = useForm({
    resolver: yupResolver(EditIngredientSchema),
  });

  const onSubmit = (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("backgroundColor", data.backgroundColor);

      // Only append image if one is selected
      if (data.imageFile && data.imageFile[0]) {
        formData.append("imageFile", data.imageFile[0]);
      }

      addIngredient(formData, {
        onSuccess: () => {
          reset();
          setShowAddForm(false);
        },
      });
    } catch (error) {
      console.error("Error submitting ingredient form:", error);
    }
  };

  const onEditSubmit = (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("backgroundColor", data.backgroundColor);

      // Only append image if a new one is selected
      if (data.imageFile && data.imageFile[0]) {
        formData.append("imageFile", data.imageFile[0]);
      }

      editIngredient(
        { id: editingIngredient.id, formData },
        {
          onSuccess: () => {
            editReset();
            setShowEditForm(false);
            setEditingIngredient(null);
          },
        }
      );
    } catch (error) {
      console.error("Error updating ingredient:", error);
    }
  };

  const handleEdit = (ingredient) => {
    setEditingIngredient(ingredient);
    editReset({
      name: ingredient.name,
      backgroundColor: ingredient.backgroundColor || "#FF6B6B",
      imageFile: "",
    });
    setShowEditForm(true);
  };

  const handleDelete = (ingredient) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${ingredient.name}"? This action cannot be undone.`
      )
    ) {
      deleteIngredient(ingredient.id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen h-full py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Ingredients</h1>
          <p className="text-gray-600 mt-2">
            Manage ingredients for your restaurant menu
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-purple text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-dark transition-colors w-fit"
        >
          <Plus size={20} />
          Add Ingredient
        </button>
      </div>

      {/* Add Ingredient Form Modal */}
      {showAddForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Add New Ingredient
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Ingredient Name
                    </label>
                    <DefaultInput
                      placeholder="Enter ingredient name"
                      name="name"
                      register={register}
                      error={errors.name}
                      required="Ingredient name is required"
                    />
                  </div>

                  <div>
                    <ColorPicker
                      register={register}
                      setValue={setValue}
                      name="backgroundColor"
                      label="Background Color"
                      defaultValue="#FF6B6B"
                      error={errors.backgroundColor}
                    />
                  </div>
                </div>

                {/* Right Column - Image Upload */}
                <div>
                  <ImageUploader
                    register={register}
                    name="imageFile"
                    label="Ingredient Image (Optional)"
                    error={errors.imageFile}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    reset();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 px-4 py-2 bg-purple text-white rounded-lg hover:bg-purple-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Add Ingredient"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ingredients Table */}
      <div className="mt-6">
        <Table
          columns={[
            { key: "image", label: "Preview" },
            { key: "name", label: "Ingredient Name" },
            { key: "color", label: "Background Color" },
            { key: "actions", label: "Actions" },
          ]}
          emptyMessage="No ingredients found"
          isLoading={isLoading}
        >
          {!isLoading &&
            ingredients &&
            ingredients.map((ingredient, index) => (
              <IngredientTableRow
                key={ingredient.id}
                ingredient={ingredient}
                index={index}
                onEdit={handleEdit}
              />
            ))}
        </Table>
      </div>

      {/* Edit Ingredient Form Modal */}
      {showEditForm && editingIngredient && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Edit Ingredient: {editingIngredient.name}
            </h2>
            <form
              onSubmit={editHandleSubmit(onEditSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Ingredient Name
                    </label>
                    <DefaultInput
                      placeholder="Enter ingredient name"
                      name="name"
                      register={editRegister}
                      required="Ingredient name is required"
                    />
                    {editErrors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {editErrors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <ColorPicker
                      register={editRegister}
                      setValue={editSetValue}
                      name="backgroundColor"
                      label="Background Color"
                      defaultValue={
                        editingIngredient.backgroundColor || "#FF6B6B"
                      }
                      error={editErrors.backgroundColor}
                    />
                  </div>
                </div>

                {/* Right Column - Image Upload */}
                <div>
                  <ImageUploader
                    register={editRegister}
                    name="imageFile"
                    label="Ingredient Image (Optional)"
                    initialImage={editingIngredient.imageUrl}
                    error={editErrors.imageFile}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingIngredient(null);
                    editReset();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isEditing}
                  className="flex-1 px-4 py-2 bg-purple text-white rounded-lg hover:bg-purple-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isEditing ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Update Ingredient"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
