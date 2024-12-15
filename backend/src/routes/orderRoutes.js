import express from "express";
import {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateOrder } from "../middleware/validateOrder.js";

const router = express.Router();

router.route("/")
  .get(protect, getAllOrders) // Get all orders for logged-in user
  .post(protect, validateOrder, createOrder); // Create a new order

router.route("/:id")
  .get(protect, getOrderById) // Get a single order by ID
  .put(protect, updateOrderStatus); // Update order status (Admin functionality can be added here)

export default router;
