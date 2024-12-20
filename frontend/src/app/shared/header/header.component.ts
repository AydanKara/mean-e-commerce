import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIcon } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { BusyService } from '../../core/services/busy.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule,
    MatProgressBarModule,
    MatIcon,
    MatBadgeModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  busyService = inject(BusyService);
  private userService = inject(UserService);
  private router = inject(Router);
  private cartService = inject(CartService);
  currentUser: User | null = null;
  isLoading: boolean = true;
  totalItems: number = 0;

  ngOnInit(): void {
    this.userService.getLoadingState().subscribe((loading) => {
      this.isLoading = loading;
    });

    this.userService.getAuthState().subscribe((user) => {
      this.currentUser = user;
      this.userService.setLoadingState(false); // Stop loading when auth state is resolved
    });

    this.cartService.getTotalQuantityObservable().subscribe((total) => {
      this.totalItems = Number(total);
    });
  }

  navigateToAccount() {
    if (this.currentUser) {
      // If user is logged in, navigate to account page
      this.router.navigate(['/account']);
    } else {
      // If no user is logged in, navigate to login page
      this.router.navigate(['/login']);
    }
  }

  navigateToWishlist() {
    if (this.currentUser) {
      // If user is logged in, navigate to account page
      this.router.navigate(['/account-wishlist']);
    } else {
      // If no user is logged in, navigate to login page
      this.router.navigate(['/login']);
    }
  }

  onLogout(): void {
    this.userService.logout().subscribe(() => {
      // Clear auth state
      this.userService.setAuthState(null);
      this.router.navigate(['/home']);
    });
  }
}
