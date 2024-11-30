import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { Thumbs } from 'swiper/modules';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, MatIcon],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  private shopService = inject(ShopService);
  private activateRoute = inject(ActivatedRoute);
  product?: Product;
  productImages: string[] = [];

  mainSwiper?: Swiper; // Reference for the main Swiper instance
  thumbSwiper?: Swiper; // Reference for the thumbnail Swiper instance
  ngOnInit(): void {
    this.loadProduct();
  }

  ngAfterViewInit(): void {
    this.initializeSwiper();
  }

  loadProduct() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (!id) return;
    this.shopService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        console.log(product.category.name)
        this.productImages = product.images;
        this.initializeSwiper(); // Reinitialize Swiper when product data is available
      },
      error: (err) => console.log(err),
    });
  }

  initializeSwiper() {
    if (this.productImages.length === 0) return;

    // Initialize the thumbnail Swiper
    this.thumbSwiper = new Swiper('.thumbnail-slider', {
      slidesPerView: 4,
      spaceBetween: 10,
      watchSlidesProgress: true,
    });

    // Initialize the main Swiper
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
  }
}
