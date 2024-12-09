import Category from "../models/Category.js";
import Product from "../models/Product.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    // Search products
    const { keyword, category, gender, brand, price, sort } = req.query;

    // Construct filter
    const filter = {};
    if (category) {
      const categories = category.split(", ");
      const categoryDocs = await Category.find({ name: { $in: categories } });
      const categoryIds = categoryDocs.map((cat) => cat._id);
      filter.category = { $in: categoryIds };
    }
    if (brand) {
      const brands = brand.split(", ");
      filter.brand = { $in: brands.map((b) => new RegExp(b, "i")) };
    }

    if (gender) {
      const genders = gender.split(", ");
      filter.gender = { $in: genders.map((g) => new RegExp(g, "i")) };
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
    if (sort === "price_asc") {
      sortQuery.price = 1; // Ascending order
    } else if (sort === "price_desc") {
      sortQuery.price = -1; // Descending order
    } else if (sort === "rating") {
      sortQuery.ratings = -1; // Sort by ratings in descending order
    } else if (sort === "relevance") {
      sortQuery.createdAt = -1; // Sort by relevance (newest first)
    } else if (sort === "name_asc") {
      sortQuery.name = 1; // Alphabetical order (A-Z)
    } else if (sort === "name_desc") {
      sortQuery.name = -1; // Reverse alphabetical order (Z-A)
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
      totalProducts,
      currentPage: pageNumber,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get newest products (limited to 6 items)
export const getNewProducts = async (req, res) => {
  try {
    const newProducts = await Product.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(6) // Limit to 6 items
      .populate("category", "name");

    res.status(200).json({ success: true, newProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name"
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Get related products
export const getRelatedProducts = async (req, res) => {
  try {
    // Find the current product to fetch its category, brand, etc.
    const currentProduct = await Product.findById(req.params.id);
    if (!currentProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Build a filter for related products
    const filter = {
      _id: { $ne: req.params.id }, // Exclude the current product
      category: currentProduct.category, // Match category
    };

    // Optionally include brand or gender if needed
    if (currentProduct.brand) {
      filter.brand = currentProduct.brand;
    }
    if (currentProduct.gender) {
      filter.gender = currentProduct.gender;
    }

    // Fetch related products (limit to a few products for recommendations)
    const relatedProducts = await Product.find(filter)
      .limit(4) // Adjust the limit as per your UI design
      .populate("category", "name");

    res.status(200).json({
      success: true,
      relatedProducts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Create a new product
/* export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      gender,
      brand,
      stock,
      images,
      isFeatured,
    } = req.body;
    const product = new Product({
      name,
      description,
      price,
      category,
      gender,
      brand,
      stock,
      images,
      isFeatured,
    });
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error });
  }
}; */

// Update an existing product
/* export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, stock, category, gender, brand, images } =
      req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, stock, category, gender, brand, images },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
}; */

// Delete a product
/* export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
}; */

// Get unique brands
export const getUniqueBrands = async (req, res) => {
  try {
    const brands = await Product.distinct("brand"); // Fetch distinct brands from the Product collection
    res.status(200).json({ success: true, brands });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get unique genders
export const getUniqueGenders = async (req, res) => {
  try {
    const genders = await Product.distinct("gender"); // Fetch distinct genders from the Product collection
    res.status(200).json({ success: true, genders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

//! Admin 
// Create a new product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      gender,
      brand,
      stock,
      images,
      isFeatured,
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !gender || !brand || !stock) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    console.log(category)
    // Validate the category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Invalid category ID" });
    }

    // Create the product
    const product = new Product({
      name,
      description,
      price,
      category,
      gender,
      brand,
      stock,
      images,
      isFeatured,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

// Update an existing product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate category if updated
    if (updates.category) {
      const categoryExists = await Category.findById(updates.category);
      if (!categoryExists) {
        return res.status(404).json({ message: "Invalid category ID" });
      }
    }

    // Update the product
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the product
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};


