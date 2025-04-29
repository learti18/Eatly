import React from 'react'

export default function UsernameInput({ register, error, name }) {
    return (
      <div className="form-control w-full">
        <div className="rounded-xl focus-within:border-primary focus-within:ring-2 
                        focus-within:ring-primary flex items-center gap-2 px-4 py-4 w-full bg-background-input">
            <img src="UserIcon.svg" alt="" className="flex-shrink-0 w-5 h-5" />
            <input 
                type="text" 
                className="grow text-primary outline-none bg-transparent placeholder:text-text-lighter" 
                placeholder="Username"
                {...register(name)}
            />
        </div>
        {error && (
          <label className="label">
            <span className="label-text-alt text-error">{error.message}</span>
          </label>
        )}
      </div>
    )
}