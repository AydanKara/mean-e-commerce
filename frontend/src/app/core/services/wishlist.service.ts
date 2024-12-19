import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private apiUrl = `${environment.apiUrl}/users`;
  private http = inject(HttpClient);

  getWishlist(userId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/${userId}/wishlist`, {
      withCredentials: true,
    });
  }

  addToWishlist(userId: string, productId: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${userId}/wishlist`,
      { productId },
      { withCredentials: true }
    );
  }

  removeFromWishlist(
    userId: string | null,
    productId: string
  ): Observable<any> {
    const url = `${this.apiUrl}/${userId}/wishlist`;
    const request = new HttpRequest(
      'DELETE',
      url,
      { productId },
      { withCredentials: true }
    );
    return this.http.request(request);
  }
}
