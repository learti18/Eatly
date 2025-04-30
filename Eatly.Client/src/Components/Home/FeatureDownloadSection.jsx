import React from "react";
import { ArrowRight } from "lucide-react";

export default function FeatureDownloadSection() {
  return (
    <div className="bg-background-main px-5 py-16">
      <div className="max-w-7xl mx-auto flex items-center justify-center flex-col-reverse md:flex-row gap-10">
        {/* Phone Image */}
        <div className="min-md:w-1/2 flex justify-center max-md:max-w-[320px] ml-10">
          <img src="Mobile.svg" alt="mobile version of app" />
        </div>

        {/* ✅ Arrow for Mobile: between phone and text */}
        <img
          src="lineArrow.svg"
          alt="line arrow"
          className="block md:hidden h-[60px] rotate-[110deg] mb-5 -mt-2 -ml-65"
        />

        {/* Text and Button */}
        <div className="min-md:w-1/2 flex flex-col items-center md:items-start justify-center relative">
          <h2 className="text-center md:text-left text-4xl md:text-5xl font-bold text-center mb-4 max-w-md">
            Premium <span className="text-purple">Quality </span>
            For Your Health
          </h2>
          <ul className="text-gray list-disc pl-5 space-y-4 text-lg my-10 text-sm md:text-base">
            <li>
              Premium quality food is made with ingredients that are packed with
              essential vitamins, minerals.
            </li>
            <li>
              These foods promote overall wellness by supporting digestion and
              boosting immunity
            </li>
          </ul>
          <button className="bg-purple text-white rounded-[14px] px-6 py-3.5 cursor-pointer group">
            Download
            <ArrowRight className="inline ml-3 group-hover:translate-x-1.5 transition-transform duration-300 ease-in-out" />
          </button>

          {/* arrow for desktop under download button */}
          <img
            src="lineArrow.svg"
            alt="line arrow"
            className="hidden md:block ml-35 h-[55px] -mt-1"
          />
        </div>
      </div>
    </div>
  );
}
