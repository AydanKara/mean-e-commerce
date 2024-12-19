import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Product } from '../../../models/product.model';
import { WishlistService } from '../../../core/services/wishlist.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-account-wishlist',
  imports: [CommonModule, RouterModule, MatIcon],
  templateUrl: './account-wishlist.component.html',
  styleUrl: './account-wishlist.component.css',
})
export class AccountWishlistComponent implements OnInit {
  
  wishlist: Product[] = []; // To store wishlist products
  userId: string | null = null; // Current logged-in user ID

  constructor(
    private wishlistService: WishlistService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.userId = this.userService.getUserId();

    if (this.userId) {
      this.fetchWishlist();
    }
  }

  fetchWishlist() {
    if (!this.userId) return;

    this.wishlistService.getWishlist(this.userId).subscribe({
      next: (products) => {
        this.wishlist = products;
      },
      error: (err) => {
        console.error('Error fetching wishlist:', err);
      },
    });
  }

  removeFromWishlist(productId: string) {
    if (!this.userId) return;

    this.wishlistService.removeFromWishlist(this.userId, productId).subscribe({
      next: () => {
        // Remove the product from the wishlist locally
        this.wishlist = this.wishlist.filter(
          (product) => product._id !== productId
        );
      },
      error: (err) => {
        console.error('Error removing from wishlist:', err);
      },
    });
  }
}
