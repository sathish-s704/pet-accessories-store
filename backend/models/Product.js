import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  imageUrl: String, // file path
  inStock: { type: Boolean, default: true }
}, { timestamps: true });
const Product = mongoose.model("Product", productSchema);

export default Product;
