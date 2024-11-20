import Order from "../models/Order.js";

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "orderItems.product"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingInfo, paymentMethod, totalPrice } = req.body;
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingInfo,
      paymentMethod,
      totalPrice,
    });
    res.status(201).json({ message: "Order created", order });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};
