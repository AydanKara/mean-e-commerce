import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [CartItemSchema],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
