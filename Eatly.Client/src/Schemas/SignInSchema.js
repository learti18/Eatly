import * as yup from 'yup'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 

export const SignInSchema = yup.object({
    email: yup.string()
            .matches(emailRegex, 'Please enter a valid email')
            .required('Email is required'),
    password: yup.string()
        .required('Password is required')
        .min(8,'Password must be atleast 8 characters'),
}).required()