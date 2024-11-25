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
  private http = inject(HttpClient)

  constructor() {}

  // Fetch All Products
  getAllProducts(
    searchTerm: string = '',
    category: string = '',
    subcategory: string = '',
    priceRange: string = '',
    sort: string = '',
    page: number = 1,
    limit: number = 10
  ): Observable<{
    products: Product[];
    currentPage: number;
    totalPage: number;
  }> {
    let params = new HttpParams()
      .set('keyword', searchTerm)
      .set('category', category)
      .set('subcategory', subcategory)
      .set('price', priceRange)
      .set('sort', sort)
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http
      .get<{
        products: Product[];
        currentPage: number;
        totalPage: number;
      }>(this.productsUrl, { params })
      .pipe(map((response) => response));
  }

  // Fetch Categories
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }
}
