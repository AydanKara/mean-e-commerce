import { inject, Injectable } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/orders`;
  private cartKey = 'cart'; // Key to store the cart in localStorage
  private cart: Cart = { items: [], totalPrice: 0 };
  private cartSubject = new BehaviorSubject<Cart>(this.cart);

  constructor() {
    this.loadCart();
  }

  // Load the cart from localStorage
  private loadCart() {
    const cartFromStorage = localStorage.getItem(this.cartKey);
    if (cartFromStorage) {
      this.cart = JSON.parse(cartFromStorage);
    }
    this.cartSubject.next(this.cart);
  }

  getCartObservable() {
    return this.cartSubject.asObservable();
  }

  // Save the cart to localStorage
  private saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
    this.cartSubject.next(this.cart);
  }

  // Add item to the cart
  addToCart(product: CartItem): void {
    const existingItem = this.cart.items.find(
      (item) => item._id === product._id
    );
    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      this.cart.items.push(product);
    }
    this.updateTotalPrice();
    this.saveCart();
  }

  // Remove item from the cart
  removeFromCart(productId: string): void {
    this.cart.items = this.cart.items.filter(
      (item) => item._id !== productId
    );
    this.updateTotalPrice();
    this.saveCart();
  }

  // Update item quantity
  updateQuantity(productId: string, quantity: number): void {
    const item = this.cart.items.find((item) => item._id === productId);
    if (item) {
      item.quantity = quantity;
      this.updateTotalPrice();
      this.saveCart();
    }
  }

  // Update total price
  private updateTotalPrice() {
    this.cart.totalPrice = this.cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  // Get the cart items
  getCart(): Cart {
    return this.cart;
  }

  // Get total quantity of items in the cart
  getTotalQuantity(): number {
    return this.cart.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalQuantityObservable(): Observable<number> {
    return this.cartSubject
      .asObservable()
      .pipe(
        map((cart) =>
          cart.items.reduce((total, item) => total + item.quantity, 0)
        )
      );
  }

  // Clear the cart
  clearCart(): void {
    this.cart = { items: [], totalPrice: 0 };
    this.saveCart();
  }

  checkout(order: Order): Observable<Object> {
    return this.http.post(this.baseUrl, order, { withCredentials: true });
  }
}
