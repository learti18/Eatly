import * as yup from 'yup'

export const SignInSchema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string()
        .required('Password is required')
        .min(8,'Password must be atleast 8 characters'),
}).required()