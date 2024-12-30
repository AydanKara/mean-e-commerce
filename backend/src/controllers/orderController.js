import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate({
        path: "orderItems.product",
        select: "_id, name, price, stock, images",
      })
      .exec();

    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }
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
    const user = await User.findById(req.user._id); // Fetch user info

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

export const calculateOrderSummary = async (req, res) => {
  try {
    const { orderItems } = req.body;

    if (!orderItems || !orderItems.length) {
      return res.status(400).json({ message: "Order items are required" });
    }

    const productIds = orderItems.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    let totalPrice = 0;

    orderItems.forEach((item) => {
      const product = products.find(
        (prod) => prod._id.toString() === item.product
      );
      if (!product) {
        throw new Error(`Product not found: ${item.product}`);
      }
      totalPrice += product.price * item.quantity;
    });

    const tax = totalPrice * 0.1; // Example tax calculation
    const shipping = totalPrice > 100 ? 0 : 10; // Free shipping for orders over $100

    res.status(200).json({
      totalPrice,
      tax,
      shipping,
      grandTotal: totalPrice + tax + shipping,
    });
  } catch (error) {
    res.status(500).json({ message: "Error calculating order summary", error });
  }
};

export const getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "orderItems.product",
        select: "_id name price stock",
      })
      .populate({
        path: "user",
        select: "_id fullName	email phone",
      })
      .exec();

    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
