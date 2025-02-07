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
import { UserService } from '../../core/services/user.service';
import { WishlistService } from '../../core/services/wishlist.service';

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
  private userService = inject(UserService);
  private wishlistService = inject(WishlistService);
  private shopService = inject(ShopService);
  private activateRoute = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private snackbar = inject(SnackbarService);

  product?: Product;
  relatedProducts?: Product[] = [];
  productImages: string[] = [];
  selectedQuantity: number = 1;
  userId: string | null = null;
  wishlist: string[] = []; // Store user's wishlist
  loading: boolean = false;

  mainSwiper?: Swiper; // Reference for the main Swiper instance
  thumbSwiper?: Swiper; // Reference for the thumbnail Swiper instance
  ngOnInit(): void {
    this.getAuthState();
    this.loadProduct();
    this.loadRelatedProducts();
  }

  ngAfterViewInit(): void {
    this.initializeSwiper();
  }

  loadProduct() {
    this.loading = true;
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
          this.loading = false;
          this.product = product;
          this.productImages = product.images;
          this.initializeSwiper(); // Reinitialize Swiper for new product
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
        },
      });
  }

  loadRelatedProducts() {
    this.loading = true;
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
          this.loading = false;
          this.relatedProducts = response.relatedProducts;
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
        },
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
        slidesPerView: 3,
        spaceBetween: 5,
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

  getAuthState() {
    this.userService.getAuthState().subscribe((user) => {
      this.userId = user?._id ?? null;

      if (this.userId) {
        // Fetch the initial wishlist
        this.wishlistService.getWishlist(this.userId).subscribe((wishlist) => {
          const wishlistIds = wishlist.map((product) => product._id);
          this.wishlistService.setWishlist(wishlistIds);
        });
        // Subscribe to wishlist updates
        this.wishlistService.wishlist$.subscribe((wishlist) => {
          this.wishlist = wishlist;
        });
      }
    });
  }

  isFavorite(productId: string | undefined): boolean {
    return productId ? this.wishlist?.includes(productId) : false;
  }

  // Add or remove a product from the wishlist
  toggleFavorite(productId: string | undefined): void {
    if (!this.userId) {
      this.snackbar.error('Please log in to manage your wishlist.');
      return;
    }

    if (!productId) {
      this.snackbar.error('Invalid product ID.');
      return;
    }

    if (this.isFavorite(productId)) {
      // Remove from wishlist
      this.wishlistService
        .removeFromWishlist(this.userId, productId)
        .subscribe({
          next: (response) => {
            this.wishlist = this.wishlist.filter((id) => id !== productId); // Update local wishlist
            this.snackbar.success(
              `${this.product?.name} removed from favorites!`
            );
          },
          error: (error) => {
            this.snackbar.error(error.message);
          },
        });
    } else {
      // Add to wishlist
      this.wishlistService.addToWishlist(this.userId, productId).subscribe({
        next: (response) => {
          this.wishlist.push(productId); // Update local wishlist
          this.snackbar.success(`${this.product?.name} added to favorites!`);
        },
        error: (error) => {
          this.snackbar.error(error.message);
        },
      });
    }
  }
  addToCart() {
    if (!this.userId) {
      this.snackbar.error('Please log in to manage your cart.');
      return;
    }
    if (!this.product || this.selectedQuantity > this.product.stock) {
      this.snackbar.error('Cannot add more than available stock!');
      return;
    }

    const cartItem = {
      _id: this.product._id,
      name: this.product.name,
      price: this.product.price,
      quantity: Number(this.selectedQuantity),
      images: this.product.images[0],
      stock: this.product.stock,
    };

    this.cartService.addToCart(cartItem);
    this.snackbar.success(this.product.name + ' added to cart!');
  }
}
