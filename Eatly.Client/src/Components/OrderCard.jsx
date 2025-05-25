import React, { useEffect, useState, useRef } from "react";
import { useRemoveCartItem } from "./../Queries/Cart/useRemoveCartItem";
import { useUpdateCartItem } from "../Queries/Cart/useUpdateCartItem";
import { toast } from "sonner";

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.2s ease-out forwards;
  }
`;

export default function OrderCard({
  id,
  foodId,
  foodName,
  foodImageUrl,
  quantity,
  price,
  onPriceChange,
}) {
  const unitPrice = price / quantity;
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const [displayPrice, setDisplayPrice] = useState(price);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { mutate: updateQuantity } = useUpdateCartItem();
  const { mutate: removeItem } = useRemoveCartItem();
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = fadeInKeyframes;
    document.head.appendChild(styleElement);

    return () => {
      if (styleElement.parentNode) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  const debouncedUpdate = (newQuantity) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      updateQuantity({ foodId, quantity: newQuantity });
    }, 500);
  };

  const calculateNewPrice = (newQuantity) => {
    return (newQuantity * unitPrice).toFixed(2);
  };

  const updatePriceAndQuantity = (newQuantity) => {
    setCurrentQuantity(newQuantity);

    const newItemPrice = calculateNewPrice(newQuantity);
    const priceDifference = newItemPrice - displayPrice;

    setDisplayPrice(newItemPrice);

    if (onPriceChange) {
      onPriceChange(id, priceDifference);
    }

    debouncedUpdate(newQuantity);
  };

  const handleDecrement = () => {
    if (currentQuantity > 1) {
      updatePriceAndQuantity(currentQuantity - 1);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleIncrement = () => {
    updatePriceAndQuantity(currentQuantity + 1);
  };

  const confirmRemove = () => {
    removeItem(foodId);
    setShowConfirmation(false);
    toast.success(`${foodName} removed from cart`);
  };

  const cancelRemove = () => {
    setShowConfirmation(false);
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setCurrentQuantity(quantity);
    setDisplayPrice(price);
  }, [quantity, price]);

  return (
    <>
      {showConfirmation && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-11/12 border border-gray-100 animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4 text-[#323142]">
              Remove Item
            </h3>
            <div className="flex items-center gap-4 mb-6 p-3 bg-gray-50 rounded-xl">
              <img
                className="w-16 h-16 object-contain rounded-lg"
                src={foodImageUrl}
                alt={foodName}
              />
              <div>
                <p className="font-medium text-lg">{foodName}</p>
                <p className="text-gray-500">
                  {unitPrice.toFixed(2)}$ × {currentQuantity}
                </p>
              </div>
            </div>
            <p className="mb-6 text-gray-600">
              Are you sure you want to remove this item from your cart?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelRemove}
                className="px-6 py-2.5 border cursor-pointer border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemove}
                className="px-6 py-2.5 bg-red-500 cursor-pointer text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="md:w-full rounded-2xl border-white py-1 px-4 drop-shadow-xl bg-white flex items-center justify-between ">
        <div className="flex gap-5">
          <img
            className="max-w-26 object-contain rounded-full"
            src={foodImageUrl}
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-lg md:text-xl font-semibold">{foodName}</h2>
            <p className="text-sm md:text-lg font-semibold">
              {unitPrice.toFixed(2)}$
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-3 p-6">
          <div className="flex items-center gap-3">
            <button
              onClick={handleDecrement}
              className="text-[#323142] text-3xl cursor-pointer border border-[#323142] rounded-xl w-9 h-9 flex items-center justify-center bg-white hover:bg-[#f0f0f0] hover:shadow-md transition-all duration-200"
            >
              -
            </button>
            <p className="flex items-center justify-center text-lg font-medium min-w-[30px]">
              {currentQuantity}
            </p>
            <button
              onClick={handleIncrement}
              className="text-white text-3xl cursor-pointer rounded-xl w-9 h-9 flex items-center justify-center bg-[#323142] hover:bg-[#4a4963] hover:shadow-md transition-all duration-200"
            >
              +
            </button>
          </div>
          <p className="flex justify-center text-sm md:text-lg font-semibold text-[#323142]">
            {displayPrice}$
          </p>
        </div>
      </div>
    </>
  );
}
