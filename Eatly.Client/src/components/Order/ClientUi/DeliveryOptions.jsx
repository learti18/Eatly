import React from "react";

export default function DeliveryOptions({
  deliveryType,
  setDeliveryType,
  addresses,
  selectedAddressId,
  handleAddressSelect,
  isAddingNewAddress,
  setIsAddingNewAddress,
  isLoadingAddresses,
}) {
  return (
    <div className="bg-white rounded-t-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Delivery Options</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        {/* Delivery option button */}
        <button
          className={`flex-1 py-3 px-4 rounded-lg border min-w-52 ${
            deliveryType === "delivery"
              ? "border-purple bg-purple/5"
              : "border-gray-200"
          }`}
          onClick={() => setDeliveryType("delivery")}
        >
          <div className="flex items-center">
            <div
              className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                deliveryType === "delivery"
                  ? "border-purple"
                  : "border-gray-300"
              }`}
            >
              {deliveryType === "delivery" && (
                <div className="w-3 h-3 bg-purple rounded-full"></div>
              )}
            </div>
            <div>
              <p className="font-medium">Home Delivery</p>
              <p className="text-sm text-gray-500">Delivery to your address</p>
            </div>
          </div>
        </button>

        {/* Pickup option button */}
        <button
          className={`flex-1 py-3 px-4 rounded-lg border ${
            deliveryType === "pickup"
              ? "border-purple bg-purple/5"
              : "border-gray-200"
          }`}
          onClick={() => setDeliveryType("pickup")}
        >
          <div className="flex items-center">
            <div
              className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                deliveryType === "pickup" ? "border-purple" : "border-gray-300"
              }`}
            >
              {deliveryType === "pickup" && (
                <div className="w-3 h-3 bg-purple rounded-full"></div>
              )}
            </div>
            <div>
              <p className="font-medium">Restaurant Pickup</p>
              <p className="text-sm text-gray-500">Pickup from restaurant</p>
            </div>
          </div>
        </button>
      </div>

      {/* Address Selection for Delivery */}
      {deliveryType === "delivery" && (
        <>
          <h3 className="font-medium text-gray-700 mb-3">
            Select Delivery Address
          </h3>

          {addresses.length === 0 && !isLoadingAddresses ? (
            <div className="text-center p-6 bg-gray-50 rounded-lg mb-4">
              <p className="text-gray-600 mb-3">
                You don't have any saved addresses.
              </p>
              <button
                onClick={() => setIsAddingNewAddress(true)}
                className="text-purple hover:underline"
              >
                + Add a new address
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`border rounded-lg p-4 cursor-pointer ${
                      selectedAddressId === address.id
                        ? "border-purple bg-purple/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleAddressSelect(address.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{address.streetAddress}</p>
                        <p className="text-gray-600 text-sm">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          {address.phoneNumber}
                        </p>
                      </div>
                      {address.isDefault && (
                        <span className="bg-purple/10 text-purple text-xs px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsAddingNewAddress(true)}
                className="text-purple hover:underline text-sm flex items-center"
              >
                + Add a new address
              </button>
            </>
          )}
        </>
      )}

      {/* Pickup Message */}
      {deliveryType === "pickup" && (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700">
            Please pick up your order from the restaurant location. You'll
            receive a notification when your order is ready.
          </p>
        </div>
      )}
    </div>
  );
}
