export interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  fullName?: string;
  isAdmin: boolean;
  phone?: string;
  shippingInfo?: {
    address?: string;
    zipCode?: string;
    city?: string;
    country?: string;
  };
  avatar?: string;
  wishlist?: string[]; // Representing wishlist as an array of product IDs
  createdAt?: string; // Optional (from timestamps)
  updatedAt?: string; // Optional (from timestamps)
}
