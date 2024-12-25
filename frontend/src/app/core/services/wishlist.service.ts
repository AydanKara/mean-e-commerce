import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private apiUrl = `${environment.apiUrl}/users`;
  private http = inject(HttpClient);

  private wishListSubject = new BehaviorSubject<string[]>([]);
  wishlist$ = this.wishListSubject.asObservable();

  getWishlist(userId: string | null): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/${userId}/wishlist`, {
      withCredentials: true,
    });
  }

  setWishlist(wishlist: string[]): void {
    this.wishListSubject.next(wishlist);
  }

  addToWishlist(userId: string, productId: string): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/${userId}/wishlist`,
        { productId },
        { withCredentials: true }
      )
      .pipe(
        tap(() => {
          // Update wishlist observable
          this.getWishlist(userId).subscribe((wishlist) => {
            const wishlistIds = wishlist.map((product) => product._id);
            this.setWishlist(wishlistIds);
          });
        })
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
    return this.http.request(request).pipe(
      tap(() => {
        // Update wishlist observable
        if (userId) {
          this.getWishlist(userId).subscribe((wishlist) => {
            const wishlistIds = wishlist.map((product) => product._id);
            this.setWishlist(wishlistIds);
          });
        }
      })
    );
  }
}
