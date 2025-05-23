import React, { useState, useEffect } from "react";
import ApplyCouponInput from "../Components/Inputs/ApplyCouponInput";
import TotalOrder from "./../Components/TotalOrder";
import { useFetchCart } from "../Queries/Cart/useFetchCart";
import OrderCard from "../components/OrderCard";

export default function Order() {
  const { data: cart, isLoading, isError } = useFetchCart();
  const [localTotalPrice, setLocalTotalPrice] = useState(0);

  useEffect(() => {
    if (cart && cart.totalPrice) {
      setLocalTotalPrice(cart.totalPrice);
    }
  }, [cart]);

  const handleItemPriceChange = (itemId, priceDifference) => {
    setLocalTotalPrice((prev) =>
      (Number(prev) + Number(priceDifference)).toFixed(2)
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        {isError.message}
      </div>
    );
  }

  return (
    <div className="bg-background-main">
      <div className="max-w-4xl mx-auto py-16 px-6">
        <div className="flex flex-col gap-8">
          {!cart || cart.cartItems.length === 0 ? (
            <div className="text-center text-2xl font-semibold text-gray-500">
              Your cart is empty
            </div>
          ) : (
            cart.cartItems.map((item) => (
              <OrderCard
                key={item.id}
                {...item}
                onPriceChange={handleItemPriceChange}
              />
            ))
          )}
          <ApplyCouponInput />
          <TotalOrder price={localTotalPrice} />
          <button className="bg-purple hover:bg-purple-dark transition-colors duration-200 cursor-pointer text-white md:w-full text-xl rounded-2xl py-4 font-semibold">
            Review Payment
          </button>
        </div>
      </div>
    </div>
  );
}
