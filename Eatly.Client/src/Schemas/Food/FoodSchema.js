import * as yup from "yup";

export const AddFoodSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name too short")
    .max(100, "Name too long"),
  
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive")
    .typeError("Price must be a valid number")
    .min(0.01, "Minimum price is $0.01")
    .max(10000, "Maximum price is $10,000"),
  
  averagePreparationTime: yup
    .number()
    .required("Prep time is required")
    .positive("Prep time must be positive")
    .typeError("Prep time must be a number")
    .min(1, "Minimum 1 minute")
    .max(240, "Maximum 4 hours"),
  
  type: yup
    .number()
    .required("Food type is required")
    .typeError("Please select a food type"),
  
  slogan: yup
    .string()
    .max(200, "Slogan too long"),
  
  calories: yup
    .number()
    .nullable()
    .transform((value, originalValue) => originalValue === "" ? null : value)
    .positive("Calories must be positive")
    .typeError("Calories must be a number")
    .min(1, "Minimum 1 calorie")
    .max(10000, "Maximum 10,000 calories"),
  
  ingredients: yup
    .array()
    .of(yup.number().integer()),
  
  imageFile: yup
    .mixed()
    .required("Image is required")
    .test("fileSize", "Image too large (max 10MB)", (value) => {
      if (!value || !value[0]) return false;
      return value[0].size <= 10 * 1024 * 1024; // 10MB
    })
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value || !value[0]) return false;
      return value[0].type.startsWith("image/");
    }),
});

export const EditFoodSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name too short")
    .max(100, "Name too long"),
  
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive")
    .typeError("Price must be a valid number")
    .min(0.01, "Minimum price is $0.01")
    .max(10000, "Maximum price is $10,000"),
  
  averagePreparationTime: yup
    .number()
    .required("Prep time is required")
    .positive("Prep time must be positive")
    .typeError("Prep time must be a number")
    .min(1, "Minimum 1 minute")
    .max(240, "Maximum 4 hours"),
  
  type: yup
    .number()
    .required("Food type is required")
    .typeError("Please select a food type"),
  
  slogan: yup
    .string()
    .max(200, "Slogan too long"),
  
  calories: yup
    .number()
    .nullable()
    .transform((value, originalValue) => originalValue === "" ? null : value)
    .positive("Calories must be positive")
    .typeError("Calories must be a number")
    .min(1, "Minimum 1 calorie")
    .max(10000, "Maximum 10,000 calories"),
  
  ingredients: yup
    .array()
    .of(yup.number().integer())
    .min(1, "Select at least one ingredient"),
  
  imageFile: yup
    .mixed()
    .nullable()
    .test("fileSize", "Image too large (max 10MB)", (value) => {
      if (!value || !value[0]) return true; // Optional for edit
      return value[0].size <= 10 * 1024 * 1024; // 10MB
    })
    .test("fileType", "Only image files allowed", (value) => {
      if (!value || !value[0]) return true; // Optional for edit
      return value[0].type.startsWith("image/");
    }),
});
