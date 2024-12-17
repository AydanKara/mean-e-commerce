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
    const { email, fullName, password } = req.body;
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
