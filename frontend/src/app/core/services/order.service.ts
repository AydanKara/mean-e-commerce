import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;
  private http = inject(HttpClient);
  private orderPlaced = false;

  setOrderPlaced(status: boolean): void {
    this.orderPlaced = status;
  }

  isOrderPlaced(): boolean {
    return this.orderPlaced;
  }

  /**
   * Get all orders for the logged-in user
   * @returns Observable<Order[]>
   */
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}`, { withCredentials: true });
  }

  /**
   * Get a single order by its ID
   * @param id - Order ID
   * @returns Observable<Order>
   */
  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  /**
   * Create a new order
   * @param orderData - Order object to create
   * @returns Observable<Order>
   */
  createOrder(
    orderData: Partial<Order>
  ): Observable<{ message: string; order: Order }> {
    return this.http.post<{ message: string; order: Order }>(
      `${this.apiUrl}`,
      orderData,
      {
        withCredentials: true,
      }
    );
  }

  /**
   * Update the status of an order
   * @param id - Order ID
   * @param status - New status of the order
   * @returns Observable<Order>
   */
  updateOrderStatus(id: string, status: string): Observable<Order> {
    return this.http.put<Order>(
      `${this.apiUrl}/${id}`,
      { status },
      { withCredentials: true }
    );
  }
}
