import Category from "../models/Category.js";
import Product from "../models/Product.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    // Search products
    const { keyword, category, subcategory, price, sort } = req.query;

    // Construct filter
    const filter = {};
    if (category) {
      const categoryDoc = await Category.findOne({ name: category });
      if (categoryDoc) filter.category = categoryDoc._id;
    }
    if (subcategory) {
      filter.subcategory = subcategory;
    }
    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    // Filter by price range (if provided)
    if (price) {
      const [minPrice, maxPrice] = price.split("-");
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }

    // Sort by price, rating, or relevance
    const sortQuery = {};
    if (sort === "price") {
      sortQuery.price = 1; // Ascending order
    } else if (sort === "price_desc") {
      sortQuery.price = -1; // Descending order
    } else if (sort === "rating") {
      sortQuery.ratings = -1; // Sort by ratings in descending order
    } else if (sort === "relevance") {
      sortQuery.createdAt = -1; // Sort by relevance (newest first)
    }

    // Pagination
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageSize;

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / pageSize);

    const products = await Product.find(filter)
      .populate("category", "name")
      .sort(sortQuery)
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      success: true,
      products,
      currentPage: pageNumber,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
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
    const { name, description, price, category, stock, images, isFeatured } =
      req.body;
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      images,
      isFeatured,
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
