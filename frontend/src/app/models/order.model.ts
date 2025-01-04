export interface Order {
  _id: string;
  user: User;
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  paymentMethod: string;
  paymentStatus: string; // Example: "Pending", "Paid", "Refunded"
  orderStatus: string; // Example: "Processing", "Shipped", "Delivered", "Cancelled"
  totalPrice: number;
  isDelivered: boolean;
  deliveredAt?: Date;
  createdAt?: string; // Optional (from timestamps)
  updatedAt?: string; // Optional (from timestamps)
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface ShippingInfo {
  address: string;
  zipCode: string;
  city: string;
  country: string;
}

interface User {
  _id: string;
  email: string;
  fullName: string;
  phone: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  images: string;
  stock: number;
}
