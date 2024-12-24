import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../../models/product.model';
import { SnackbarService } from './snackbar.service';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);
  private productsUrl = `${environment.apiUrl}/products`;
  private apiUrl = `${environment.apiUrl}/auth`;
  private userUrl = `${environment.apiUrl}/users`;
  private snackbar = inject(SnackbarService);

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

  // Fetch all users
  getAllUsers(): Observable<User[]> {
    return this.http
      .get<{ success: boolean; users: User[] }>(this.userUrl, {
        withCredentials: true,
      })
      .pipe(
        map((response) => (response.success ? response.users : [])),
        catchError((error) => {
          this.snackbar.error('Failed to load users');
          return of([]);
        })
      );
  }

  // Update the admin status of a user
  updateUserAdminStatus(userId: string, isAdmin: boolean): Observable<User> {
    return this.http
      .patch<User>(
        `${this.userUrl}/${userId}`,
        { isAdmin },
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap(() => {
          this.snackbar.success(`User's admin status updated.`);
        }),
        catchError((error) => {
          this.snackbar.error('Error updating admin status.');
          throw error;
        })
      );
  }
}
