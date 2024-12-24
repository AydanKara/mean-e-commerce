import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { FeaturesComponent } from '../../shared/features/features.component';
import { strongPasswordValidator } from '../../utils/password.validator';
import { matchPasswords } from '../../utils/password-match-validator';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, FeaturesComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [strongPasswordValidator()]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: matchPasswords('password', 'confirmPassword'),
      }
    );
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const { confirmPassword, ...userData } = this.registerForm.value;
    if (userData.password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.userService.register(userData).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) =>
        (this.errorMessage = err.error.message || 'Registration failed'),
    });
  }
}
