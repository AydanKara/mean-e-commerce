import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AccountOrdersComponent } from './account-orders/account-orders.component';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-profile',
  imports: [RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  onLogout(): void {
    this.userService.logout().subscribe(() => {
      // Clear auth state
      this.userService.setAuthState(null);
      this.router.navigate(['/home']);
    });
  }
}
