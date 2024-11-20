import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to protect routes
export const protect = async (req, res, next) => {
  let token;

  // Check token in cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Middleware for admin routes
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};
