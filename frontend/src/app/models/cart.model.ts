export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  images: string;
  stock: number;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
}
