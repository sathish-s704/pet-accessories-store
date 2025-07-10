import Product from "../models/Product.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const product = await Product.create({ name, description, price, category, imageUrl });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get Single Product
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// Update Product
export const updateProduct = async (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const imageUrl = req.file ? req.file.path : undefined;

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { name, description, price, category, inStock, ...(imageUrl && { imageUrl }) },
    { new: true }
  );

  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// Delete Product
export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted" });
};
