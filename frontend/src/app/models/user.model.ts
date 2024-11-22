export interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  fullName?: string;
  phone?: string;
  shippingInfo?: {
    address?: string;
    zipCode?: string;
    city?: string;
    country?: string;
  };
  avatar?: string;
  isAdmin: boolean;
  createdAt?: string; // Optional (from timestamps)
  updatedAt?: string; // Optional (from timestamps)
}
