import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { AdminService } from '../../../core/services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  private adminService = inject(AdminService);
  users: User[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.loadUsers();
  }

  // Load users from the backend
  loadUsers(): void {
    this.loading = true;
    this.adminService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log(users)
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.loading = false;
      },
    });
  }

  // Toggle the admin status of a user
  toggleAdminStatus(user: User): void {
    const updatedAdminStatus = !user.isAdmin;
    this.adminService
      .updateUserAdminStatus(user._id, updatedAdminStatus)
      .subscribe({
        next: (updatedUser) => {
          user.isAdmin = updatedUser.isAdmin;
        },
        error: (error) => {
          console.error('Error updating admin status:', error);
        },
      });
  }
}
