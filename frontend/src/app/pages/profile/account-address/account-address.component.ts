import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../models/user.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-account-address',
  imports: [CommonModule, RouterModule, MatIcon, ReactiveFormsModule],
  templateUrl: './account-address.component.html',
  styleUrl: './account-address.component.css',
})
export class AccountAddressComponent implements OnInit {
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private snackbar = inject(SnackbarService);

  user: User | null = null; // Current user data
  addressForm!: FormGroup;
  isEditMode: boolean = false;

  ngOnInit(): void {
    this.userService.getAuthState().subscribe((user) => {
      if (user) {
        this.user = user;
        this.initForm(user.shippingInfo);
      } else {
        this.initForm();
      }
    });
  }

  initForm(shippingInfo?: User['shippingInfo']): void {
    this.addressForm = this.fb.group({
      address: [
        shippingInfo?.address || '',
        [Validators.required, Validators.minLength(10)],
      ],
      zipCode: [
        shippingInfo?.zipCode || '',
        [Validators.required, Validators.pattern(/^\d{5}$/)],
      ],
      city: [
        shippingInfo?.city || '',
        [Validators.required, Validators.minLength(4)],
      ],
      country: [shippingInfo?.country || '', [Validators.required]],
      phone: [
        this.user?.phone || '',
        [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)],
      ],
    });
  }
  onSubmit(): void {
    if (this.addressForm.invalid) {
      return;
    }

    const updatedShippingInfo = this.addressForm.value;

    // Update user shipping info
    this.userService
      .updateProfile({
        shippingInfo: updatedShippingInfo,
        phone: this.addressForm.value.phone,
      })
      .subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          this.isEditMode = false; // Hide form after saving
          this.snackbar.success('Address updated successfully!');
        },
        error: (err) => {
          console.error('Failed to update address', err);
          this.snackbar.error('Error updating address. Please try again.');
        },
      });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }
}
