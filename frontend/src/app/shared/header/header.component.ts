import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { BusyService } from '../../core/services/busy.service';
import { CartService } from '../../core/services/cart.service';
import { ShoppingCartModalComponent } from '../shopping-cart-modal/shopping-cart-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule,
    ShoppingCartModalComponent,
    MatProgressBarModule,
    MatIconModule,
    MatBadgeModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private cartService = inject(CartService);
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);
  busyService = inject(BusyService);
  currentUser: User | null = null;
  isLoading: boolean = true;
  totalItems: number = 0;
  isCartModalVisible: boolean = false;

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

  toggleCartModal() {
    this.isCartModalVisible = !this.isCartModalVisible;
  }

  openCartModal() {
    this.dialog.open(ShoppingCartModalComponent, {
      width: '100%',
      height: '100vh',
      position: { right: '0' },
      panelClass: 'cart-dialog',
    });
  }

  onLogout(): void {
    this.userService.logout().subscribe(() => {
      // Clear auth state
      this.userService.setAuthState(null);
      // Clear cart
      this.cartService.clearCart();
      this.router.navigate(['/home']);
    });
  }
}
