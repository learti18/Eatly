import React from 'react'
import SignupForm from '../../Components/Auth/SignupForm'
import AuthHero from '../../Components/Auth/AuthHero'
import { SignUpSchema } from './../../Schemas/SignUpSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useRegister from './../../Queries/useRegister';

export default function Signup() {
  const { register, handleSubmit, formState:{errors} } = useForm({
    resolver: yupResolver(SignUpSchema),
    defaultValues:{
      username: '',
      email: '',
      password:'',
    }
  })
  const registerMutation = useRegister()

  const onSubmit = async (data) => {
    await registerMutation.mutateAsync(data)
  }
  return (
    <div className='flex relative h-screen'>
      <img src="Logo.svg" className='absolute top-7 left-10' />
      <SignupForm
         register={register}
         handleSubmit={handleSubmit}
         onSubmit={onSubmit}
         errors={errors}
      />
      <AuthHero className="hidden lg:block" />
    </div>
  )
}
