import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { FeaturesComponent } from '../../shared/features/features.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FeaturesComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  returnUrl: string | '' = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
          this.router.navigateByUrl(this.returnUrl, { replaceUrl: true });
        }
      },
      error: (err) => (this.errorMessage = err.error.message || 'Login failed'),
    });
  }
}
