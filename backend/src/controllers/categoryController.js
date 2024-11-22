import Category from "../models/Category.js";

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, subcategories } = req.body;

    const category = new Category({ name, subcategories });
    await category.save();

    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const { name, subcategories } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, subcategories },
      { new: true }
    );

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add a subcategory
export const addSubCategory = async (req, res) => {
  try {
    const { subcategory } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    if (!category.subcategories.includes(subcategory)) {
      category.subcategories.push(subcategory);
      await category.save();
    }

    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
