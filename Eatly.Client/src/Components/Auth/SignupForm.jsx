import React from 'react'
import UsernameInput from '../Inputs/UsernameInput'
import PasswordInput from '../Inputs/PasswordInput'
import { Link } from 'react-router-dom'
import EmailInput from '../Inputs/EmailInput'

export default function SignupForm({register, handleSubmit, onSubmit, errors}) {
  return (
    <div>
       <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#323142]">Sign Up</h2>
      
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
                className="btn btn-block bg-primary hover:bg-[#5b4fa9] text-white border-none w-full rounded-lg"
              >
                Sign Up
              </button>
              
              <div className="text-sm text-center text-[#606060]">
                  <p>Don't have an account? <Link to="/sign-in" className="text-[#6c5fbc] font-medium hover:underline">Sign up</Link></p>
              </div>
          </form>
      </div>
    </div>
  )
}
