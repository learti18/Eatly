import React from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="bg-background-main min-h-screen w-full flex items-center py-14">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex gap-5 flex-col lg:flex-row">
          <div className="w-6/12 max-lg:w-full">
            <div className="flex flex-col items-center lg:items-start w-full font-semibold">
              <div className="flex mx-auto md:mx-0 gap-5 leading-tight text-text-dark md:text-gray-300 tracking-[2px]">
                <div className="shrink-0 my-auto h-px border border-solid border-text-dark md:border-gray-300 w-[54px]" />
                <p>OVER 1000 USERS</p>
              </div>
              <h2 className="self-stretch mt-5 responsive-text tracking-tighter leading-tight  text-center lg:text-left text-stone-900">
                Enjoy Foods All
                <br />
                Over The <span className="text-purple">World</span>
              </h2>
              <p className="mt-4 font-light text-sm  md:text-lg text-center lg:text-left leading-7 opacity-70 text-stone-500">
                EatLy help you set saving goals, earn cash back offers, Go to
                disclaimer for more details and get paychecks up to two days
                early. Get a{" "}
                <span className="font-medium text-purple">$20 bonus</span>.
              </p>
              <div className="flex justify-center gap-5 mt-14 text-base font-medium tracking-normal">
                <button
                  onClick={() => navigate("/menu")}
                  className="px-8 py-3.5 bg-purple rounded-xl cursor-pointer text-white hover:bg-purple-dark transition-colors duration-200 ease-in-out"
                >
                  Get Started
                </button>
                <button
                  onClick={() => navigate("/aboute")}
                  className="px-8 py-3.5 bg-white rounded-xl cursor-pointer text-purple border border-2-purple hover:bg-purple-50 hover:text-purple-darker transition-colors duration-200 ease-in-out"
                >
                  About us
                </button>
              </div>
              <div className="flex justify-center lg:justify-start items-center gap-2 mt-10">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.2139 8.05296H13.2107L10.747 0.443359L8.26882 8.05296L0.265625 8.03838L6.73816 12.747L4.25993 20.3566L10.7325 15.648L17.205 20.3566L14.7414 12.747L21.2139 8.05296Z"
                    fill="#00B67A"
                  />
                </svg>
                <h2 className="text-text-darker text-xl">Trustpilot</h2>
                <div className="rating pl-3">
                  <div
                    className="mask mask-star bg-amber-400"
                    aria-label="1 star"
                  ></div>
                  <div
                    className="mask mask-star bg-amber-400"
                    aria-label="2 star"
                  ></div>
                  <div className="mask mask-star bg-amber-400"></div>
                  <div
                    className="mask mask-star bg-amber-400"
                    aria-label="4 star"
                  ></div>
                  <div
                    className="mask mask-star bg-amber-400"
                    aria-label="5 star"
                    aria-current="true"
                  ></div>
                </div>
                <p className="text-gray-light">4900+</p>
              </div>
            </div>
          </div>
          <div className="w-6/12 max-md:w-full mx-auto max-md:mt-5 flex justify-center items-center">
            <img
              src="Hero.png"
              alt="Hero illustration"
              className="object-contain grow w-full drop-shadow-2xl rounded-none aspect-[1.11] max-w-[350px] md:max-w-lg lg:max-w-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
