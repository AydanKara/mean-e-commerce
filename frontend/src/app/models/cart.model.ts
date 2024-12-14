export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
}
