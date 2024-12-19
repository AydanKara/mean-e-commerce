import Product from "../models/Product.js";
import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      username,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { email, fullName, password, phone, shippingInfo } = req.body;
    const userId = req.user._id;
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    if (email && email !== user.email) {
      // Check if email already exists
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email is already in use." });
      }
      user.email = email;
    }
    if (fullName) user.fullName = fullName;

    // Update phone number if provided
    if (phone) {
      // Simple validation for phone numbers (adjust the regex if needed)
      const phoneRegex = /^[0-9]{10,15}$/;
      if (!phoneRegex.test(phone)) {
        return res
          .status(400)
          .json({ message: "Invalid phone number format." });
      }
      user.phone = phone;
    }

    // Update shipping info if provided
    if (shippingInfo) {
      const { address, zipCode, city, country } = shippingInfo;

      if (!address || !zipCode || !city || !country) {
        return res.status(400).json({
          message: "Incomplete shipping information. All fields are required.",
        });
      }

      // Optional validation for zip code
      const zipRegex = /^\d{5}$/; // Example: 5-digit zip code
      if (!zipRegex.test(zipCode)) {
        return res.status(400).json({ message: "Invalid zip code format." });
      }

      user.shippingInfo = {
        address,
        zipCode,
        city,
        country,
      };
    }

    // Only update the password if a new one is provided
    if (password) {
      user.password = password;
    }

    await user.save(); // Save the updated user

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error });
  }
};

// Get All Wishlists
export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the user and populate the wishlist with product details
    const user = await User.findById(userId).populate("wishlist");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Add to Wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    // Ensure the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Find the user and update their wishlist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.wishlist.includes(productId)) {
      return res
        .status(400)
        .json({ message: "Product is already in the wishlist." });
    }

    user.wishlist.push(productId);
    await user.save();

    res
      .status(200)
      .json({ message: "Product added to wishlist.", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Remove from Wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;
    console.log(userId);
    // Find the user and update their wishlist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.wishlist.includes(productId)) {
      console.log(productId);
      return res
        .status(400)
        .json({ message: "Product is not in the wishlist." });
    }

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();

    res.status(200).json({
      message: "Product removed from wishlist.",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log("Users fetched: ", users); // Add this log to debug
    res.status(200).json({ success: true, users }); // Return success flag
  } catch (error) {
    console.error("Error fetching users: ", error); // Log the error on the backend
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve users", error });
  }
};

// Toggle Admin status
export const toggleAdminStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle the admin status
    user.isAdmin = !user.isAdmin;
    await user.save();

    res.status(200).json({
      message: `User admin status updated to ${
        user.isAdmin ? "Admin" : "User"
      }`,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update admin status", error });
  }
};
