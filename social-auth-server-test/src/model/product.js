// models/Product.js
const mongoose = require("mongoose");
const { string } = require("yup");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  firebaseId:{
    type:String,
    required:true
  }
});
const Product =mongoose.model("Product", ProductSchema);

module.exports = Product;