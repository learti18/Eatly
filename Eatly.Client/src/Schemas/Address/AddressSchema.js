import * as yup from "yup";

const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

export const AddressSchema = yup.object({
  streetAddress: yup
    .string()
    .required("Street address is required")
    .min(5, "Address too short")
    .max(200, "Address too long"),
  
  city: yup
    .string()
    .required("City is required")
    .min(2, "City too short")
    .max(100, "City too long")
    .matches(/^[a-zA-Z\s\-'\.]+$/, "Invalid city format"),
  
  state: yup
    .string()
    .required("State is required")
    .min(2, "State too short")
    .max(50, "State too long"),
  
  zipCode: yup
    .string()
    .required("ZIP code is required")
    .matches(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),
  
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegex, "Invalid phone number"),
  
  latitude: yup
    .number()
    .required("Select location on map")
    .min(-90, "Invalid latitude")
    .max(90, "Invalid latitude"),
  
  longitude: yup
    .number()
    .required("Select location on map")
    .min(-180, "Invalid longitude")
    .max(180, "Invalid longitude"),
  
  isDefault: yup.boolean().nullable(),
});
