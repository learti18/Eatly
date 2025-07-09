import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema } from "../../Schemas/SignInSchema";
import SigninForm from "../../components/Auth/SigninForm";
import AuthHero from "../../components/Auth/AuthHero";
import { Link } from "react-router-dom";
import useLogin from "../../Queries/Auth/useLogin";
import { motion } from "framer-motion";
import PageTransition from "../../components/Shared/PageTransition";

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
    loginMutation.mutate(data);
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <PageTransition>
      <div className="flex relative min-h-screen bg-background-main">
        <motion.div initial="hidden" animate="visible" variants={logoVariants}>
          <Link to={"/"}>
            <motion.img
              src="Logo.svg"
              className="absolute top-7 left-10 hidden md:block"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
            />
          </Link>
        </motion.div>
        <SigninForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          loginMutation={loginMutation}
        />
        <AuthHero className="hidden lg:block" />
      </div>
    </PageTransition>
  );
}
