import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getUniqueBrands,
  getUniqueGenders,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProducts) // Get all products
  .post(protect, admin, createProduct); // Create a new product (Admin only)

router.route("/brands").get(getUniqueBrands); // Get all products with unique brands
router.route("/genders").get(getUniqueGenders); // Get all products with unique genders
router
  .route("/:id")
  .get(getProductById) // Get a single product by ID
  .put(protect, admin, updateProduct) // Update a product (Admin only)
  .delete(protect, admin, deleteProduct); // Delete a product (Admin only)

export default router;
