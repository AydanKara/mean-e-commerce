import express from "express";
import {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrderStatus,
  getAllOrdersForAdmin,
} from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import { validateOrder } from "../middleware/validateOrder.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getAllOrders) // Get all orders for logged-in user
  .post(protect, validateOrder, createOrder); // Create a new order

router.route("/admin").get(protect, admin, getAllOrdersForAdmin); // Get all orders (Admin)
router.route("/:id").get(protect, getOrderById); // Get a single order by ID

router.route("/admin/:id").put(protect, admin, updateOrderStatus); // Update order status (Admin)

export default router;
