import React from "react";
import SignupForm from "../../components/Auth/SignupForm";
import AuthHero from "../../components/Auth/AuthHero";
import { SignUpSchema } from "./../../Schemas/SignUpSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import useRegister from "./../../Queries/Auth/useRegister";

export default function Signup() {
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
    await registerMutation.mutateAsync(data);
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
        signupType="client"
        backendError={registerMutation.error}
        isLoading={registerMutation.isPending}
      />
      <AuthHero className="hidden lg:block" />
    </div>
  );
}
