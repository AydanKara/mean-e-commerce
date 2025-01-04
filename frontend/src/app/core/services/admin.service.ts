import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../../models/product.model';
import { SnackbarService } from './snackbar.service';
import { User } from '../../models/user.model';
import { Order } from '../../models/order.model';
import { OrderQueryParams } from '../../models/order-query-params.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);
  private productsUrl = `${environment.apiUrl}/products`;
  private ordersUrl = `${environment.apiUrl}/orders/admin`;
  private usersUrl = `${environment.apiUrl}/users`;
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
      .get<{ success: boolean; users: User[] }>(this.usersUrl, {
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

  getUserById(userId: string): Observable<User | null> {
    return this.http
      .get<{ success: boolean; user: User }>(`${this.usersUrl}/${userId}`, {
        withCredentials: true,
      })
      .pipe(map((response) => (response.success ? response.user : null)));
  }

  // Update the admin status of a user
  updateUserAdminStatus(userId: string, isAdmin: boolean): Observable<User> {
    return this.http
      .patch<User>(
        `${this.usersUrl}/${userId}`,
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

  /**
   * Get all orders (Admin)
   * @returns Observable<Order[]>
   */
  getAllOrders(queryParams?: OrderQueryParams): Observable<{
    orders: Order[];
    currentPage: number;
    totalPages: number;
    totalOrders: number;
  }> {
    const params = queryParams?.toHttpParams();
    return this.http
      .get<{
        orders: Order[];
        currentPage: number;
        totalPages: number;
        totalOrders: number;
      }>(this.ordersUrl, {
        params,
        withCredentials: true,
      })
      .pipe(map((response) => response));
  }

  /**
   * Update order status (Admin)
   * @param id - Order ID
   * @param status - New status
   * @returns Observable<Order>
   */
  updateOrderStatus(id: string | undefined, status: string): Observable<Order> {
    return this.http.put<Order>(
      `${this.ordersUrl}/${id}`,
      { status },
      { withCredentials: true }
    );
  }
}
