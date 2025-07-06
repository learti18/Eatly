import React, { useState } from "react";
import { Trash2, Eye, X, Check } from "lucide-react";
import RestaurantDetailsModal from "../Modals/RestaurantDetailsModal";
import { useDeleteRestaurant } from "../../Queries/Restaurants/useDeleteRestaurant";

export default function RestaurantTableRow({ restaurant }) {
  const { id, name, description, address, imageUrl, isVerified, category } =
    restaurant;
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const deleteRestaurantMutation = useDeleteRestaurant();

  const handleView = () => {
    setShowDetailsModal(true);
  };

  const handleRemove = () => {
    if (
      window.confirm(
        `Are you sure you want to remove ${name}? This action cannot be undone.`
      )
    ) {
      deleteRestaurantMutation.mutate(id);
    }
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
          <p className="text-sm text-gray-500 mt-1 line-clamp-2 max-w-xs">
            {description}
          </p>
        </div>
      </td>

      <td className="p-4">
        <div className="flex items-start">
          <div className="text-gray-500 text-sm">{address}</div>
        </div>
      </td>

      <td className="p-4">
        <span className="bg-purple-light text-purple-dark px-3 py-1.5 rounded-full text-sm font-medium">
          {category}
        </span>
      </td>

      <td className="p-4">
        {isVerified ? (
          <div className="flex items-center text-green-600 bg-green-50 px-3 py-1.5 rounded-full w-fit">
            <Check size={16} className="mr-1.5" />
            <span className="font-medium text-sm">Verified</span>
          </div>
        ) : (
          <div className="flex items-center text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full w-fit">
            <X size={16} className="mr-1.5" />
            <span className="font-medium text-sm">Pending</span>
          </div>
        )}
      </td>

      <td className="p-4">
        <div className="flex flex-col gap-2">
          <button
            onClick={handleView}
            className="flex items-center justify-center gap-0.5 px-3 py-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-md text-sm  transition-colors"
            title="View details"
          >
            <Eye size={16} />
            <span>View Details</span>
          </button>

          <button
            onClick={handleRemove}
            disabled={deleteRestaurantMutation.isPending}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Remove restaurant"
          >
            {deleteRestaurantMutation.isPending ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                <span>Removing...</span>
              </>
            ) : (
              <>
                <Trash2 size={15} />
                <span>Remove</span>
              </>
            )}
          </button>
        </div>
      </td>

      {/* Restaurant Details Modal */}
      {showDetailsModal && (
        <RestaurantDetailsModal
          restaurant={restaurant}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </tr>
  );
}
