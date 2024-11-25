import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserService } from '../../core/services/user.service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, MatProgressBarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentUser: User | null = null;
  isLoading: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

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

  onLogout(): void {
    this.userService.logout().subscribe(() => {
      // Clear auth state
      this.userService.setAuthState(null);
      this.router.navigate(['/home']);
    });
  }
}
