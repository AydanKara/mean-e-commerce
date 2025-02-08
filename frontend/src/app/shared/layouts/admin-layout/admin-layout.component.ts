import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterModule,
    CommonModule,
    FooterComponent,
    HeaderComponent,
    MatIconModule,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent implements OnInit {
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
