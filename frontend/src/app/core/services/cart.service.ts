import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Cart, CartItem } from '../../models/cart.model';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private snackbar = inject(SnackbarService);
  private baseUrl = `${environment.apiUrl}/cart`;
  private cartSubject = new BehaviorSubject<Cart>({ items: [], totalPrice: 0 });

  private isCartLoadingSubject = new BehaviorSubject<boolean>(true);
  isCartLoading$ = this.isCartLoadingSubject.asObservable();

  constructor() {
    // Load user cart if authenticated
    this.loadCartFromBackend();
  }

  // Load the cart for the authenticated user
  loadCartFromBackend() {
    this.http
      .get<{ success: boolean; cart: Cart }>(this.baseUrl, {
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          const validCart = response.cart || { items: [], totalPrice: 0 };
          this.cartSubject.next(validCart);
          this.isCartLoadingSubject.next(false);
        },
        error: () => {
          const emptyCart = { items: [], totalPrice: 0 };
          this.cartSubject.next(emptyCart);
          this.isCartLoadingSubject.next(false);
        },
      });
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  // Add item to the cart (sync with backend)
  addToCart(product: CartItem): void {
    this.http
      .post<CartItem>(this.baseUrl, product, { withCredentials: true })
      .subscribe({
        next: () => {
          let cart = this.cartSubject.getValue();
          if (!cart) {
            cart = { items: [], totalPrice: 0 };
          }

          cart.items = cart.items || [];

          const existingItem = cart.items.find(
            (item) => item._id === product._id
          );
          if (existingItem) {
            existingItem.quantity += product.quantity;
          } else {
            cart.items.push(product);
          }
          this.updateTotalPrice(cart);
          this.cartSubject.next(cart);
        },
        error: () => {
          this.snackbar.error('Error adding item to the cart.');
        },
      });
  }

  // Remove item from the cart (sync with backend)
  removeFromCart(productId: string): void {
    this.http
      .delete(`${this.baseUrl}/${productId}`, { withCredentials: true })
      .subscribe({
        next: () => {
          const cart = this.cartSubject.getValue();
          cart.items = cart.items.filter((item) => item._id !== productId);
          this.updateTotalPrice(cart);
          this.cartSubject.next(cart);
        },
        error: () => {
          this.snackbar.error('Error removing item from the cart.');
        },
      });
  }

  // Update item quantity (sync with backend)
  updateQuantity(productId: string, quantity: number): void {
    this.http
      .patch<CartItem>(
        `${this.baseUrl}`,
        { productId, quantity },
        { withCredentials: true }
      )
      .subscribe({
        next: () => {
          const cart = this.cartSubject.getValue();
          const item = cart.items.find((item) => item._id === productId);
          if (item) {
            item.quantity = +quantity;
            this.updateTotalPrice(cart);
            this.cartSubject.next(cart);
          }
        },
        error: (error) => {
          this.snackbar.error('Error updating item quantity.');
          console.error(error.message);
        },
      });
  }

  // Clear cart (sync with backend)
  clearCart(): void {
    this.http.delete(this.baseUrl, { withCredentials: true }).subscribe({
      next: () => {
        this.cartSubject.next({ items: [], totalPrice: 0 });
      },
      error: () => {
        this.snackbar.error('Error clearing the cart.');
      },
    });
  }

  private updateTotalPrice(cart: Cart) {
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  resetCartState(): void {
    const emptyCart = { items: [], totalPrice: 0 };
    this.cartSubject.next(emptyCart);
  }

  getTotalQuantityObservable(): Observable<number> {
    return this.cartSubject.asObservable().pipe(
      map((cart) => {
        const items = cart?.items || [];
        return items.reduce((total, item) => total + item.quantity, 0);
      })
    );
  }
}
