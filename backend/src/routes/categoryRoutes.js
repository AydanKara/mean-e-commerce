import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllCategories) // Get all products
  .post(protect, admin, createCategory); // Create a new product (Admin only)

router
  .route("/:id")
  .put(protect, admin, updateCategory) // Update a product (Admin only)
  .delete(protect, admin, deleteCategory); // Delete a product (Admin only)

export default router;
