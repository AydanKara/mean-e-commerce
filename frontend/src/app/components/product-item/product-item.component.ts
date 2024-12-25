import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CartService } from '../../core/services/cart.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-product-item',
  imports: [CommonModule, CurrencyPipe, RouterLink, MatIcon],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent implements OnInit {
  private userService = inject(UserService);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);
  private snackbar = inject(SnackbarService);

  @Input() product?: Product;
  userId: string | null = null;
  wishlist: string[] = []; // Store user's wishlist

  ngOnInit(): void {
    this.userService.getAuthState().subscribe((user) => {
      this.userId = user?._id ?? null;

      if (this.userId) {
        // Fetch the initial wishlist
        this.wishlistService.getWishlist(this.userId).subscribe((wishlist) => {
          const wishlistIds = wishlist.map((product) => product._id);
          this.wishlistService.setWishlist(wishlistIds);
        });
        // Subscribe to wishlist updates
        this.wishlistService.wishlist$.subscribe((wishlist) => {
          this.wishlist = wishlist;
        });
      }
    });
  }

  addToCart() {
    if (!this.product) return;

    const cartItem = {
      _id: this.product._id,
      name: this.product.name,
      price: this.product.price,
      quantity: 1,
      images: this.product.images[0],
      stock: this.product.stock,
    };

    this.cartService.addToCart(cartItem);
    this.snackbar.success(this.product.name + ' added to cart!');
  }

  // Check if the product is in the user's wishlist
  isFavorite(productId: string): boolean {
    return this.wishlist?.includes(productId);
  }

  // Add or remove a product from the wishlist
  toggleFavorite(productId: string): void {
    if (!this.userId) {
      this.snackbar.error('Please log in to manage your wishlist.');
      return;
    }

    if (this.isFavorite(productId)) {
      // Remove from wishlist
      this.wishlistService
        .removeFromWishlist(this.userId, productId)
        .subscribe({
          next: (response) => {
            this.wishlist = this.wishlist.filter((id) => id !== productId); // Update local wishlist
            this.snackbar.success(
              `${this.product?.name} removed from favorites!`
            );
          },
          error: (error) => {
            this.snackbar.error(error.message);
          },
        });
    } else {
      // Add to wishlist
      this.wishlistService.addToWishlist(this.userId, productId).subscribe({
        next: (response) => {
          this.wishlist.push(productId); // Update local wishlist
          this.snackbar.success(`${this.product?.name} added to favorites!`);
        },
        error: (error) => {
          this.snackbar.error(error.message);
        },
      });
    }
  }
}
