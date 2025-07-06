import React from "react";
import { Link } from "react-router-dom";
import UsernameInput from "../Inputs/UsernameInput";
import PasswordInput from "../Inputs/PasswordInput";
import EmailInput from "../Inputs/EmailInput";

export default function SigninForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
  loginMutation,
}) {
  return (
    <div className="w-full md:w-3/6 mx-auto mt-10 md:mt-20 p-6 items-center">
      <div className="max-w-md mx-auto ">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#323142]">
          Sign In
        </h2>
        <div className="flex flex-row w-full gap-10">
          <button className="flex flex-1 justify-center items-center py-3 bg-background-input-dark mb-10 rounded-lg cursor-pointer group hover:bg-purple transition-colors duration-200">
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5331 7.08984C16.0351 6.17672 15.3502 5.48151 14.4786 5.0042C13.607 4.52689 12.5901 4.28823 11.428 4.28823C10.1413 4.28823 8.99993 4.57877 8.00381 5.15984C7.00768 5.74092 6.22946 6.57102 5.66914 7.65016C5.10881 8.7293 4.82865 9.97445 4.82865 11.3856C4.82865 12.8383 5.10881 14.1042 5.66914 15.1834C6.25021 16.2625 7.04919 17.0926 8.06606 17.6737C9.08294 18.2548 10.2658 18.5453 11.6148 18.5453C13.275 18.5453 14.6343 18.1095 15.6927 17.2379C16.751 16.3455 17.4463 15.1107 17.7783 13.5335H10.3073V10.2027H22.0741V14.0005C21.7836 15.5154 21.161 16.9162 20.2064 18.2029C19.2517 19.4895 18.0169 20.5272 16.502 21.3158C15.0078 22.0836 13.3269 22.4675 11.4591 22.4675C9.3631 22.4675 7.46424 22.0006 5.76252 21.0667C4.08156 20.1121 2.75339 18.7943 1.77802 17.1134C0.823397 15.4324 0.346087 13.5232 0.346087 11.3856C0.346087 9.24811 0.823397 7.33887 1.77802 5.65791C2.75339 3.95619 4.08156 2.6384 5.76252 1.70453C7.46424 0.749911 9.35273 0.2726 11.428 0.2726C13.8768 0.2726 16.0039 0.874426 17.8094 2.07808C19.6149 3.26098 20.8601 4.93156 21.5449 7.08984H16.5331Z"
                fill="#323142"
                className="group-hover:fill-white transition-colors duration-200"
              />
            </svg>
          </button>
          <button className="flex flex-1 justify-center items-center py-3 bg-background-input-dark mb-10 rounded-lg cursor-pointer group hover:bg-purple transition-colors duration-200">
            <svg
              width="27"
              height="31"
              viewBox="0 0 27 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2_838)">
                <path
                  d="M25.5304 24.2326C25.0713 25.2813 24.5279 26.2466 23.8983 27.1342C23.0401 28.3441 22.3374 29.1816 21.7959 29.6466C20.9564 30.41 20.0569 30.801 19.0938 30.8232C18.4024 30.8232 17.5685 30.6286 16.5979 30.234C15.624 29.8412 14.7291 29.6466 13.9108 29.6466C13.0526 29.6466 12.1322 29.8412 11.1477 30.234C10.1617 30.6286 9.36734 30.8343 8.76003 30.8547C7.83643 30.8936 6.91582 30.4915 5.99689 29.6466C5.41039 29.1408 4.67678 28.2737 3.79796 27.0452C2.85505 25.7334 2.07985 24.2122 1.47254 22.4779C0.822139 20.6047 0.496094 18.7907 0.496094 17.0346C0.496094 15.023 0.935693 13.2879 1.8162 11.834C2.50821 10.6662 3.42882 9.74492 4.58103 9.06863C5.73325 8.39233 6.97821 8.0477 8.31894 8.02565C9.05254 8.02565 10.0146 8.25003 11.2101 8.69101C12.4022 9.13348 13.1676 9.35786 13.5032 9.35786C13.7542 9.35786 14.6045 9.09549 16.046 8.57243C17.4092 8.08735 18.5598 7.8865 19.5023 7.96562C22.0563 8.16943 23.9751 9.16497 25.2512 10.9585C22.967 12.3271 21.8371 14.2438 21.8596 16.7028C21.8802 18.6181 22.5829 20.2119 23.9639 21.4774C24.5897 22.0647 25.2887 22.5187 26.0663 22.8411C25.8977 23.3247 25.7196 23.7879 25.5304 24.2326ZM19.6728 1.4406C19.6728 2.9418 19.1182 4.34347 18.0126 5.64084C16.6784 7.18316 15.0647 8.07438 13.3147 7.93375C13.2924 7.75365 13.2795 7.56411 13.2795 7.36492C13.2795 5.92377 13.914 4.38145 15.0407 3.1204C15.6032 2.48191 16.3187 1.95101 17.1862 1.5275C18.052 1.11031 18.8708 0.879597 19.641 0.840088C19.6634 1.04078 19.6728 1.24147 19.6728 1.44058V1.4406Z"
                  fill="#323142"
                  className="group-hover:fill-white transition-colors duration-200"
                />
              </g>
              <defs>
                <clipPath id="clip0_2_838">
                  <rect
                    width="25.5702"
                    height="30.0172"
                    fill="white"
                    transform="translate(0.496094 0.839355)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <div className="">
          <h3 className="flex justify-center mb-10 text-[#323142] opacity-30">
            OR
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <EmailInput register={register} error={errors.email} name="email" />

          <PasswordInput
            register={register}
            error={errors.password}
            name="password"
          />

          <div className="text-right">
            <p className="text-[#6C5FBC]">
              {" "}
              <Link to="/forget-password"> Forget Password?</Link>
            </p>
          </div>

          {/* Backend Error Display */}
          {loginMutation?.error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {loginMutation.error?.response?.data?.message ||
                loginMutation.error?.message ||
                "An error occurred during sign in. Please try again."}
            </div>
          )}

          <button
            type="submit"
            disabled={loginMutation?.isPending}
            className="py-4 bg-primary hover:bg-[#5b4fa9] disabled:bg-gray-400 disabled:cursor-not-allowed text-white w-full rounded-lg cursor-pointer transition-colors duration-200"
          >
            {loginMutation?.isPending ? "Signing In..." : "Sign In"}
          </button>

          <div className="text-sm text-center text-[#606060]">
            <p>
              Don't have An Account?{" "}
              <Link
                to="/sign-up"
                className="text-[#6c5fbc] font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="flex justify-between text-sm text-[#718096] pt-10">
        <p>Privacy Policy</p>
        <p>Copyright 2025</p>
      </div>
    </div>
  );
}
