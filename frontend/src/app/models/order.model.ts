import { Product } from './product.model';

export interface Order {
  _id: string;
  user: string; // User ID
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  paymentMethod: string;
  status: string; // Example: "Pending", "Shipped", "Delivered"
  totalPrice: number;
  isDelivered: boolean;
  deliveredAt?: Date;
  createdAt?: string; // Optional (from timestamps)
  updatedAt?: string; // Optional (from timestamps)
}

export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}

export interface ShippingInfo {
  address: string;
  zipCode: string;
  city: string;
  country: string;
}
