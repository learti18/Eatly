import React from "react";

export default function StatsSection() {
  return (
    <div className="flex flex-col md:flex-row gap-5 justify-center bg-purple-darker py-12 px-10">
      <div className="flex flex-col items-center justify-center p-5 text-center">
        <h2 className="text-white text-5xl font-semibold">10K+</h2>
        <p className="text-purple-lighter pt-4">
          Satisfied Costumers <br /> All Great Over The World
        </p>
      </div>
      <span className="block w-full h-[1.5px] md:h-36 md:w-[1.5px] bg-[#C5C5C5] opacity-15" />
      <div className="flex flex-col items-center justify-center p-5 text-center">
        <h2 className="text-white text-5xl font-semibold">4M</h2>
        <p className="text-purple-lighter pt-4">
          Healthy Dishes Sold <br /> Including Milk Shakes Smooth
        </p>
      </div>
      <span className="block w-full h-[1.5px] md:h-36 md:w-[1.5px] bg-[#C5C5C5] opacity-15" />
      <div className="flex flex-col items-center justify-center p-5 text-center">
        <h2 className="text-white text-5xl font-semibold">99.99%</h2>
        <p className="text-purple-lighter pt-4">
          Reliable Customer Support <br /> We Provide Great Experiences
        </p>
      </div>
    </div>
  );
}
