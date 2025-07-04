import * as yup from "yup";

export const driverSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  fullName: yup.string().required("Full name is required"),
  phoneNumber: yup.string().nullable(),
});