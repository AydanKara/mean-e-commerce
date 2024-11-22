import { Schema, model } from "mongoose";
import Category from "./Category.js";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: String,
      validate: {
        validator: async function (value) {
          const category = await Category.findById(this.category);
          return category?.subcategories.includes(value);
        },
        message: "Invalid subcategory for the selected category",
      },
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
