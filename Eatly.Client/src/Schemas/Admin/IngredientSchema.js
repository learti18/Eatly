import * as yup from "yup";

export const AddIngredientSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name too short")
    .max(50, "Name too long")
    .matches(/^[a-zA-Z\s]+$/, "Letters and spaces only"),
  
  backgroundColor: yup
    .string()
    .required("Color is required")
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  
  imageFile: yup
    .mixed()
    .required("Image is required")
    .test("fileSize", "Image too large (max 5MB)", (value) => {
      if (!value || !value[0]) return false;
      return value[0].size <= 5 * 1024 * 1024; // 5MB
    })
    .test("fileType", "Only image files allowed", (value) => {
      if (!value || !value[0]) return false;
      return value[0].type.startsWith("image/");
    }),
});

export const EditIngredientSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name too short")
    .max(50, "Name too long")
    .matches(/^[a-zA-Z\s]+$/, "Letters and spaces only"),
  
  backgroundColor: yup
    .string()
    .required("Color is required")
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  
  imageFile: yup
    .mixed()
    .nullable()
    .test("fileSize", "Image too large (max 5MB)", (value) => {
      if (!value || !value[0]) return true; // Optional for edit
      return value[0].size <= 5 * 1024 * 1024; // 5MB
    })
    .test("fileType", "Only image files allowed", (value) => {
      if (!value || !value[0]) return true; // Optional for edit
      return value[0].type.startsWith("image/");
    }),
});
