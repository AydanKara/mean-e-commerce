import { Component, inject, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CartService } from '../../core/services/cart.service';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-product-item',
  imports: [CurrencyPipe, RouterLink, MatIcon],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
  private cartService = inject(CartService);
  private snackbar = inject(SnackbarService);
  @Input() product?: Product;

  addToCart() {
    if (!this.product) return;

    const cartItem = {
      _id: this.product._id,
      name: this.product.name,
      price: this.product.price,
      quantity: 1,
      images: this.product.images[0],
      stock: this.product.stock,
    };

    this.cartService.addToCart(cartItem);
    this.snackbar.success(this.product.name + ' added to cart!');
  }
}
