import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesComponent } from '../../shared/features/features.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../models/category.model';
import { MustHavesComponent } from '../../components/must-haves/must-haves.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterModule,
    CommonModule,
    FeaturesComponent,
    CarouselComponent,
    CategoriesComponent,
    MustHavesComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private categoryService = inject(CategoryService);
  categories: Category[] = [];

  slides = [
    {
      image: '/assets/cover-23.jpg',
      content: `
        <div class="container d-flex flex-column">
            <div class="row align-items-center justify-content-end py-5" style="min-height: 550px;">
              <div class="col-12 col-md-6 col-lg-5 col-xl-4 mx-5 text-black text-start">

                <!-- Heading -->
                <h1 class="mb-4">Summer Collection</h1>

                <!-- Text -->
                <p class="mb-5 fs-5 text-gray">
                  So called give, one whales tree seas dry place own
                  day, winged tree created spirit.
                </p>

                <!-- Button -->
                <a class="button-nav-dark" href="/shop">
                  Shop Now
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
            <div class='col-12 col-md-6 col-lg-5 col-xl-4 text-black '>
              <h1>Summer Sale</h1>
              <h2 class='display-1 fs-lg fw-bold text-primary'>-70%</h2>
              <h5 class='mt-n4 mb-5'>with promo code CN67EW*</h5>
              <a class='button-nav-dark' href='/shop'>Shop Now</a>
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
                    <a href="/shop" class="link-underline text-reset mx-5 my-5">Shop Women</a>
                    <a href="/shop" class="link-underline text-reset mx-5 my-5">Shop Men</a>
                  </p>

                </div>
              </div>
            </div>
          </div>
      `,
    },
  ];

  ngOnInit(): void {
    this.categoryService.getAllCategories();
  }
}
