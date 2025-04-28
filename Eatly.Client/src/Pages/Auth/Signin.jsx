import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema } from "../../Schemas/SignInSchema";
import useLogin from "./../../Queries/useLogin";
import { getCurrentUserName } from "../../Utils/UserStore";
import SigninForm from "../../Components/Auth/SigninForm";
import AuthHero from "../../Components/Auth/AuthHero";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      username: getCurrentUserName() || "",
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
      <img src="Logo.svg" className="absolute top-7 left-10 hidden md:block" />
      <SigninForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />
      <AuthHero className="hidden lg:block" />
    </div>
  );
}
