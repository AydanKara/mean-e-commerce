import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);
  private productsUrl = `${environment.apiUrl}/products`;

  // Create a product
  createProduct(
    product: Product
  ): Observable<{ message: string; product: Product }> {
    return this.http.post<{ message: string; product: Product }>(
      `${this.productsUrl}`,
      product,
      {
        withCredentials: true,
      }
    );
  }

  // Update a product
  updateProduct(
    productId: string,
    product: Product
  ): Observable<{ message: string; product: Product }> {
    return this.http.put<{ message: string; product: Product }>(
      `${this.productsUrl}/${productId}`,
      product,
      {
        withCredentials: true,
      }
    );
  }

  // Delete a product
  deleteProduct(productId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.productsUrl}/${productId}`,
      {
        withCredentials: true,
      }
    );
  }
}
