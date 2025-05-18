import React from 'react'
import OrderCard from '../Components/Cards/OrderCardSection'
import ApplyCouponInput from '../Components/Inputs/ApplyCouponInput'
import TotalOrder from './../Components/TotalOrder';

export default function Order() {
  return (
    <div className='bg-background-main'>
        <div className='max-w-3xl mx-auto py-16 px-6'>
          <div className='flex flex-col gap-15'>
            <OrderCard />
            <ApplyCouponInput />
            <TotalOrder price={"$20.00"}/>
            <button className='bg-purple text-white md:w-full text-xl rounded-2xl py-4 font-semibold'>Review Payment</button>
          </div>
        </div>
    </div>
  )
}
