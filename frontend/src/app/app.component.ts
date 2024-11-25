import { Component, OnInit } from '@angular/core';

import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getLoadingState().subscribe((loading) => {
      this.isLoading = loading;
    });
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        console.log('User retrieved:', user.isAdmin);
        this.userService.setAuthState(user);
        this.userService.setLoadingState(false);
        if (user?.isAdmin) {
          this.router.navigate(['/admin/dashboard']);
        }
      },
      error: (err) => {
        console.error('Failed to fetch user:', err);
        this.userService.setAuthState(null);
        this.userService.setLoadingState(false);
      },
    });
  }
}
