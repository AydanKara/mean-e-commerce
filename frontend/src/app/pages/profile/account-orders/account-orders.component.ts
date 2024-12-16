import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { Order, OrderItem } from '../../../models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-orders',
  imports: [CommonModule],
  templateUrl: './account-orders.component.html',
  styleUrl: './account-orders.component.css',
})
export class AccountOrdersComponent implements OnInit {
  private orderService = inject(OrderService);

  orders: Order[] = [];
  orderItems: OrderItem[] = [];

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        this.orders = response;
        console.log(this.orders);
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      },
    });
  }
}
