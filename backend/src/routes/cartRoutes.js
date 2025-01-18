import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.patch("/", protect, updateCartItem);
router.delete("/:itemId", protect, removeFromCart);
router.delete("/", protect, clearCart);

export default router;
