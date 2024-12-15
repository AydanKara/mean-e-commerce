import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OrderService } from '../core/services/order.service';

@Injectable({
  providedIn: 'root',
})
export class orderConfirmGuard implements CanActivate {
  private orderService = inject(OrderService);
  private router = inject(Router);
  canActivate(): boolean {
    // Check if the order has been placed
    if (this.orderService.isOrderPlaced()) {
      return true; // Allow access to the route
    } else {
      // Redirect to the home page or another route
      this.router.navigate(['/']);
      return false;
    }
  }
}
