import express from "express";
import { createUser, updateUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.patch("/update", protect, updateUser);

export default router;
