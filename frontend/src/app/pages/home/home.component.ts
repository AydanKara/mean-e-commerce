import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesComponent } from '../../shared/features/features.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../models/category.model';
import { MustHavesComponent } from '../../components/must-haves/must-haves.component';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../models/product.model';
import { NewProductsCarouselComponent } from '../../components/new-products-carousel/new-products-carousel.component';
import { BlogsComponent } from '../../components/blogs/blogs.component';
import { HeroCarouselComponent } from '../../components/hero-carousel/hero-carousel.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterModule,
    CommonModule,
    FeaturesComponent,
    CategoriesComponent,
    MustHavesComponent,
    NewProductsCarouselComponent,
    BlogsComponent,
    HeroCarouselComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private shopService = inject(ShopService);
  categories: Category[] = [];
  newProducts: Product[] = [];
  brands: string[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  ngOnInit(): void {
    this.categoryService.getAllCategories();
    this.shopService.getNewProducts().subscribe({
      next: (response) => {
        this.loading = true;
        if (response.success) {
          this.loading = false;
          this.newProducts = response.newProducts;
        } else {
          this.loading = false;
          this.errorMessage = 'Failed to fetch new products.';
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error fetching new products:', error);
        this.errorMessage = 'An error occurred while fetching new products.';
      },
    });
  }
}
