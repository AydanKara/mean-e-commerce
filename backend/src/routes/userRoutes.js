import express from "express";
import {
  addToWishlist,
  createUser,
  getAllUsers,
  getWishlist,
  removeFromWishlist,
  toggleAdminStatus,
  updateUser,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.patch("/update", protect, updateUser);

router
  .route("/:userId/wishlist")
  .get(protect, getWishlist)
  .post(protect, addToWishlist)
  .delete(protect, removeFromWishlist);

// Get all users and toggle admin status (Admin only)
router.get("/", protect, admin, getAllUsers);
router.patch("/:userId", protect, admin, toggleAdminStatus);

export default router;
