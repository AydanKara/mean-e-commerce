import { Component, OnInit } from '@angular/core';

import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UserService } from './core/services/user.service';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MatProgressBar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.setLoadingState(true);

    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        console.log('User retrieved:', user);
        this.isLoading = false;
        this.userService.setLoadingState(false);
        this.userService.setAuthState(user);
        if (user?.isAdmin) {
          this.router.navigate(['/admin/dashboard']);
        }
      },
      error: (err) => {
        console.error('Failed to fetch user:', err);
        this.isLoading = false;
        this.userService.setLoadingState(false);
        this.userService.setAuthState(null);
      },
    });
  }
}
