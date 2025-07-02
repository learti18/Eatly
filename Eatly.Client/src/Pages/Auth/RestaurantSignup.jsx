import React from "react";
import SignupForm from "../../Components/Auth/SignupForm";
import AuthHero from "../../Components/Auth/AuthHero";
import { SignUpSchema } from "./../../Schemas/SignUpSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import useRegister from "../../Queries/Auth/useRegister";

export default function RestaurantSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
    },
  });
  const registerMutation = useRegister();

  const onSubmit = async (data) => {
    await registerMutation.mutateAsync({ ...data, role: "Restaurant" });
  };

  return (
    <div className="flex relative h-screen">
      <Link to={"/"}>
        <img
          src="Logo.svg"
          className="absolute top-7 left-10 hidden md:block"
        />
      </Link>
      <SignupForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        signupType="restaurant"
        backendError={registerMutation.error}
        isLoading={registerMutation.isPending}
      />
      <AuthHero className="hidden lg:block" />
    </div>
  );
}
