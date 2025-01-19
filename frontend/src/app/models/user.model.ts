export interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  fullName?: string;
  isAdmin: boolean;
  phone?: string;
  shippingInfo?: ShippingInfo;
  avatar?: string;
  wishlist?: string[]; // Representing wishlist as an array of product IDs
  createdAt?: string; // Optional (from timestamps)
  updatedAt?: string; // Optional (from timestamps)
}

interface ShippingInfo {
  address?: string;
  zipCode?: string;
  city?: string;
  country?: string;
}
