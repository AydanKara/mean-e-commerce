import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { environment } from '../../../environments/environment';

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

  constructor() {}

  // Fetch All Products
  getAllProducts(
    searchTerm: string = '',
    categories: string[] = [],
    brands: string[] = [],
    genders: string[] = [],
    priceRange: string = '',
    sort: string = '',
    page: number = 1,
    limit: number = 10
  ): Observable<{
    products: Product[];
    currentPage: number;
    totalPages: number;
  }> {
    let params = new HttpParams()
      .set('keyword', searchTerm)
      .set('category', categories.join(', '))
      .set('gender', genders.join(', '))
      .set('brand', brands.join(', '))
      .set('price', priceRange)
      .set('sort', sort)
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http
      .get<{
        products: Product[];
        currentPage: number;
        totalPages: number;
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
}
