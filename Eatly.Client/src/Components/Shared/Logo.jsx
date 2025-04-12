import React from 'react'
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link 
        className='flex items-center gap-2 hover:scale-105 transition-transform duration-200'
        to="/"
    >
      <img 
        className='w-11 h-11'
        src="Logo.svg" 
        alt="eatly's logo" />
      <h1 className='text-purple text-xl font-semibold'>eatly</h1>
    </Link>
  )
}
