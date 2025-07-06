import React from 'react'
import OrderCard from '../OrderCard'

export default function OrderCardSection() {
  return (
    <div className='flex flex-col gap-10'>
      <OrderCard img={"orderFoodImage.svg"} title={"Chicken Hell"} price={"$12.99"} mins={"-"} num={"00"} plus={"+"} />
      <OrderCard img={"orderFoodImage.svg"} title={"Chicken Hell"} price={"$19.99"} mins={"-"} num={"00"} plus={"+"} />
    </div>
  )
}
