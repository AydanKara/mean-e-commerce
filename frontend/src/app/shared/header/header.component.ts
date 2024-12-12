import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserService } from '../../core/services/user.service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, MatProgressBarModule, MatIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  currentUser: User | null = null;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.userService.getLoadingState().subscribe((loading) => {
      this.isLoading = loading;
    });

    this.userService.getAuthState().subscribe((user) => {
      console.log('Auth state in Layout:', user);
      this.currentUser = user;
      this.userService.setLoadingState(false); // Stop loading when auth state is resolved
    });
    console.log(this.isLoading);
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
