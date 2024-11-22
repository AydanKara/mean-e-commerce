import { Product } from './product.model';

export interface Order {
  _id: string;
  user: string; // User ID
  orderItems: {
    product: Product;
    quantity: number;
    price: number;
  }[];
  shippingInfo: {
    address: string;
    zipCode: string;
    city: string;
    country: string;
  };
  paymentMethod: string;
  status: string; // Example: "Pending", "Shipped", "Delivered"
  totalPrice: number;
  isDelivered: boolean;
  deliveredAt: Date;
  createdAt?: string; // Optional (from timestamps)
  updatedAt?: string; // Optional (from timestamps)
}
