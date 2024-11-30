"use client";
import Image from "next/image";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import axios from "axios";

export default function Home() {
  // Correct useState
  const [product, setProduct] = useState([]);

  // Add function
  const add = async (id) => {
    try {
      const response = await axios.post("http://localhost:5005/api/add", { id });
      console.log(response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const newArray = querySnapshot.docs.map((doc) => ({
        firebaseId: doc.id,
        ...doc.data(),
      }));
      setProduct(newArray);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Price</th>
            <th className="px-4 py-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {product.length > 0 ? (
            product.map((obj) => (
              <tr key={obj.firebaseId} className="border-b">
                <td className="px-4 py-2">{obj.firebaseId}</td>
                <td className="px-4 py-2">{obj.name || "N/A"}</td>
                <td className="px-4 py-2">{obj.price || "N/A"}</td>
                <td
                  className="px-4 py-2 text-blue-500 cursor-pointer"
                  onClick={() => add(obj.firebaseId)}
                >
                  Add
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center px-4 py-2">
                <button
                  onClick={fetchProducts}
                  className="px-5 py-2 m-5 bg-blue-500 text-white rounded"
                >
                  Fetch Products
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
