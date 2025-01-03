import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { FeaturesComponent } from '../../shared/features/features.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FeaturesComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.userService.login(this.loginForm.value).subscribe({
      next: (user) => {
        if (user.isAdmin) {
          this.userService.setAuthState(user);
          this.router.navigate(['/admin/dashboard']);
        } else {
          // Update auth state
          this.userService.setAuthState(user);
          this.router.navigate(['/home']);
        }
      },
      error: (err) => (this.errorMessage = err.error.message || 'Login failed'),
    });
  }
}
