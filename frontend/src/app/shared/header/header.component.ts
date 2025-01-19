import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
import { BehaviorSubject, combineLatest, Subscription, tap } from 'rxjs';

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
export class HeaderComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private router = inject(Router);
  public cartService = inject(CartService);
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);
  busyService = inject(BusyService);
  isLoading: boolean = true;

  currentUser$ = new BehaviorSubject<User | null>(null);
  totalItems$ = new BehaviorSubject<number>(0);
  isLoading$ = this.userService.getLoadingState();

  private subscriptions = new Subscription();

  isCartModalVisible: boolean = false;

  ngOnInit(): void {
    this.subscriptions.add(
      combineLatest([
        this.userService.getAuthState().pipe(
          tap((user) => this.currentUser$.next(user)),
          tap(() => {
            this.isLoading = false;
            this.userService.setLoadingState(false);
          }) // Stop loading after auth state is resolved
        ),
        this.cartService.getTotalQuantityObservable().pipe(
          tap((total) => {
            this.totalItems$.next(Number(total));
          })
        ),
      ]).subscribe()
    );
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
      this.isLoading = true;
      // Clear cart
      this.cartService.resetCartState();
      this.router.navigate(['/home']);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Clean up subscriptions to avoid memory leaks
  }
}
