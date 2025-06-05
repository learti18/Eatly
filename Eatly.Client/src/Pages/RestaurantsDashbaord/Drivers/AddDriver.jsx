import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronLeft, CheckCircle } from "lucide-react";
import { useRestaurant } from "../../../Contexts/RestaurantContext";
import DefaultInput from "../../../components/Inputs/DefaultInput";
import EmailInput from "../../../Components/Inputs/EmailInput";
import { useAddDriver } from "../../../Queries/Drivers/useAddDriver";
import { driverSchema } from "../../../Schemas/Driver/DriverSchema";
import PasswordInput from "../../../Components/Inputs/PasswordInput";

export default function AddDriver() {
  const { mutate: addDriver, isPending: isCreating } = useAddDriver();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(driverSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (data) => {
    try {
      addDriver(data);
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  return (
    <div className="py-10 px-10">
      <div className="flex items-center gap-10">
        <button
          onClick={() => window.history.back()}
          className="bg-white drop-shadow-2xl rounded-lg p-2 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
        >
          <ChevronLeft color="#323142" />
        </button>
        <h1 className="text-3xl font-medium text-gray-800">Add Driver</h1>
      </div>

      <div className="bg-white p-8 drop-shadow-xl rounded-lg mt-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-gray-800 text-lg font-medium">
                Full Name*
              </label>
              <DefaultInput
                register={register}
                name="fullName"
                placeholder="Enter full name"
                error={errors.fullName}
              />
            </div>

            <div className="space-y-3">
              <label className="block text-gray-800 text-lg font-medium">
                Email*
              </label>
              <EmailInput
                register={register}
                name="email"
                error={errors.email}
              />
            </div>

            <div className="space-y-3">
              <label className="block text-gray-800 text-lg font-medium">
                Password*
              </label>
              <PasswordInput
                register={register}
                name="password"
                placeholder="Enter password"
                error={errors.password}
                type="password"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-gray-800 text-lg font-medium">
                Phone Number
              </label>
              <DefaultInput
                register={register}
                name="phoneNumber"
                placeholder="Enter phone number"
                error={errors.phoneNumber}
                type="tel"
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={isCreating}
              className="bg-purple hover:bg-purple-dark text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              {isCreating ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating...
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  Add Driver
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
