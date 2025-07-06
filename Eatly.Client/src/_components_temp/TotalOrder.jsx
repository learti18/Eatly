import React from "react";

export default function TotalOrder({ price }) {
  return (
    <div className="flex flex-col mt-16">
      <div className="flex justify-between text-lg md:text-xl text-gray-400">
        <h1>Subtotal</h1>
        <p>{price}</p>
      </div>
      <div className="pt-4 mb-4 border-b-2 border-b-gray-200 "></div>
      <div className="flex justify-between text-lg md:text-xl text-gray-400">
        <h1>Delivery</h1>
        <p>{price}</p>
      </div>
      <div className="pt-4 border-b-2 border-b-gray-200 "></div>
      <div className="flex justify-between pt-4 text-xl md:text-2xl font-semibold">
        <h1>Total</h1>
        <p>{price}$</p>
      </div>
    </div>
  );
}
