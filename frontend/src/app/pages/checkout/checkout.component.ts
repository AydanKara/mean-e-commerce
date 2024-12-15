import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  FormSubmittedEvent,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Cart, CartItem } from '../../models/cart.model';
import { SnackbarService } from '../../core/services/snackbar.service';
import { Order, OrderItem } from '../../models/order.model';
import { UserService } from '../../core/services/user.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  @ViewChild('checkoutForm', { static: false }) checkoutForm:
    | NgForm
    | undefined;
  cartItems: CartItem[] = [];
  orderItems: OrderItem[] = [];
  shippingInfo = { address: '', city: '', zipCode: '', country: '' };
  totalPrice = 0;
  paymentMethod = 'Credit Card';

  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private snackBar = inject(SnackbarService);
  private router = inject(Router);

  form: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', [Validators.required, Validators.minLength(4)]],
      zipCode: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    const cart = this.cartService.getCart();
    this.cartItems = cart.items;
    this.orderItems = cart.items.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));
    this.totalPrice = cart.totalPrice;

    // Patch shippingInfo into the form on init
    this.form.patchValue(this.shippingInfo);

    // Sync form values with shippingInfo
    this.form.valueChanges.subscribe((values) => {
      this.shippingInfo = {
        address: values.address,
        city: values.city,
        zipCode: values.zipCode,
        country: values.country,
      };
    });
  }

  onSubmit() {
    if (this.checkoutForm?.valid) {
      const orderData: Order = {
        _id: '',
        user: '',
        orderItems: this.orderItems,
        shippingInfo: this.shippingInfo,
        paymentMethod: this.paymentMethod,
        totalPrice: this.totalPrice,
        status: 'Pending', // Assuming "Pending" status initially
        isDelivered: false, // Initially not delivered
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      this.orderService.createOrder(orderData).subscribe({
        next: (res) => {
          this.snackBar.success(res.message);
          this.cartService.clearCart();
          this.orderService.setOrderPlaced(true);
          this.router.navigate(['/order-confirmation', res.order._id]);
        },
        error: (error) => {
          this.snackBar.error(error.error.message);
          this.errorMessage = error.error.message;
        },
      });
    }
  }
}
