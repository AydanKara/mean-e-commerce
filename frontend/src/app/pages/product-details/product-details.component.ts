import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { Thumbs } from 'swiper/modules';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FeaturesComponent } from '../../shared/features/features.component';
import { RelatedProductsComponent } from '../../components/related-products/related-products.component';
import { switchMap } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  imports: [
    CommonModule,
    FormsModule,
    MatIcon,
    MatTabsModule,
    RouterModule,
    FeaturesComponent,
    RelatedProductsComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  private shopService = inject(ShopService);
  private activateRoute = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private snackbar = inject(SnackbarService);
  product?: Product;
  relatedProducts?: Product[] = [];
  productImages: string[] = [];
  selectedQuantity: number = 1;

  mainSwiper?: Swiper; // Reference for the main Swiper instance
  thumbSwiper?: Swiper; // Reference for the thumbnail Swiper instance
  ngOnInit(): void {
    this.loadProduct();
    this.loadRelatedProducts();
  }

  ngAfterViewInit(): void {
    this.initializeSwiper();
  }

  loadProduct() {
    this.activateRoute.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (!id) return [];
          return this.shopService.getProductById(id);
        })
      )
      .subscribe({
        next: (product) => {
          this.product = product;
          this.productImages = product.images;
          this.initializeSwiper(); // Reinitialize Swiper for new product
        },
        error: (err) => console.error(err),
      });
  }

  loadRelatedProducts() {
    this.activateRoute.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (!id) return [];
          return this.shopService.getRelatedProductsById(id);
        })
      )
      .subscribe({
        next: (response) => {
          this.relatedProducts = response.relatedProducts;
        },
        error: (err) => console.error(err),
      });
  }

  initializeSwiper() {
    if (this.productImages.length === 0) return;

    // Destroy existing Swiper instances
    if (this.mainSwiper) {
      this.mainSwiper.destroy(true, true);
    }
    if (this.thumbSwiper) {
      this.thumbSwiper.destroy(true, true);
    }

    // Use a small timeout to ensure DOM is updated
    setTimeout(() => {
      this.thumbSwiper = new Swiper('.thumbnail-slider', {
        slidesPerView: 4,
        spaceBetween: 10,
        watchSlidesProgress: true,
      });

      this.mainSwiper = new Swiper('.main-slider', {
        modules: [Navigation, Thumbs],
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        thumbs: {
          swiper: this.thumbSwiper,
        },
      });
    }, 0);
  }

  addToCart() {
    if (!this.product || this.selectedQuantity > this.product.stock) {
      this.snackbar.error('Cannot add more than available stock!');
      return;
    }

    const cartItem = {
      productId: this.product._id,
      name: this.product.name,
      price: this.product.price,
      quantity: Number(this.selectedQuantity),
      image: this.product.images[0],
      stock: this.product.stock,
    };

    this.cartService.addToCart(cartItem);
    this.snackbar.success(this.product.name + ' added to cart!');
  }
}
