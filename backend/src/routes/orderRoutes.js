import express from "express";
import { getAllOrders, createOrder } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllOrders); // Fetch all orders
router.post("/", protect, createOrder); // Place a new order

export default router;
