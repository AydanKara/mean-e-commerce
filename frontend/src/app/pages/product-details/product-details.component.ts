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

@Component({
  selector: 'app-product-details',
  imports: [
    CommonModule,
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
  product?: Product;
  relatedProducts?: Product[] = [];
  productImages: string[] = [];

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
          console.log(this.relatedProducts);
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
  
  
}
