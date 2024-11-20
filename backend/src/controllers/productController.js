import Product from "../models/Product.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
    });
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error });
  }
};

// Update an existing product
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, stock, category } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, stock, category },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
