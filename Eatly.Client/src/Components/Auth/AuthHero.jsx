import React from 'react'

export default function AuthHero({className}) {
  return (
    <div className={`${className} relative w-2/5 h-screen bg-[#6C5FBC]`}>
      <img src="pattern.svg" className='absolute bottom-0 left-10 pt-25 pl-10 h-screen' />
      <div className='relative'>
        <img src="chicken.png" className='absolute w-1/2 right-0 top-[-50px]'/>
        <img src="FoodImage.svg" className='m-auto mr-40 mt-50 w-1/2 ' />
        <img src="group.png" className='absolute bottom-[-50px] w-2/5 left-10' />
      </div>
      <div className='block pt-10'>
        <h1 className='text-white text-3xl font-bold text-center'>Find Foods With Love</h1>
        <p className='text-white pt-5 font-extralight text-sm text-center'>Eatly Is The Food Delivery Dashboard And Having More Than 2K+ Dishes <br />
          Incluuding Asian, Chinese, Italians And Many More. Our Dashboard Helps <br />
          You To Manage Orders And Money
        </p>
      </div>
    </div>
  )
}
