import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use("/api/products", productRoutes); // Example route
app.use("/api/users", userRoutes);

// Error handling
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server Error" });
});

export default app;
