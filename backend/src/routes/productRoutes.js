import express from "express";
const router = express.Router();

// Example GET route
router.get("/", (req, res) => {
  res.json({ message: "List of products" });
});

export default router;
