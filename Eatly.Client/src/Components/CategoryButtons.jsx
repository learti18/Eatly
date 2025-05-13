import React from 'react'

export default function CategoryButtons({icon, bgColor, textColor, title}) {
  return (
        <button className={`bg-[${bgColor}] flex flex-col justify-between rounded-xl p-3`}>
            <img className='size-10 md:size-15' src={icon} />
            <h3 className={`text-[${textColor}]`}>{title}</h3>
        </button>
  )
}
