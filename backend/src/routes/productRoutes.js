import express from "express";
import { getAllProducts, createProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts); // Fetch all products
router.post("/", createProduct); // Create a new product

export default router;
