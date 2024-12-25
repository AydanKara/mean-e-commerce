import { Component, inject, OnInit } from '@angular/core';
import { CartItem } from '../../models/cart.model';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../core/services/snackbar.service';
import { ShopService } from '../../core/services/shop.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent implements OnInit {
  private cartService = inject(CartService);
  private shopService = inject(ShopService);
  private snackbar = inject(SnackbarService);
  cartItems: CartItem[] = [];

  totalPrice: number = 0;

  loading: boolean = false;

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.loading = true;
    const cart = this.cartService.getCart();
    const items = cart?.items || [];
    // Create an array of observables to fetch product stock
    const stockObservables = items.map((item) =>
      this.shopService.getProductById(item._id)
    );

    // Use forkJoin to wait for all API calls to complete
    forkJoin(stockObservables).subscribe({
      next: (products) => {
        this.loading = false;
        this.cartItems = items.map((item, index) => ({
          ...item,
          stock: products[index]?.stock || 0, // Add stock property
        }));
        this.calculateTotalPrice();
      },
      error: (err) => {
        this.loading = false;
        console.error('Error fetching stock data:', err);
      },
    });
  }

  updateCart(item: CartItem) {
    item.quantity = Number(item.quantity);
    if (item.quantity > item.stock) {
      this.snackbar.error('Quantity exceeds available stock!');
      item.quantity = item.stock;
    } else {
      this.cartService.updateQuantity(item._id, item.quantity);
      this.calculateTotalPrice();
      this.snackbar.success(item.name + ' quantity updated!');
    }
  }

  // Update item quantity
  updateQuantity(productId: string, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
    this.ngOnInit(); // Refresh the cart data after updating
  }

  // Remove item from the cart
  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
    // Update the cartItems array directly after removal
    this.cartItems = this.cartItems.filter((item) => item._id !== productId);
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  // Clear cart
  clearCart() {
    this.cartService.clearCart();
    this.ngOnInit(); // Refresh the cart data after clearing
  }
}
