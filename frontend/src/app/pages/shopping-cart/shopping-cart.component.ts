import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from '../../models/cart.model';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../core/services/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  standalone: true, // Ensures this component can be imported directly if needed
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'], // Corrected `styleUrl` typo
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  private cartService = inject(CartService);
  private snackbar = inject(SnackbarService);

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  loading: boolean = true;

  private cartSubscription!: Subscription;

  ngOnInit(): void {
    this.subscribeToCart();
  }

  // Subscribe to the cart observable to load items in real time
  private subscribeToCart() {
    this.cartSubscription = this.cartService.getCartObservable().subscribe({
      next: (cart) => {
        this.cartItems = cart.items || [];
        this.totalPrice = cart.totalPrice;
        this.loading = false;
      },
      error: () => {
        this.snackbar.error('Error loading the cart.');
        this.loading = false;
      },
    });
  }

  // Update item quantity and sync with backend
  updateCart(item: CartItem) {
    if (item.quantity > item.stock) {
      this.snackbar.error('Quantity exceeds available stock!');
      item.quantity = item.stock;
    } else {
      this.cartService.updateQuantity(item._id, item.quantity);
      this.snackbar.success(`${item.name} quantity updated!`);
    }
  }

  // Get available quantities for a dropdown selector
  getAvailableQuantities(item: CartItem): number[] {
    return Array.from({ length: item.stock }, (_, i) => i + 1);
  }

  // Remove an item from the cart
  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
    this.snackbar.success('Item removed from the cart!');
  }

  // Clear the entire cart
  clearCart() {
    this.cartService.clearCart();
    this.snackbar.success('Cart cleared!');
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe(); // Clean up subscription
    }
  }
}
