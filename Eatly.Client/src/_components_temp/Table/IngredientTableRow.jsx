import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useDeleteIngredient } from "../../Queries/Ingridients/useDeleteIngredient";

export default function IngredientTableRow({ ingredient, index, onEdit }) {
  const { mutate: deleteIngredient, isPending: isDeleting } =
    useDeleteIngredient();

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${ingredient.name}"? This action cannot be undone.`
      )
    ) {
      deleteIngredient(ingredient.id);
    }
  };

  const handleEdit = () => {
    onEdit(ingredient);
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-3 px-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200">
          {ingredient.imageUrl ? (
            <img
              src={ingredient.imageUrl}
              alt={ingredient.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                backgroundColor: ingredient.backgroundColor || "#FF6B6B",
              }}
            >
              <span className="text-white text-lg font-bold">
                {ingredient.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </td>

      <td className="py-3 px-4">
        <div className="font-medium text-gray-900">{ingredient.name}</div>
        {ingredient.backgroundColor && (
          <div className="text-xs text-gray-500 mt-1">
            {ingredient.backgroundColor}
          </div>
        )}
      </td>

      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded border border-gray-300"
            style={{ backgroundColor: ingredient.backgroundColor || "#FF6B6B" }}
            title={ingredient.backgroundColor || "#FF6B6B"}
          ></div>
          <span className="text-sm text-gray-600">
            {ingredient.backgroundColor || "#FF6B6B"}
          </span>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="p-1.5 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors duration-200"
            title="Edit ingredient"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1.5 bg-red-50 rounded-lg text-red-600 hover:bg-red-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete ingredient"
          >
            {isDeleting ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <Trash2 size={18} />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}
