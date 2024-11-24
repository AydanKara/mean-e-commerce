import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, CommonModule, MatProgressBarModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
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
    console.log(this.isLoading)
  }

  onLogout(): void {
    this.userService.logout().subscribe(() => {
      // Clear auth state
      this.userService.setAuthState(null);
      this.router.navigate(['/home']);
    });
  }
}
