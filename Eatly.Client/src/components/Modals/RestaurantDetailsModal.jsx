import React from "react";
import { X, MapPin, Clock, Star, Phone, Mail, Calendar } from "lucide-react";
import Badge from "./../Badges/Badge";

export default function RestaurantDetailsModal({ restaurant, onClose }) {
  if (!restaurant) return null;

  const {
    id,
    userId,
    name,
    description,
    address,
    phoneNumber,
    email,
    imageUrl,
    isVerified,
    category,
    averagePreparationTime,
    foodType,
    openingHours,
    rating,
    createdAt,
  } = restaurant;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden shadow-sm">
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/64x64?text=No+Image";
                }}
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-purple-light text-purple-dark px-3 py-1 rounded-full text-sm font-medium">
                  {category}
                </span>
                {foodType && <Badge type={foodType} />}
                {isVerified ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    ✓ Verified
                  </span>
                ) : (
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                    ⏳ Pending
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full hover:bg-gray-100 p-2 transition-colors"
          >
            <X size={24} className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {description || "No description available."}
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="text-gray-400" size={18} />
                <span className="text-gray-700">{address}</span>
              </div>
              {phoneNumber && (
                <div className="flex items-center gap-3">
                  <Phone className="text-gray-400" size={18} />
                  <span className="text-gray-700">{phoneNumber}</span>
                </div>
              )}
              {email && (
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-400" size={18} />
                  <span className="text-gray-700">{email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Operating Hours */}
          {openingHours && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Operating Hours
              </h3>
              <div className="flex items-center gap-3">
                <Clock className="text-gray-400" size={18} />
                <span className="text-gray-700">{openingHours}</span>
              </div>
            </div>
          )}

          {/* Preparation Time */}
          {averagePreparationTime && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Average Preparation Time
              </h3>
              <div className="flex items-center gap-3">
                <Clock className="text-gray-400" size={18} />
                <span className="text-gray-700">
                  {averagePreparationTime} minutes
                </span>
              </div>
            </div>
          )}

          {/* Rating */}
          {rating && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Rating
              </h3>
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400 fill-current" size={18} />
                <span className="text-gray-700 font-medium">{rating}/5</span>
              </div>
            </div>
          )}

          {/* Registration Date */}
          {createdAt && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Registration Date
              </h3>
              <div className="flex items-center gap-3">
                <Calendar className="text-gray-400" size={18} />
                <span className="text-gray-700">
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          )}

          {/* Restaurant & Owner Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Restaurant ID
              </h3>
              <div className="bg-gray-50 rounded-lg p-3">
                <span className="text-gray-600 font-mono text-sm">{id}</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Owner ID
              </h3>
              <div className="bg-gray-50 rounded-lg p-3">
                <span className="text-gray-600 font-mono text-sm">
                  {userId}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
