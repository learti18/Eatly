import React from "react";
import SearchInput from "./Inputs/SearchInput";

export default function PromoBanner({
  searchValue = "",
  onSearchChange = () => {},
  searchPlaceholder = "Search restaurants by name, cuisine, or location...",
}) {
  return (
    <div className="flex flex-col justify-between w-full">
      <div className="w-full">
        <div>
          <div className="flex flex-col justify-center w-full relative md:pl-10 gap-5 bg-purple rounded-4xl p-6 min-h-[200px] md:min-h-[280px] bg-[url('/foodicons.svg')] bg-no-repeat bg-cover bg-center">
            <div className="max-md:pb-14 ">
              <h1 className="text-5xl md:text-8xl text-[#F7F8FA] font-extrabold">
                50% OFF
              </h1>
              <h1 className="text-5xl md:text-8xl text-[#7C6FCD] font-extrabold text-shadow md:-mt-3">
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
      <div className="flex flex-col w-full mt-10">
        <SearchInput
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
      </div>
    </div>
  );
}
