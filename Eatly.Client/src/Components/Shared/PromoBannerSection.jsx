import React from "react";
import { EmailSubscribeInput } from "../Inputs/EmailSubscribeInput";

export default function PromoBannerSection() {
  return (
    <div className="bg-background-main">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-44">
        <div className="flex flex-col justify-center max-md:items-center max-md:text-center relative pl-10 gap-5 bg-purple rounded-4xl p-6 min-h-[350px] md:min-h-[280px] min-md:bg-[url('/foodicons.svg')] bg-no-repeat bg-cover bg-center">
          <div className="space-y-5 max-md:pb-14">
            <h1 className="text-7xl text-purple-light font-bold">GET 50%</h1>
            <EmailSubscribeInput />
          </div>
          <img
            src="/FoodImage1.svg"
            alt="Food Icons"
            className="absolute w-52 md:w-64 -bottom-28 md:-bottom-12 max-md:right-0 max-md:left-0 right-20 mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
