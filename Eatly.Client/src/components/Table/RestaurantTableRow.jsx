import React from "react";
import { Check, X, Eye } from "lucide-react";
import { useVerifyRestaurant } from "../../Queries/Admin/useVerifyRestaurant";

export default function RestaurantTableRow({ restaurant }) {
  const { id, name, description, address, imageUrl, isVerified, category } =
    restaurant;
  const verifyMutation = useVerifyRestaurant();

  const handleVerify = () => {
    try {
      verifyMutation.mutate({ id, isVerified: true });
    } catch (error) {}
  };

  const handleCancelVerification = () => {
    try {
      verifyMutation.mutate({ id, isVerified: false });
    } catch (error) {}
  };

  const handleView = () => {};

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
        <div className="flex space-x-2">
          {isVerified ? (
            <button
              onClick={handleView}
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-md text-sm font-medium transition-colors"
              title="View details"
            >
              <Eye size={16} />
              <span>View Details</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleVerify}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-md text-sm font-medium transition-colors"
              >
                <Check size={16} />
                <span>Verify</span>
              </button>

              <button
                onClick={handleCancelVerification}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-md text-sm font-medium transition-colors"
              >
                <X size={16} />
                <span>Cancel</span>
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
