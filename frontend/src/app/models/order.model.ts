export interface Order {
  _id: string;
  user: string; // User ID
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  paymentMethod: string;
  paymentStatus: string; // Example: "Pending", "Shipped", "Delivered"
  totalPrice: number;
  isDelivered: boolean;
  deliveredAt?: Date;
  createdAt?: string; // Optional (from timestamps)
  updatedAt?: string; // Optional (from timestamps)
}

export interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    images: string;
    stock: number;
  };
  quantity: number;
  price: number;
}

export interface ShippingInfo {
  address: string;
  zipCode: string;
  city: string;
  country: string;
}
