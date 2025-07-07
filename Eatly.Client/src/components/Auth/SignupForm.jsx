import React from "react";
import PasswordInput from "../Inputs/PasswordInput";
import { Link } from "react-router-dom";
import EmailInput from "../Inputs/EmailInput";
import PhoneInput from "../Inputs/PhoneInput";

export default function SignupForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
  signupType,
  backendError,
  isPending,
}) {
  return (
    <div className="w-full md:w-3/6 mx-auto mt-10 md:mt-20 p-6 items-center">
      <div className="max-w-md mx-auto ">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#323142]">
          Sign Up
        </h2>
        <div className="flex flex-row w-full border border-gray-200 rounded-lg overflow-hidden mb-10">
          <Link
            to="/sign-up"
            className={`flex-1 py-3 text-center font-medium transition-colors duration-200 ${
              signupType === "client"
                ? "bg-primary text-white hover:bg-[#5b4fa9]"
                : "bg-white text-[#323142] hover:bg-gray-50"
            }`}
          >
            Client
          </Link>
          <Link
            to="/restaurant-signup"
            className={`flex-1 py-3 text-center font-medium transition-colors duration-200 ${
              signupType === "restaurant"
                ? "bg-primary text-white hover:bg-[#5b4fa9]"
                : "bg-white text-[#323142] hover:bg-gray-50"
            }`}
          >
            Restaurant
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <EmailInput register={register} error={errors.email} name="email" />
          <PhoneInput register={register} error={errors.phone} name="phone" />
          <PasswordInput
            register={register}
            error={errors.password}
            name="password"
          />
          <PasswordInput
            register={register}
            error={errors.confirmPassword}
            name="confirmPassword"
          />

          {/* Backend Error Display */}
          {backendError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {backendError?.response?.data?.message ||
                backendError?.message ||
                "An error occurred during sign up. Please try again."}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="py-4 bg-primary hover:bg-[#5b4fa9] disabled:bg-gray-400 disabled:cursor-not-allowed text-white border-none w-full rounded-lg cursor-pointer transition-colors duration-200"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-1">
                Signing Up
                <span className="flex gap-1 ml-1">
                  <motion.span
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatDelay: 0.3,
                    }}
                  >
                    •
                  </motion.span>
                  <motion.span
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatDelay: 0.3,
                      delay: 0.1,
                    }}
                  >
                    •
                  </motion.span>
                  <motion.span
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatDelay: 0.3,
                      delay: 0.2,
                    }}
                  >
                    •
                  </motion.span>
                </span>
              </span>
            ) : (
              "Sign Up"
            )}
          </button>

          <div className="text-sm text-center text-[#606060]">
            <p>
              Already have An Account?{" "}
              <Link
                to="/sign-in"
                className="text-[#6c5fbc] font-medium hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="flex justify-between text-sm text-[#718096] pt-6">
        <p>Privacy Policy</p>
        <p>Copyright 2025</p>
      </div>
    </div>
  );
}
