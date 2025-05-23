import React from "react";

export default function TotalOrder({ price }) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-xl md:text-xl text-gray-400">Subtotal</h1>
        <p className="text-gray-400">{price}</p>
      </div>
      <div className="pt-5 mb-5 border-b-2 border-b-gray-200 "></div>
      <div className="flex justify-between">
        <h1 className="text-xl md:text-xl text-gray-400">Delivery</h1>
        <p className="text-gray-400">{price}</p>
      </div>
      <div className="pt-5 border-b-2 border-b-gray-200 "></div>
      <div className="flex justify-between pt-5">
        <h1 className="text-2xl md:text-3xl font-semibold">Total</h1>
        <p className="font-semibold text-3xl">{price}$</p>
      </div>
    </div>
  );
}
