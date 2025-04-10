import React from 'react'
import { Link } from 'react-router-dom'
import UsernameInput from '../Inputs/UsernameInput'
import PasswordInput from '../Inputs/PasswordInput'

export default function SigninForm({register, handleSubmit, onSubmit, errors}) {
    return (
      <div className='w-3/6 mx-auto mt-30 p-6 bg-white items-center'>
        <div className="max-w-md mx-auto ">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#323142]">Sign In</h2>
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
                
                <PasswordInput
                  register={register} 
                  error={errors.password} 
                  name="password"
                />

                <div className='text-right'>
                  <p className='text-[#6C5FBC]'> <Link to="#"> Forget Password?</Link></p>
                </div>
                
                <button 
                  type="submit"
                  className="py-4 bg-primary hover:bg-[#5b4fa9] text-white w-full rounded-lg"
                >
                  Sign In
                </button>
                
                <div className="text-sm text-center text-[#606060]">
                    <p>Don't have an account? <Link to="/sign-up" className="text-[#6c5fbc] font-medium hover:underline">Sign up</Link></p>
                </div>
            </form>
            
        </div>
        <div className='flex justify-between'>
          <p className='text-[#718096] pt-8'>Privacy Police</p>
          <p className='text-[#718096] pt-8'>Copyright 20025</p>
        </div>
      </div>
    )
}