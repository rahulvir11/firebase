"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import productValidationSchema from "@/from_vaildcation/product_From"; // Ensure the correct path to your validation schema
import {db} from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";
import axios from "axios";

const Form = () => {
  const [err, setErr] = useState("");
  useEffect(()=>{
    setTimeout(()=>{
        setErr("");
    },1500)
  },[err])
  const initialValues = {
    name: "",
    price: "",
    description: "",
    inStock: true,
  };

  // Function to handle adding the product
  const _addProduct = async (values, { resetForm }) => {
    try {
      // console.log("Submitting product:", values);
      const docRef = await addDoc(collection(db, "products"), values);
      
      // Replace with your actual API endpoint
      let payload = {
        data:{...values, firebaseId: docRef.id}
      }
      const response = await axios.post("http://localhost:5005/api/product", payload);
      console.log('response from api : ', response)
      alert("Product added successfully!");
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error adding product:", error);
      setErr("Failed to add product. Please try again.");
    }
  };

  // Formik configuration
  const formik = useFormik({
    initialValues,
    validationSchema: productValidationSchema,
    onSubmit: _addProduct,
  });
 
 
  return (
    <div className="w-2/6 mx-auto bg-white shadow-md rounded-lg p-6 mt-10 autofill:text-orange-300">
      <h1 className="text-2xl font-bold  text-gray-800 ">Add Product</h1>

      {/* Error display */}
      <p className="text-red-500 text-sm  h-5 w-fit">{err}</p>

      <form onSubmit={formik.handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Price Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price:</label>
          <input
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.touched.price && formik.errors.price && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
          )}
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
          )}
        </div>

        {/* In Stock Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="inStock"
              checked={formik.values.inStock}
              onChange={formik.handleChange}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">In Stock</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Product
        </button>
      </form>
      
  

    </div>
  );
};

export default Form;
