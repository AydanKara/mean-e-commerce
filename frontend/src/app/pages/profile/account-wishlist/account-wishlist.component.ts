import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Product } from '../../../models/product.model';
import { WishlistService } from '../../../core/services/wishlist.service';
import { UserService } from '../../../core/services/user.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-account-wishlist',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './account-wishlist.component.html',
  styleUrl: './account-wishlist.component.css',
})
export class AccountWishlistComponent implements OnInit {
  wishlist: Product[] = []; // To store wishlist products
  userId: string | null = null; // Current logged-in user ID
  loading: boolean = false;

  constructor(
    private wishlistService: WishlistService,
    private userService: UserService,
    private snackbar: SnackbarService
  ) {}
  ngOnInit(): void {
    this.userId = this.userService.getUserId();

    if (this.userId) {
      this.fetchWishlist();
    }
  }

  fetchWishlist() {
    this.loading = true;
    if (!this.userId) return;

    this.wishlistService.getWishlist(this.userId).subscribe({
      next: (products) => {
        this.loading = false;
        this.wishlist = products;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error fetching wishlist:', err);
        this.snackbar.error('Failed to load wishlist.');
      },
    });
  }

  removeFromWishlist(productId: string): void {
    if (!this.userId) return;

    this.wishlistService.removeFromWishlist(this.userId, productId).subscribe({
      next: () => {
        this.wishlist = this.wishlist.filter((item) => item._id !== productId);
        const updatedWishlistIds = this.wishlist.map((product) => product._id);
        this.wishlistService.setWishlist(updatedWishlistIds);

        this.snackbar.success('Item removed from wishlist!');
      },
      error: (err) => {
        this.snackbar.error('Failed to remove item from wishlist.');
      },
    });
  }
}
