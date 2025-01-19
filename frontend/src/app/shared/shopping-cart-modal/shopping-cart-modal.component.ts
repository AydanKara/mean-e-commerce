import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../models/cart.model';
import { CartService } from '../../core/services/cart.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart-modal',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatDialogContent,
  ],
  templateUrl: './shopping-cart-modal.component.html',
  styleUrls: ['./shopping-cart-modal.component.css'],
})
export class ShoppingCartModalComponent implements OnInit {
  private cartService = inject(CartService);
  private snackbar = inject(SnackbarService);
  private cdr = inject(ChangeDetectorRef);

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  loading: boolean = true;
  private cartSubscription!: Subscription;

  constructor(private dialogRef: MatDialogRef<ShoppingCartModalComponent>) {}

  ngOnInit(): void {
    this.subscribeToCart();
  }

  // Subscribe to cart updates from the service
  private subscribeToCart() {
    this.cartSubscription = this.cartService.getCartObservable().subscribe({
      next: (cart) => {
        this.cartItems = cart.items || [];
        this.totalPrice = cart.totalPrice;
        this.loading = false;
        this.cdr.detectChanges(); // Ensure UI reflects the changes
      },
      error: () => {
        this.snackbar.error('Error loading cart.');
        this.loading = false;
      },
    });
  }

  // Update item quantity
  updateCart(item: CartItem) {
    if (item.quantity > item.stock) {
      this.snackbar.error('Quantity exceeds available stock!');
      item.quantity = item.stock;
    } else {
      this.cartService.updateQuantity(item._id, item.quantity);
      this.snackbar.success(`${item.name} quantity updated!`);
    }
  }

  // Get available quantities for dropdown
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

  // Close the modal
  closeModal() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe(); // Cleanup subscription
    }
  }
}
