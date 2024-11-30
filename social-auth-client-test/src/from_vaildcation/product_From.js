import * as Yup from "yup";

const productValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must not exceed 50 characters")
    .required("Name is required"),
  price: Yup.number()
    .typeError("Price must be a valid number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  description: Yup.string()
    .max(200, "Description must not exceed 200 characters"),
  inStock: Yup.boolean().required("In Stock is required"),
});

export default productValidationSchema;
