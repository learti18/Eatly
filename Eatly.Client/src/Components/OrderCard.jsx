import React from 'react'

export default function OrderCard({img, title, price, mins, plus, num, textColor}) {
  return (
    <div className='md:w-full rounded-2xl border-white py-2 shadow-2xl bg-white flex justify-between '>
        <div className='flex px-6 gap-5'>
            <img className='w-[70px] md:w-[100px]' src={img} />
            <div className='flex flex-col justify-center'>
                <h2 className='text-lg md:text-xl font-semibold'>{title}</h2>
                <p className='text-sm md:text-lg font-semibold'>{price}</p>
            </div>
        </div>
        <div className='flex flex-col justify-center gap-2 p-6'>
            <div className='flex gap-2'>
                <button className="text-[#323142] border border-[#323142] rounded-xl px-3 py-1 bg-white">{mins}</button>
                <p className='flex items-center'>{num}</p>
                <button className="text-white rounded-xl px-3 py-1 bg-[#323142]">{plus}</button>
            </div>
            <p className='flex justify-center text-sm md:text-lg font-semibold'>{price}</p>
        </div>
    </div>
  )
}
