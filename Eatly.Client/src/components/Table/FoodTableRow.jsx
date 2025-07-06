import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Badge from "../Badges/Badge";
import { Link } from "react-router-dom";
import { useDeleteFood } from "../../Queries/Foods/useDeleteFood";

export default function FoodTableRow({ food }) {
  const {
    id,
    name,
    price,
    imageUrl,
    averagePreparationTime,
    type,
    slogan,
    calories,
  } = food;
  const { mutate: deleteFood } = useDeleteFood();

  const handleView = () => {
    // View food details logic
  };

  const handleEdit = () => {
    // Edit food logic
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      deleteFood(id);
    }
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="p-4">
        <div className="w-20 h-20 rounded-lg overflow-hidden shadow-sm">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/80x80?text=No+Image";
            }}
          />
        </div>
      </td>

      <td className="p-4">
        <div>
          <p className="font-semibold text-gray-800">{name}</p>
        </div>
      </td>

      <td className="p-4">
        <Badge type={type} />
      </td>

      <td className="p-4">
        <div className="font-medium text-gray-800">{formatPrice(price)}</div>
      </td>

      <td className="p-4">
        <div className="text-gray-700">
          <span>{averagePreparationTime} min</span>
        </div>
      </td>

      <td className="p-4">
        <div className="text-gray-700">
          <span>{slogan || "No slogan"}</span>
        </div>
      </td>

      <td className="p-4">
        <div className="text-gray-700">
          <span>{calories ? `${calories} cal` : "N/A"}</span>
        </div>
      </td>

      <td className="p-4">
        <div className="flex flex-col space-y-3 items-center">
          <Link
            to={`/restaurant-dashboard/foods/edit/${id}`}
            className="flex items-center justify-center cursor-pointer w-full gap-1 px-2 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md text-sm font-medium transition-colors"
            title="Edit food"
          >
            <Pencil size={14} />
            <span>Edit</span>
          </Link>

          <button
            onClick={handleDelete}
            className="flex items-center justify-center cursor-pointer w-full gap-1 px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-sm font-medium transition-colors"
            title="Delete food"
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
}
