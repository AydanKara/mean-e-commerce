import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { sliderNewProductsAnimation } from '../../animations/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

@Component({
  selector: 'app-new-products-carousel',
  imports: [CommonModule, RouterModule],
  templateUrl: './new-products-carousel.component.html',
  styleUrl: './new-products-carousel.component.css',
  animations: [sliderNewProductsAnimation],
})
export class NewProductsCarouselComponent implements OnInit, AfterViewInit {
  @Input() newProducts: Product[] = [];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    new Swiper('.new-arrivals-slider', {
      modules: [Navigation],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 4,
      loop: true,
      centeredSlides: false,
      breakpoints: {
        350: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      },
    });
  }
}
