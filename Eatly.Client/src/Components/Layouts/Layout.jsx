import React from 'react'
import Navbar from '../Navigation/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="relative min-h-screen">
      <Navbar/>  
      <main className='max-w-7xl mx-auto min-h-screen bg-background-main relative z-10'>
        <Outlet/>        
      </main>
      <Footer/>
    </div>
  )
}
