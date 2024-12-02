import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesComponent } from '../../shared/features/features.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, FeaturesComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  slides = [
    {
      image: '/assets/cover-23.jpg',
      content: `
        <div class="container d-flex flex-column">
            <div class="row align-items-center justify-content-end py-12" style="min-height: 550px;">
              <div class="col-12 col-md-6 col-lg-5 col-xl-4 offset-md-n1">

                <!-- Heading -->
                <h1 class="mb-5">Summer Collection</h1>

                <!-- Text -->
                <p class="mb-8 fs-lg text-gray-500">
                  So called give, one whales tree seas dry place own
                  day, winged tree created spirit.
                </p>

                <!-- Button -->
                <a class="btn btn-dark docs-creator" href="shop.html">
                  Shop Now <i class="fe fe-arrow-right ms-2"></i>
                </a>

              </div>
            </div>
          </div>
      `,
    },
    {
      image: '/assets/cover-5.jpg',
      content: `
        <div class='container d-flex flex-column'>
          <div class='row align-items-center py-5' style='min-height: 550px;'>
            <div class='col-12 col-md-6 col-lg-5 col-xl-4 offset-md-1'>
              <h1>Summer Sale</h1>
              <h2 class='display-1 text-primary'>-70%</h2>
              <h5 class='mt-n4 mb-5'>with promo code CN67EW*</h5>
              <a class='btn btn-dark docs-creator' href='/shop'>Shop Now <i class='fe fe-arrow-right ms-2'></i></a>
            </div>
          </div>
        </div>
      `,
    },
    {
      image: '/assets/cover-16.jpg',
      content: `
        <div class="bg-dark-20">
            <div class="container d-flex flex-column">
              <div class="row align-items-center justify-content-end" style="min-height: 550px;">
                <div class="col-12 text-center text-white">

                  <!-- Preheading -->
                  <h4 class="mb-0">Summer Styles</h4>

                  <!-- Heading -->
                  <h1 class="display-1">
                    50% OFF
                  </h1>

                  <!-- Links -->
                  <p class="mb-0">
                    <a href="shop.html" class="link-underline text-reset mx-5 my-5 docs-creator">Shop Women</a>
                    <a href="shop.html" class="link-underline text-reset mx-5 my-5 docs-creator">Shop Men</a>
                  </p>

                </div>
              </div>
            </div>
          </div>
      `,
    },
  ];
}
