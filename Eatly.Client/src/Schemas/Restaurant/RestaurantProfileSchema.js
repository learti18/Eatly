import * as yup from "yup";

const RestaurantProfileSchema = yup.object({
  name: yup.string().required("Restaurant name is required"),
  description: yup.string().required("Description is required"),
  address: yup.string().required("Address is required"),
  imageFile: yup.mixed().required("image is required"),
  category: yup.number().required("Category is required").integer(),
});

export default RestaurantProfileSchema;
