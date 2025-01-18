import Cart from "../models/Cart.js";

// Get the user's cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ userId, items: [], totalPrice: 0 });
      await cart.save();
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add an item to the cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { _id, name, price, quantity, images, stock } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 });
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find((item) => item._id.toString() === _id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ _id, name, price, quantity, images, stock });
    }

    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update item quantity
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.find((item) => item._id.toString() === productId);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    // Update item quantity
    item.quantity = quantity;

    // Recalculate total price
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Remove an item from the cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Filter out the item to be removed
    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);

    // Recalculate total price
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Clear the cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
