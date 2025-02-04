import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AccountOrdersComponent } from './account-orders/account-orders.component';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  selectedItem: string | null = null;
  isMenuOpen = false;
  private router = inject(Router);
  private userService = inject(UserService);
  public cartService = inject(CartService);

  ngOnInit(): void {
    const savedItem = localStorage.getItem('selectedMenuItem');
    if (savedItem) {
      this.selectedItem = savedItem;
    }
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  selectMenuItem(item: string) {
    this.selectedItem = item;
    this.isMenuOpen = false;

    localStorage.setItem('selectedMenuItem', item);
  }

  onLogout(): void {
    this.userService.logout().subscribe(() => {
      // Clear auth state
      this.userService.setAuthState(null);
      // Clear cart
      this.cartService.resetCartState();
      localStorage.removeItem('selectedMenuItem');
      this.router.navigate(['/home']);
    });
  }
}
