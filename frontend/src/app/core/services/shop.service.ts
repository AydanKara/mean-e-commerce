import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { environment } from '../../../environments/environment';
import { ProductQueryParams } from '../../models/product-query-params.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private productsUrl = `${environment.apiUrl}/products`;
  private categoriesUrl = `${environment.apiUrl}/categories`;
  private http = inject(HttpClient);
  errorMessage: string = '';
  categories: Category[] = [];
  brands: string[] = [];
  genders: string[] = [];
  relatedProducts: Product[] = [];

  constructor() {}

  // Fetch All Products
  getAllProducts(queryParams: ProductQueryParams): Observable<{
    products: Product[];
    currentPage: number;
    totalPages: number;
    totalProducts: number;
  }> {
    const params = queryParams.toHttpParams();

    return this.http
      .get<{
        products: Product[];
        currentPage: number;
        totalPages: number;
        totalProducts: number;
      }>(this.productsUrl, { params })
      .pipe(map((response) => response));
  }

  // Fetch Categories
  getAllCategories() {
    return this.http
      .get<{ success: boolean; categories: Category[] }>(this.categoriesUrl)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.categories = response.categories;
          } else {
            this.errorMessage = 'Failed to fetch Categories.';
          }
        },
        error: (error) => {
          console.error('Error fetching products:', error);
          this.errorMessage = 'An error occurred while fetching Categories.';
        },
      });
  }

  getBrands() {
    return this.http
      .get<{ success: boolean; brands: string[] }>(`${this.productsUrl}/brands`)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.brands = response.brands;
          } else {
            this.errorMessage = 'Failed to fetch Brands.';
          }
        },
        error: (error) => {
          console.error('Error fetching products:', error);
          this.errorMessage = 'An error occurred while fetching Brands.';
        },
      });
  }

  getGenders() {
    return this.http
      .get<{ success: boolean; genders: string[] }>(
        `${this.productsUrl}/genders`
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.genders = response.genders;
          } else {
            this.errorMessage = 'Failed to fetch Genders.';
          }
        },
        error: (error) => {
          console.error('Error fetching products:', error);
          this.errorMessage = 'An error occurred while fetching Genders.';
        },
      });
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }

  getRelatedProductsById(
    id: string
  ): Observable<{ success: boolean; relatedProducts: Product[] }> {
    return this.http
      .get<{ success: boolean; relatedProducts: Product[] }>(
        `${this.productsUrl}/${id}/related`
      )
      .pipe(map((response) => response));
  }
}
