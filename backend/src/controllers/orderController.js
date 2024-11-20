import Order from "../models/Order.js";

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "username email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { user, orderItems, shippingInfo, paymentMethod, totalPrice } =
      req.body;

    const order = new Order({
      user,
      orderItems,
      shippingInfo,
      paymentMethod,
      totalPrice,
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(400).json({ message: "Error placing order", error });
  }
};
