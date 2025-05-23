import React from "react";

export default function ApplyCouponInput() {
  return (
    <div className="flex flex-col md:flex-row form-control w-full pt-20 gap-2">
      <div
        className="rounded-xl focus-within:border-primary focus-within:ring-2 
                        focus-within:ring-primary flex items-center gap-2 px-4 py-4 w-full bg-background-input-dark"
      >
        <img className="px-2" src="orderCoupon.svg" />
        <input
          type="text"
          className="grow text-primary outline-none bg-transparent placeholder:text-text-lighter"
          placeholder="Apply Coupon"
        />
      </div>
      <button className="md:w-2/5 bg-purple hover:bg-purple-dark transition-colors duration-200 cursor-pointer py-2 text-lg text-white rounded-2xl">
        Apply
      </button>
    </div>
  );
}
