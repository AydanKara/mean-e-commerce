import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../models/user.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { strongPasswordValidator } from '../../../utils/password.validator';

@Component({
  selector: 'app-account-personal-info',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-personal-info.component.html',
  styleUrl: './account-personal-info.component.css',
})
export class AccountPersonalInfoComponent implements OnInit {
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private snackbar = inject(SnackbarService);

  userForm!: FormGroup; // FormGroup to manage form fields
  loading = true; // To show a loading indicator if needed
  user: User | null = null; // Current user data

  ngOnInit(): void {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(10)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(30)],
      ],
      password: ['', [strongPasswordValidator()]],
      newPassword: ['', [strongPasswordValidator()]],
    });

    // Fetch current user data
    this.userService.getAuthState().subscribe((user) => {
      if (user) {
        this.user = user;
        this.populateForm(user); // Populate the form fields with user data
      }
      this.loading = false; // Hide loading indicator
    });
  }

  // Populate the form with user data
  populateForm(user: User) {
    this.userForm.patchValue({
      fullName: user.fullName || '',
      email: user.email,
    });
  }

  // Handle form submission to update user data
  onSubmit() {
    if (this.userForm.invalid) {
      return; // Prevent submission if form is invalid
    }
    const formData = this.userForm.value;
    const updatedUser: Partial<User> = {
      fullName: formData.fullName,
      email: formData.email,
    };

    if (formData.newPassword) {
      updatedUser.password = formData.newPassword;
    }

    this.userService.updateProfile(updatedUser).subscribe({
      next: (updatedUser) => {
        this.snackbar.success('User updated successfully!');
        if (this.user) {
          // Update current user state
          this.userService.setAuthState({ ...this.user!, ...updatedUser });
        }

        this.userForm.patchValue({ password: '', newPassword: '' });
      },
      error: (err) => {
        console.error('Failed to update profile', err);
        this.snackbar.error('Error updating profile. Please try again.');
      },
    });
  }

  get f() {
    return this.userForm.controls;
  }
}
