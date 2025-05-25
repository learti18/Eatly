import React from "react";
import SearchInput from "./Inputs/SearchInput";

export default function PromoBanner() {
  return (
    <div className="flex flex-col justify-between w-full lg:w-2/3 ">
      <div className="w-full">
        <div>
          <div className="flex flex-col justify-center w-full relative md:pl-10 gap-5 bg-[#6C5FBC] rounded-4xl p-6 min-h-[200px] md:min-h-[280px] bg-[url('/foodicons.svg')] bg-no-repeat bg-cover bg-center">
            <div className="space-y-1 md:space-y-5 max-md:pb-14">
              <h1 className="text-5xl md:text-7xl text-[#F7F8FA] font-extrabold">
                50% OFF
              </h1>
              <h1 className="text-5xl md:text-7xl text-[#7C6FCD] font-extrabold">
                WEEKEND
              </h1>
            </div>
            <img
              src="/FoodImage1.svg"
              alt="Food Icons"
              className="absolute w-44 md:w-64 -bottom-10 right-5 mx-auto"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full mt-15">
        <SearchInput />
        {/* <div className='flex w-full mt-5'>
                <button className='w-full rounded-s-lg py-4 border border-[#6C5FBC] text-[#6C5FBC] bg-white'>Food</button>
                <button className="w-full rounded-e-lg py-4 bg-[#6C5FBC] text-white">Restaurant</button>
            </div> */}
      </div>
    </div>
  );
}
