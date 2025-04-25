import React from 'react'
import UsernameInput from '../Inputs/UsernameInput'
import PasswordInput from '../Inputs/PasswordInput'
import { Link } from 'react-router-dom'
import EmailInput from '../Inputs/EmailInput'

export default function SignupForm({register, handleSubmit, onSubmit, errors}) {
  return (
    <div className='w-full md:w-3/6 mx-auto mt-30 p-6 bg-white items-center'>
        <div className="max-w-md mx-auto ">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#323142]">Sign Up</h2>
            <div className='flex flex-row w-full gap-10'>
              <button className='flex flex-1 justify-center items-center py-3 bg-[#F5F5F5] mb-10 rounded-lg'><img src="G.svg"/></button>
              <button className='flex flex-1 justify-center items-center py-3 bg-[#F5F5F5] mb-10 rounded-lg'><img src="Apple.svg" /></button>
            </div>
            <div className=''>
              <h3 className='flex justify-center mb-10 text-[#323142] opacity-30'>OR</h3>
            </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <UsernameInput
                register={register} 
                error={errors.username} 
                name="username" 
              />
              <EmailInput
                register={register} 
                error={errors.email} 
                name="email"
              />
              <PasswordInput
                register={register} 
                error={errors.password} 
                name="password"
              />
              
              <button 
                type="submit"
                className="py-4 bg-primary hover:bg-[#5b4fa9] text-white border-none w-full rounded-lg"
              >
                Sign Up
              </button>
              
              <div className="text-sm text-center text-[#606060]">
                  <p>Already have An Account? <Link to="/sign-in" className="text-[#6c5fbc] font-medium hover:underline">Log In</Link></p>
              </div>
          </form>
      </div>
      <div className='flex justify-between text-sm text-[#718096] pt-6'>
        <p>Privacy Policy</p>
        <p>Copyright 2025</p>
      </div>
    </div>
  )
}
