import User from "../models/User.js";

const cookieOptions = {
  httpOnly: true, // Prevent JavaScript access
  secure: process.env.NODE_ENV === "production", // Enable in production
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 60 * 60 * 1000, // 1 hour
};

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = await User.create({
      email,
      username,
      password,
    });

    // Generate JWT token
    const token = user.generateAuthToken();
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    // Store the token in a cookie
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Logout a user
export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    }); // Clear the token cookie
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
  }
};
