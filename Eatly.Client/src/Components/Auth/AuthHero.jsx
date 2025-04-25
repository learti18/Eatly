import React from 'react'

export default function AuthHero({ className }) {
  return (
    <div className={`${className} relative w-2/5 h-screen bg-[#6C5FBC] p-3`}>
      <img src="pattern.svg" className='absolute bottom-0 left-10 pt-25 pl-10 h-screen'  />
      <div className='mt-10'>
        <div className="flex justify-center items-start pt-[120px]">
          <div className="relative w-[300px] h-[300px]">
            <img src="FoodImage.svg" className="w-full h-full object-contain" />
            <img
              src="chicken.png"
              className="absolute top-[-30px] right-[-100px] w-[250px]"
            />
            <img
              src="group.png"
              className="absolute bottom-[-50px] left-[-70px] w-[200px]"
            />
          </div>
        </div>
        <div className="text-white text-center px-4 mt-12">
          <h1 className="text-3xl font-bold">Find Foods With Love</h1>
          <p className="pt-5 font-extralight text-xs md:text-sm">
            Eatly is the food delivery dashboard with over 2K+ dishes<br />
            including Asian, Chinese, Italian and many more.<br />
            Our dashboard helps you manage orders and revenue.
          </p>
        </div>
      </div>
    </div>
  )
}
