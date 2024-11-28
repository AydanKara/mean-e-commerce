import { Category } from "./category.model";

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  gender: string;
  brand: string;
  stock: number;
  ratings: number;
  numReviews: number;
  images: [{ url: string }];
  isFeatured: boolean;
  createdAt?: string; // Optional (from timestamps)
  updatedAt?: string; // Optional (from timestamps)
}
