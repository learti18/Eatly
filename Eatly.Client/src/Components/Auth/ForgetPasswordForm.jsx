import React from "react";
import EmailInput from "../Inputs/EmailInput";

export default function ForgetPasswordForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
}) {
  return (
    <div className="w-full md:w-3/6 min-h-screen flex flex-col justify-between  mx-auto p-10">
      <div className="max-w-md w-full mx-auto my-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#323142]">
          Forget Password
        </h2>
        <h3 className="text-center mb-10 text-[#323142] opacity-30">
          Enter Your Mail To Reset
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <EmailInput register={register} error={errors.email} name="email" />
          <button
            type="submit"
            className="py-4 bg-primary hover:bg-[#5b4fa9] text-white w-full rounded-lg"
          >
            VERIFY
          </button>
        </form>
      </div>

      <div className="flex justify-between text-sm text-[#718096] pt-6">
        <p>Privacy Policy</p>
        <p>Copyright 2025</p>
      </div>
    </div>
  );
}
