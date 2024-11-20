import express from "express";
import { getAllOrders, createOrder } from "../controllers/orderController.js";

const router = express.Router();

router.get("/", getAllOrders); // Fetch all orders
router.post("/", createOrder); // Place a new order

export default router;
