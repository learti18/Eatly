import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema } from "../../Schemas/SignInSchema";
import SigninForm from "../../components/Auth/SigninForm";
import AuthHero from "../../components/Auth/AuthHero";
import { Link } from "react-router-dom";
import useLogin from "../../Queries/Auth/useLogin";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const loginMutation = useLogin();

  const onSubmit = async (data) => {
    console.log(data);
    await loginMutation.mutateAsync(data);
  };

  return (
    <div className="flex relative min-h-screen bg-background-main">
      <Link to={"/"}>
        <img
          src="Logo.svg"
          className="absolute top-7 left-10 hidden md:block"
        />
      </Link>
      <SigninForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        loginMutation={loginMutation}
      />
      <AuthHero className="hidden lg:block" />
    </div>
  );
}
