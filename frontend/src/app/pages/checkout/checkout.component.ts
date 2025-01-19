import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../models/cart.model';
import { SnackbarService } from '../../core/services/snackbar.service';
import { Order, OrderItem } from '../../models/order.model';
import { UserService } from '../../core/services/user.service';
import { OrderService } from '../../core/services/order.service';
import { Subscription, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @ViewChild('checkoutForm', { static: false }) checkoutForm?: NgForm;

  cartItems: CartItem[] = [];
  orderItems: OrderItem[] = [];
  shippingInfo = { address: '', city: '', zipCode: '', country: '' };
  user = { _id: '', email: '', fullName: '', phone: '' };
  totalPrice = 0;
  paymentMethod = 'Credit Card';

  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private userService = inject(UserService);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);

  form: FormGroup;
  errorMessage: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', [Validators.required, Validators.minLength(4)]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
    });
  }

  ngOnInit(): void {
    // Subscribe to cart and user data using `combineLatest`
    this.subscriptions.add(
      combineLatest([
        this.cartService.getCartObservable(),
        this.userService.getAuthState().pipe(filter((user) => !!user)),
      ]).subscribe({
        next: ([cart, user]) => {
          this.cartItems = cart.items || [];
          this.orderItems = this.cartItems.map((item) => ({
            product: item,
            quantity: item.quantity,
            price: item.price,
          }));
          this.totalPrice = cart.totalPrice;

          const { _id, fullName, email, shippingInfo, phone } = user || {};
          const {
            address = '',
            city = '',
            zipCode = '',
            country = '',
          } = shippingInfo || {};

          this.form.patchValue({
            fullName: fullName || '',
            email: email || '',
            address,
            city,
            zipCode,
            country,
            phone: phone || '',
          });

          this.shippingInfo = { address, city, zipCode, country };
          this.user = {
            _id,
            fullName: fullName || '',
            email,
            phone: phone || '',
          };
        },
        error: () => {
          this.snackbar.error('Error loading cart or user data.');
        },
      })
    );

    // Sync form changes with shippingInfo
    this.subscriptions.add(
      this.form.valueChanges.subscribe((values) => {
        this.shippingInfo = {
          address: values.address,
          city: values.city,
          zipCode: values.zipCode,
          country: values.country,
        };
      })
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      const orderData: Order = {
        _id: '',
        user: this.user,
        orderItems: this.orderItems,
        shippingInfo: this.shippingInfo,
        paymentMethod: this.paymentMethod,
        totalPrice: this.totalPrice,
        paymentStatus: 'Pending',
        orderStatus: 'Processing',
        isDelivered: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      this.orderService.createOrder(orderData).subscribe({
        next: (res) => {
          this.snackbar.success(res.message);
          this.cartService.clearCart();
          this.orderService.setOrderPlaced(true);
          this.router.navigate(['/order-confirmation', res.order._id]);
        },
        error: (error) => {
          this.snackbar.error(
            error.error.message || 'Order submission failed.'
          );
          this.errorMessage = error.error.message || 'Unknown error occurred.';
        },
      });
    } else {
      this.snackbar.error('Please fill in all required fields correctly.');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Clean up all subscriptions
  }
}
