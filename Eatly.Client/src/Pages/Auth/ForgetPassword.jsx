import React from "react";
import { useForm } from "react-hook-form";
import AuthHero from "../../components/Auth/AuthHero";
import ForgetPasswordForm from "../../components/Auth/ForgetPasswordForm";
import { Link } from "react-router-dom";
import useLogin from "./../../Queries/Auth/useLogin";

export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const loginMutation = useLogin();

  const onSubmit = async (data) => {
    console.log(data);
    await loginMutation.mutateAsync(data);
  };

  return (
    <div className="flex relative min-h-screen">
      <Link to={"/"}>
        <img src="Logo.svg" className="absolute top-7 left-10" />
      </Link>
      <ForgetPasswordForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />
      <AuthHero className="hidden md:block" />
    </div>
  );
}
